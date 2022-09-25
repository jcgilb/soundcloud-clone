import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js"
import { NavLink } from 'react-router-dom';
import { useIsPaused } from '../../context/IsPausedContext.js';
import "./GetAllSongs.css"

const GetAllSongs = () => {
    const curSong = useSelector(state => state.songs.currentSong)
    const [currentSong, setCurrentSong] = useState(curSong)
    const dispatch = useDispatch();
    const { setIsPaused } = useIsPaused();

    const songsObj = useSelector(state => state.songs)
    let myMap = Object.values(songsObj).slice(0, Object.values(songsObj).length - 1)

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    return (
        <div className="songs">
            <div className="songs-container">
                <div className="grid">
                    {myMap.map((song) => (
                        <div className="song-card">
                            <div key="image" className="image-url">
                                <div className='album-cover'>
                                    <img className="card" alt={song.id} src={song.imageUrl} />
                                    <div className="press-play"
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
            </div>
        </div >
    );
};
export default GetAllSongs;


{/* <div key="play" className="play-current-song">
    <button onClick={() => {
        setCurrentSong(song)
    }}> ... </button>
    {currentSong === song &&
        <>
            <button className="press-play" onClick={async () => {
                setIsPaused(false)
                await dispatch(playASong(song.id))
            }}>Play</button>
            <button className="press-pause" onClick={() => setIsPaused(true)}>Pause</button>
        </>
    }
</div> */}