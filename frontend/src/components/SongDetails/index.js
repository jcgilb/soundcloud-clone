import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong } from "../../store/songs";
import GetAllComments from "../GetAllComments"
import CreateNewComment from "../CreateAComment"
import UpdateSong from "../UpdateSong";
import { useCurrentSong } from "../../context/CurrentSongContext";

const SongDetails = () => {
    const dispatch = useDispatch();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
    const user = useSelector(state => state.session.user);

    songId = parseInt(songId);
    const currentSong = Object.values(songs).find(song => song.id === songId);

    useEffect(() => {
        dispatch(getOneSong(songId));
    }, [dispatch, songId]);

    if (!currentSong) return null;

    return (
        <>
            <div className="one-song">

                <div className="song-details">
                    <h3>{currentSong.title}</h3>
                    <p>{currentSong.userId}</p>
                    <p>{currentSong.description}</p>
                    <p>{currentSong.url}</p>
                    <p>{currentSong.imageUrl}</p>
                </div>
                {user.id === currentSong.userId &&
                    <UpdateSong />
                    // <button onClick={() => setShowEditForm(true)}> Edit song details </button>
                }
                <div>
                    <GetAllComments />
                </div>
                <br></br>
                <div>
                    <CreateNewComment />
                </div>
            </div>
        </>
    );
};

export default SongDetails;

    // let pageBody;
    // if (showSongForm) {
    //     pageBody = (
    //         <div>
    //             <CreateNewSong songs={songs} />
    //             <button onClick={() => setShowSongForm(false)}> Cancel </button>
    //         </div>
    //     )
    // } else
    // if (showEditForm) {
    //     pageBody = (
    //         <div>
    //             <div>
    //                 <UpdateSong currentSong={currentSong} />
    //                 <button onClick={() => setShowEditForm(false)}> Cancel </button>
    //             </div>
    //             <div>
    //                 < DeleteSong />
    //             </div>
    //         </div>
    //     )
    // }