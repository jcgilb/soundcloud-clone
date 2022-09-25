import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js"
import { NavLink } from 'react-router-dom';
import { useIsPaused } from '../../context/IsPausedContext.js';
// import "./GetAllSongs.css"
import "../SplashPage/SplashPage.css"

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

        <div className="main-container-div">
            <div className='main-top-div'>
                {/* <img alt="main-background" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664141664/backgrounds/sc_landing_header_web_b-447230ef_pzqzhn.jpg"} /> */}
            </div>
            <div className='main-middle-div'>
                <div className='title-container'>
                    <div className="main-title">All songs</div>

                    <div className="tiles">
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
                </div>


            </div >


        </div>
        // <div className="songs">
        //     <div className="songs-container">
        //         <div className="grid">
        //             {myMap.map((song) => (
        //                 <div className="song-card">
        //                     <div key="image" className="image-url">
        //                         <div className='album-cover'>
        //                             <img className="card" alt={song.id} src={song.imageUrl} />
        //                             <div className="press-play"
        //                                 onClick={async (e) => {
        //                                     e.preventDefault();
        //                                     await dispatch(playASong(song.id))
        //                                 }}>
        //                                 <i class="fas fa-light fa-circle-play fa-2xl"></i>
        //                             </div>
        //                         </div>
        //                         <div className="title-nav">
        //                             <NavLink className={song.id} key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
        //                             <p id="artist-name"> {song.Artist.username}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div >
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