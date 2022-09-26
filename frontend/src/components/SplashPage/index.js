
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js"
import { NavLink } from 'react-router-dom';
import { useIsPaused } from '../../context/IsPausedContext.js';
import "./SplashPage.css"
const SplashPage = ({ songs }) => {

    const curSong = useSelector(state => state.songs.currentSong)
    const [currentSong, setCurrentSong] = useState(curSong)
    const dispatch = useDispatch();
    const { setIsPaused } = useIsPaused();

    // const songsObj = useSelector(state => state.songs)
    let myMap = Object.values(songs).slice(0, 10);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    // if (!myMap.length) return null;

    return (
        <div className="main-container-div">
            <div className='main-top-div'>
                <img alt="main-background" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664141664/backgrounds/sc_landing_header_web_b-447230ef_pzqzhn.jpg"} />
            </div>
            <div className='main-middle-div'>
                <div className="main-trending-title">Hear what's trending in the Audio Stratus community</div>
                <div className="tiles-splash">
                    {myMap.map((song) => (
                        <div className="song-tile">
                            <div key="image" className="image-url">
                                <div className='album-art'>
                                    <img className="tile" alt={song.id} src={song.imageUrl} />
                                    <div className="play-button"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await dispatch(playASong(song.id))
                                        }}>
                                        <i class="fas fa-light fa-circle-play fa-2xl"></i>
                                    </div>
                                </div>
                                <div className="title-nav">
                                    <NavLink className={song.id} key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                                    <p id="artist-name"> {song.Artist.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div >


        </div>

    )
}

export default SplashPage;
