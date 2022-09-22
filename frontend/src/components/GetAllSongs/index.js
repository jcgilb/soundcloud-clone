import { useEffect, state } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs, getOneSong } from "../../store/songs.js"
import { NavLink } from 'react-router-dom';
import { useCurrentSong } from "../../context/CurrentSongContext";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const GetAllSongs = () => {
    // const [isPlaying, setIsPlaying] = useState(false);
    const dispatch = useDispatch();
    const { currentSong, setCurrentSong } = useCurrentSong();
    const songsObj = useSelector(state => state.songs)
    const songsArr = Object.values(songsObj);

    useEffect(() => {
        console.log("dispatching in my GetAllSongs useEffect");
        dispatch(getSongs());
    }, [dispatch]);

    console.log("these are my songs", songsObj);
    console.log("this is my songs array", songsArr);
    console.log("current song in get all songs,", currentSong)

    if (!songsArr.length) return null;

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
                            <button className="press-play" onClick={() => setCurrentSong(song)}>Play</button>
                        </div>
                    </h2>
                ))}

            </div>
        </>

    );
};
export default GetAllSongs;
