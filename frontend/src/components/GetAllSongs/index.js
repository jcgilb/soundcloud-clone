import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs.js"
import { NavLink } from 'react-router-dom';
import { useCurrentSong } from "../../context/CurrentSongContext";
import { useIsPaused } from '../../context/IsPausedContext.js';

const GetAllSongs = () => {
    const dispatch = useDispatch();
    const { currentSong, setCurrentSong } = useCurrentSong();
    const { setIsPaused } = useIsPaused();

    const songsObj = useSelector(state => state.songs)
    const songsArr = Object.values(songsObj);

    useEffect(() => {
        // console.log("dispatching in my GetAllSongs useEffect");
        dispatch(getSongs());
    }, [dispatch]);

    // console.log("these are my songs", songsObj);
    // console.log("this is my songs array", songsArr);
    // console.log("current song in get all songs,", currentSong)

    return (
        <>
            <div>
                {songsArr.map((song) => (
                    <h2>
                        <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <div className="description">{song.description}</div>
                        <div className="image-url">
                            <img alt={song.id} src={song.imageUrl} />
                        </div>
                        <div className="set-current-song">
                            <button className="select-song" onClick={() => setCurrentSong(song)}>Select song</button>
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
