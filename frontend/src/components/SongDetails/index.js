// this is where I will load my song data for one song and show edit options
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneSong, deleteSong } from "../../store/songs";
// import { GetAllSongs } from "./GetAllSongs";
import UpdateSong from "../UpdateSong";
import CreateNewSong from "../CreateNewSong";
import DeleteSong from "../DeleteSong";

const SongDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
    const user = useSelector(state => state.session.user);

    const [showSongForm, setShowSongForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(user.id);
    // const [artistId, setArtistId] = useState(null);

    songId = parseInt(songId);
    const currentSong = Object.values(songs).find(song => song.id === songId);
    let artistId;
    if (currentSong) artistId = currentSong.userId


    useEffect(() => {
        dispatch(getOneSong(songId));
    }, [dispatch]);

    if (!currentSong) return null;
    let pageBody;

    if (showSongForm) {
        setShowSongForm(false);
        pageBody = (
            <CreateNewSong songs={songs} />
        )

    }
    if (showEditForm) {
        setShowEditForm(false);
        pageBody = (
            <UpdateSong currentSong={currentSong} />
        )
    }

    return (
        <>
            <div className="one-song">
                <div className="create-song-button">
                    <button onClick={() => setShowSongForm(true)}> Upload a new song </button>
                </div>
                <div className="song-details">
                    <h3>{currentSong.title}</h3>
                    <p>{currentSong.userId}</p>
                    <p>{currentSong.description}</p>
                    <p>{currentSong.url}</p>
                    <p>{currentSong.imageUrl}</p>
                </div>
                <div className="edit-button-container">
                    {user.id === currentSong.userId &&
                        <button onClick={() => setShowEditForm(true)}> Edit song details </button>
                    }
                </div>
                <div>
                    {user.id === artistId &&
                        <DeleteSong />
                    }
                </div>
                {pageBody}
            </div>
        </>
    );
};

export default SongDetails; 