import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import { useIsPlaying } from '../../context/IsPlayingContext';
import { useAudioElement } from '../../context/AudioElementContext';
import { useIsPaused } from '../../context/IsPausedContext';
import GetAllComments from "../GetAllComments"
import CreateNewComment from "../CreateAComment"
import { Wave } from "@foobar404/wave";
import "./SongDetails.css";

const SongDetails = () => {
    const dispatch = useDispatch();
    // context for the audio player
    const { isPaused, setIsPaused } = useIsPaused();
    const { isPlaying, setIsPlaying } = useIsPlaying();
    // state for controlling whether or not to render the "pause" button
    const [pauseButton, setPauseButton] = useState(false);
    const curSong = useSelector(state => state.songs.currentSong);
    const [currentSong, setCurrentSong] = useState(curSong);
    // get and set two random colors for gradient
    const [color1, setColor1] = useState(1);
    const [color2, setColor2] = useState(1);
    let { songId } = useParams();
    const songs = useSelector(state => state.songs);
    const user = useSelector(state => state.session.user);
    // identify song from url
    songId = parseInt(songId);
    const songFromUrl = Object.values(songs).find(song => song.id === songId);
    const [audioSource, setAudioSource] = useState(currentSong.url);
    const [playing, setPlaying] = useState(false);
    const [curTime, setCurrentTime] = useState(0);
    const [trashState, setTrashState] = useState()
    const thisWave = useRef()
    const { audioElement } = useAudioElement();
    // console.log("song from URl", songFromUrl)

    useEffect(() => {
        dispatch(getOneSong(songId));
        // put these in a useEffect so a new gradient doesn't render every time a
        // user posts a comment or presses play/pause
        setColor1(one);
        setColor2(two);
    }, [dispatch, songId]);

    let wave;
    let myAudio;
    useLayoutEffect(() => {
        if (!trashState) {
            if (audioElement && currentSong === songFromUrl) {
                // console.log("audio is muted")
                myAudio = new Audio(songFromUrl.url);
                myAudio.crossOrigin = "anonymous";
                myAudio.autoplay = "false"
                myAudio.currentTime = curTime
                audioElement.audio.current.volume = 0;
                // console.log("audio currentTime", myAudio.currentTime)
                setAudioSource(currentSong.url);
                let canvasElement = document.querySelector("#output");
                wave = new Wave(myAudio, canvasElement);
                wave.clearAnimations()
                wave.addAnimation(new wave.animations.Wave());
                const constraints = { audio: true };
                async function getMedia(constraints) {
                    let stream = null;
                    try {
                        stream = await navigator.mediaDevices.getUserMedia(constraints);
                    } catch (err) { console.log(err.message) }
                }
                getMedia(constraints)
            }
            setTrashState(true)
        }
        if (isPlaying) {
            if (audioElement && currentSong === songFromUrl) {
                // console.log("audio is muted")
                myAudio = new Audio(songFromUrl.url);
                myAudio.crossOrigin = "anonymous";
                myAudio.autoplay = "false"
                myAudio.currentTime = curTime;
                // console.log("audio currentTime", myAudio.currentTime)
                audioElement.audio.current.volume = 0;
                setAudioSource(currentSong.url);
                let canvasElement = document.querySelector("#output");
                wave = new Wave(myAudio, canvasElement);
                wave.clearAnimations()
                wave.addAnimation(new wave.animations.Wave());
                const constraints = { audio: true };
                async function getMedia(constraints) {
                    let stream = null;
                    try {
                        stream = await navigator.mediaDevices.getUserMedia(constraints);
                    } catch (err) {
                        // console.log(err.message);
                    }
                }
                getMedia(constraints)
            }
        }
        if (myAudio) {
            return () => {
                // console.log("cleaning up audio")
                if (myAudio) { myAudio.src = null }
                audioElement.audio.current.volume = 1;
            }
        }
    }, [currentSong, isPlaying, trashState]);

    // random color
    const getColor = () => {
        // all possible hex characters
        const hexChars = "0123456789abcdef";
        let hex = "#";
        // loop through and concatenate 6 random chars onto "#"
        for (let i = 0; i < 6; i++) {
            hex += hexChars[Math.floor(Math.random() * hexChars.length)];
        }
        // return the random color
        return hex;
    };

    // call random color generator twice to get two random colors
    const one = getColor();
    const two = getColor();

    // define inline gradient style
    const randomGradient = {
        background: `linear-gradient(to right, ${color1}, ${color2})`
    }

    if (!songFromUrl) return null;

    return (
        <>
            <div className="one-song">
                {/* use the random gradient as a background */}
                <div className="song-details" style={randomGradient}>
                    <div className="left-wrapper">
                        <div key="desc" className="description">
                            <div key="play" className="play-current-song">
                                {/* show play button initially or if paused */}
                                {!pauseButton &&
                                    <div className="press-play"
                                        onClick={async (e) => {
                                            if (currentSong !== songFromUrl) {
                                                if (currentSong.url) setIsPlaying(false)
                                                setCurrentSong(songFromUrl)
                                                // console.log(audioElement.audio.current.currentTime)
                                                setCurrentTime(parseFloat(audioElement.audio.current.currentTime))
                                            }
                                            e.preventDefault();
                                            await dispatch(playASong(songFromUrl.id))
                                            setIsPaused(false);
                                            setIsPlaying(true)
                                            setPauseButton(true);
                                            setCurrentTime(parseFloat(audioElement.audio.current.currentTime))
                                        }}><i style={{ cursor: "pointer" }} className="fa-solid fa-play fa-4x"></i>
                                    </div>
                                }
                                {/* show the paused button after a user presses play */}
                                {currentSong === songFromUrl && pauseButton &&
                                    <div className="press-pause"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            setIsPaused(true);
                                            setIsPlaying(false);
                                            setPauseButton(false);
                                            setCurrentTime(parseFloat(audioElement.audio.current.currentTime))
                                            // console.log(audioElement.audio.current.currentTime)
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
                        <div className="audio-visualizer">
                            <div ref={thisWave} className="wave">
                                <canvas id="output" />
                            </div>
                        </div>
                    </div>
                    <div key="image" className="individual-song-image-url">
                        <img style={{ borderRadius: "4px" }} alt={songFromUrl.id} src={songFromUrl.imageUrl} />
                    </div>
                </div>
                <div className="edit-song-details">
                    {user?.id === songFromUrl.userId &&
                        // get rid of NavLink default styling
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

