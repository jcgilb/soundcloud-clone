import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import GetAllComments from "../GetAllComments"
import CreateNewComment from "../CreateAComment"
import UpdateSong from "../UpdateSong";
import { useIsPaused } from '../../context/IsPausedContext.js';
import { NavLink } from "react-router-dom";
import "./SongDetails.css"

const SongDetails = () => {
    // context for the audio player
    const { isPaused, setIsPaused } = useIsPaused();
    // state for controlling whether or not to render the "pause" button
    const [pauseButton, setPauseButton] = useState(false);
    const curSong = useSelector(state => state.songs.currentSong);
    const [currentSong, setCurrentSong] = useState(curSong);
    const [color1, setColor1] = useState(1);
    const [color2, setColor2] = useState(1);
    const dispatch = useDispatch();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
    const user = useSelector(state => state.session.user);

    songId = parseInt(songId);
    const songFromUrl = Object.values(songs).find(song => song.id === songId);

    useEffect(() => {
        dispatch(getOneSong(songId));
        setColor1(one)
        setColor2(two)
    }, [dispatch, songId]);

    // random color
    const getColor = () => {
        const hexChars = "0123456789abcdef";
        let hex = "#";
        for (let i = 0; i < 6; i++) {
            hex += hexChars[Math.floor(Math.random() * hexChars.length)];
        }
        return hex;
    };

    const one = getColor();
    const two = getColor();

    const randomGradient = {
        background: `linear-gradient(to right, ${color1}, ${color2})`
    }

    if (!songFromUrl) return null;

    return (
        <>
            <div className="one-song">
                <div className="song-details"
                    style={randomGradient}
                >
                    <div key="desc" className="description">
                        <div key="play" className="play-current-song">
                            {/* <div className="press-play"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await dispatch(playASong(songFromUrl.id))
                                }}>
                                <i className="fas fa-light fa-circle-play fa-4x"></i>
                            </div> */}
                            {!pauseButton &&
                                <div className="press-play"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        setCurrentSong(songFromUrl)
                                        await dispatch(playASong(songFromUrl.id))
                                        setIsPaused(false);
                                        setPauseButton(true);
                                    }}><i style={{ cursor: "pointer" }} className="fa-solid fa-play fa-4x"></i>
                                </div>
                            }

                            {/* show the paused button after a user presses play */}
                            {currentSong === songFromUrl && pauseButton &&
                                <div className="press-pause"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        setIsPaused(true);
                                        setPauseButton(false);
                                    }}><i style={{ cursor: "pointer" }} className="fa-solid fa-pause fa-4x"></i>
                                </div>
                            }

                        </div>
                        <div className="artist-details">
                            <h2>{songFromUrl.title}</h2>
                            <span>
                                {songFromUrl?.Artist?.username}
                            </span>
                        </div>
                    </div>
                    <div key="image" className="individual-song-image-url">

                        <img alt={songFromUrl.id} src={songFromUrl.imageUrl} />

                    </div>

                </div>
                <div className="edit-song-details">
                    {user?.id === songFromUrl.userId &&
                        <NavLink style={{ color: "black" }} to={`/songs/${songFromUrl.id}/edit`}>Edit song details</NavLink>
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

