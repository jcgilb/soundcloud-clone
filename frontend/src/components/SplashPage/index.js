import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js"
import { NavLink, useHistory } from 'react-router-dom';
import { useIsPaused } from '../../context/IsPausedContext.js';
import "./SplashPage.css"

const SplashPage = ({ songs }) => {
    // context for the audio player
    const { isPaused, setIsPaused } = useIsPaused();
    // state for controlling whether or not to render the "pause" button
    const [pauseButton, setPauseButton] = useState(false);
    const curSong = useSelector(state => state.songs.currentSong);
    const [currentSong, setCurrentSong] = useState(curSong);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    // only show the first 10 songs on the splash page
    let myMap = Object.values(songs).slice(0, 10);
    if (!myMap.length) return null;

    if (!myMap.length) return null;

    return (
        <div className="splash-container">
            <div className="top-splash">
                <img className="img-splash" alt="main-background" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664141664/backgrounds/sc_landing_header_web_b-447230ef_pzqzhn.jpg"} />
            </div>
            <div className="middle-splash">
                Hear what's trending in the Audio Stratus community
            </div>
            <hr></hr>
            <div className="bottom-splash">
                {myMap.length > 0 &&
                    myMap.map((song) => (
                        <div className="song-card">
                            <div id="inner-song-card">
                                <div className='album-cover'>
                                    <img style={{ borderRadius: "4px" }} alt="album-cover" src={`${song.imageUrl}`} />
                                    <div className="play-pause">
                                        {/* render a play button on every song */}
                                        {song !== currentSong &&
                                            <div className="play-button"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    setCurrentSong(song)
                                                    await dispatch(playASong(song.id))
                                                    setIsPaused(false);
                                                    setPauseButton(true);
                                                }}><i className="fa-solid fa-play fa-2x"></i>
                                            </div>
                                        }
                                        {!pauseButton &&
                                            <div className="play-button"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    setCurrentSong(song)
                                                    await dispatch(playASong(song.id))
                                                    setIsPaused(false);
                                                    setPauseButton(true);
                                                }}><i className="fa-solid fa-play fa-2x"></i>
                                            </div>
                                        }

                                        {/* show the paused button after a user presses play */}
                                        {currentSong === song && pauseButton &&
                                            <div className="pause-button"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    setIsPaused(true);
                                                    setPauseButton(false);
                                                }}><i className="fa-solid fa-pause fa-2x"></i>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="artist-info">
                                    <NavLink style={{ color: "black", fontSize: "14.5px", textDecoration: "none" }} to={`/songs/${song.id}`}>{song.title}</NavLink>
                                    <div onClick={(e) => {
                                        e.preventDefault();
                                        history.push(`/songs/${song.id}`)
                                    }}
                                        className="artist-name">{song.Artist?.username} </div>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div >
    )

    // return (
    //     <div className="main-container-div">
    //         <div className='main-top-div'>
    //             <img alt="main-background" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664141664/backgrounds/sc_landing_header_web_b-447230ef_pzqzhn.jpg"} />
    //         </div>
    //         <div className='main-middle-div'>
    //             <div className="main-trending-title">Hear what's trending in the Audio Stratus community</div>
    //             <div className="tiles-splash">
    //                 {myMap.map((song) => (
    //                     <div className="song-tile">
    //                         <div key="image" className="image-url">
    //                             <div className='album-art'>
    //                                 <img className="tile" alt={song.id} src={song.imageUrl} />
    //                                 <div className="play-pause">
    //                                     {/* render a play button on every song */}
    //                                     {song !== currentSong &&
    //                                         <div className="play-button"
    //                                             onClick={async (e) => {
    //                                                 e.preventDefault();
    //                                                 setCurrentSong(song)
    //                                                 await dispatch(playASong(song.id))
    //                                                 setIsPaused(false);
    //                                                 setPauseButton(true);
    //                                             }}><i className="fa-solid fa-play fa-2x"></i>
    //                                         </div>
    //                                     }
    //                                     {!pauseButton &&
    //                                         <div className="play-button"
    //                                             onClick={async (e) => {
    //                                                 e.preventDefault();
    //                                                 setCurrentSong(song)
    //                                                 await dispatch(playASong(song.id))
    //                                                 setIsPaused(false);
    //                                                 setPauseButton(true);
    //                                             }}><i className="fa-solid fa-play fa-2x"></i>
    //                                         </div>
    //                                     }

    //                                     {/* show the paused button after a user presses play */}
    //                                     {currentSong === song && pauseButton &&
    //                                         <div className="pause-button"
    //                                             onClick={async (e) => {
    //                                                 e.preventDefault();
    //                                                 setIsPaused(true);
    //                                                 setPauseButton(false);
    //                                             }}><i className="fa-solid fa-pause fa-2x"></i>
    //                                         </div>
    //                                     }
    //                                 </div>
    //                             </div>
    //                             <div className="title-nav">
    //                                 <NavLink style={{ color: "black", textDecoration: "none" }} to={`/songs/${song.id}`}>{song.title}</NavLink>
    //                                 <div onClick={(e) => {
    //                                     e.preventDefault();
    //                                     history.push(`/songs/${song.id}`)
    //                                 }}
    //                                     className="artist-name">{song.Artist?.username}
    //                                     cd </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div >
    //     </div>
    // )
}

export default SplashPage;
