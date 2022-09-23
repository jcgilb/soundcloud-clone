import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import GetAllComments from "../GetAllComments"
import CreateNewComment from "../CreateAComment"
import UpdateSong from "../UpdateSong";
import { useIsPaused } from '../../context/IsPausedContext.js';

const SongDetails = () => {
    const curSong = useSelector(state => state.songs.currentSong)
    const [currentSong, setCurrentSong] = useState(curSong)
    const dispatch = useDispatch();
    const { setIsPaused } = useIsPaused();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
    const comments = useSelector(state => state.comments);
    const user = useSelector(state => state.session.user);

    songId = parseInt(songId);
    const songFromUrl = Object.values(songs).find(song => song.id === songId);

    useEffect(() => {
        dispatch(getOneSong(songId));
    }, [dispatch, songId]);

    if (!songFromUrl) return null;

    return (
        <>
            <div className="one-song">
                <div className="song-details">
                    <h3>{songFromUrl.title}</h3>
                    <p>{songFromUrl.userId}</p>
                    <p>{songFromUrl.description}</p>
                    <p>{songFromUrl.url}</p>
                    <p>{songFromUrl.imageUrl}</p>
                    <div key="play" className="play-current-song">
                        <button onClick={() => {
                            dispatch(playASong(songFromUrl.id))
                            setCurrentSong(songFromUrl)
                        }}> ... </button>
                        {currentSong === songFromUrl &&
                            <>
                                <button className="press-play" onClick={() => setIsPaused(false)}>Play</button>
                                <button className="press-pause" onClick={() => setIsPaused(true)}>Pause</button>
                            </>
                        }
                    </div>
                </div>
                <div>
                    <GetAllComments />
                </div>
                <div>
                    <CreateNewComment />
                </div>

                {user.id === songFromUrl.userId &&
                    <UpdateSong />
                }
            </div>
        </>
    );
};

export default SongDetails;
