// this is where I will load my song data for one song and show edit options
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong } from "../../store/songs";
import { GetAllSongs } from "./GetAllSongs";
import { UpdateSong } from "./UpdateSong";
import { CreateNewSong } from "./CreateNewSong";

const SongDetails = () => {
    const [showSongForm, setShowSongForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const dispatch = useDispatch();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
    const user = useSelector(state => state.session.user);

    songId = parseInt(songId);
    const oneSong = Object.values(songs).find(song => song.id === songId);

    useEffect(() => {
        dispatch(getOneSong(songId));
    }, [dispatch, songId]);

    if (!oneSong) return null;
    let pageBody;

    if (showSongForm) {
        pageBody = (
            <CreateNewSong oneSong={oneSong} />
        )

    } else if (showEditForm) {
        pageBody = (
            <UpdateSong oneSong={oneSong} />
        )
    }

    return (
        <>
            <div className="one-song">
                <div className="create-song-button">
                    <button onClick={() => setShowSongForm(true)}> Upload a new song </button>
                </div>
                <div className="song-details">
                    <h3>{oneSong.title}</h3>
                    <p>{oneSong.userId}</p>
                    <p>{oneSong.description}</p>
                    <p>{oneSong.url}</p>
                    <p>{oneSong.imageUrl}</p>
                </div>
                <div className="edit-button-container">
                    {user.id === oneSong.userId &&
                        <button onClick={() => setShowEditForm(true)}> Edit song details </button>
                    }
                </div>
                {pageBody}
            </div>
        </>
    )

};

export default SongDetails; 