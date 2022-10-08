import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import GetAllComments from "../GetAllComments"
import CreateNewComment from "../CreateAComment"
import Waves from "../Wave";
// import MyWave from "../WaveForm";
import { useIsPaused } from '../../context/IsPausedContext.js';
import { NavLink, useHistory } from "react-router-dom";
import "./SongDetails.css"
import ReactDom from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

const SongDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // context for the audio player
    const { setIsPaused } = useIsPaused();
    const theWaveNode = useRef();
    const [randomState, setRandomState] = useState(null)

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

    useEffect(() => {
        dispatch(getOneSong(songId));
        // put these in a useEffect so a new gradient doesn't render every time a
        // user posts a comment or presses play/pause
        setColor1(one);
        setColor2(two);

        // return () => {
        //     let el = ReactDom.findDOMNode(theWaveNode.current)
        //     console.log("this is the component to DESTROY", el)
        //     unmountComponentAtNode(el);
        //     // document.body.removeChild(el);
        // }

    }, [dispatch, songId]);

    useLayoutEffect(() => {
        return () => {
            // let el = ReactDom.findDOMNode(theWaveNode.current)
            // console.log("this is the component to DESTROY", el)
            // unmountComponentAtNode(el);
            // // document.body.removeChild(el);
        }
    }, [currentSong])

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
                                                const count = sessionStorage.getItem('count');
                                                if (count < 1) {
                                                    sessionStorage.setItem('count', String(count + 1));
                                                    window.location.reload();
                                                } else {
                                                    sessionStorage.removeItem('count');
                                                    setCurrentSong(songFromUrl)
                                                    // e.preventDefault();
                                                    await dispatch(playASong(songFromUrl.id))
                                                    setIsPaused(false);
                                                    setPauseButton(true);
                                                }
                                            }
                                            setCurrentSong(songFromUrl)
                                            e.preventDefault();
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
                        <div ref={theWaveNode} className="audio-visualizer">
                            <Waves />
                            {/* <MyWave /> */}
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

