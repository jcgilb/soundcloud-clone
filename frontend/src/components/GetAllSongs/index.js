import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js"
import { NavLink } from 'react-router-dom';
import { useIsPaused } from '../../context/IsPausedContext.js';

const GetAllSongs = () => {
    const curSong = useSelector(state => state.songs.currentSong)
    const [currentSong, setCurrentSong] = useState(curSong)
    const dispatch = useDispatch();
    const { setIsPaused } = useIsPaused();

    const songsObj = useSelector(state => state.songs)
    let myMap = Object.values(songsObj).slice(0, Object.values(songsObj).length - 1)
    console.log("myMap is: ", myMap)

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    return (
        <>
            <div>
                {myMap.map((song) => (
                    <h2>
                        <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <div key="desc" className="description">{song.description}</div>
                        <div key="image" className="image-url">
                            <img alt={song.id} src={song.imageUrl} />
                        </div>
                        <div key="play" className="play-current-song">
                            <button onClick={() => {
                                dispatch(playASong(song.id))
                                setCurrentSong(song)
                            }}> ... </button>
                            {currentSong === song &&
                                <>
                                    <button className="press-play" onClick={() => setIsPaused(false)}>Play</button>
                                    <button className="press-pause" onClick={() => setIsPaused(true)}>Pause</button>
                                </>
                            }
                        </div>

                    </h2>
                ))}

            </div>
        </>

    );
};
export default GetAllSongs;
