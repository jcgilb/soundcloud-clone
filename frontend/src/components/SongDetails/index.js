import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import GetAllComments from "../GetAllComments"
import CreateNewComment from "../CreateAComment"
import UpdateSong from "../UpdateSong";
import { useIsPaused } from '../../context/IsPausedContext.js';
import "./SongDetails.css"

const SongDetails = () => {
    const curSong = useSelector(state => state.songs.currentSong)
    const [currentSong, setCurrentSong] = useState(curSong)
    const dispatch = useDispatch();
    const { setIsPaused } = useIsPaused();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
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

                    <div key="desc" className="description">
                        <div key="play" className="play-current-song">
                            <div className="press-play"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await dispatch(playASong(songFromUrl.id))
                                }}>
                                <i class="fas fa-light fa-circle-play fa-2xl"></i>
                            </div>

                        </div>
                        <div className="artist-details">
                            <h2>{songFromUrl.title}</h2>
                            {songFromUrl.Artist.username}
                        </div>
                    </div>
                    <div key="image" className="image-url">

                        <img alt={songFromUrl.id} src={songFromUrl.imageUrl} />

                    </div>

                </div>
                <div className="edit-song-details">
                    {user.id === songFromUrl.userId &&
                        <UpdateSong />
                    }
                </div>

                <div className="comments-container">
                    <div className="leave-comment">
                        <CreateNewComment />
                    </div>

                    <GetAllComments />
                </div>
            </div>
        </>
    );
};

export default SongDetails;

