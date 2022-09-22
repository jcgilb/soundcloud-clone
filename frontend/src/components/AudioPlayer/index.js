import { useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSong } from '../../store/songs'
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' // Use LESS
// import 'react-h5-audio-player/src/styles.scss' // Use SASS
import { useCurrentSong } from "../../context/CurrentSongContext";

const Player = () => {
    const dispatch = useDispatch();
    const { currentSong } = useCurrentSong();
    // const songs = useSelector(state => state.songs)

    useEffect(() => {
        if (!currentSong) return null;
        dispatch(getOneSong(currentSong.id))
        console.log("this is my currentSong in my audio player", currentSong)
    }, [dispatch])

    if (!currentSong) return null
    return (
        <div className="audio-url">
            <AudioPlayer
                // autoPlay
                src={currentSong.url}
                onPlay={e => console.log("onPlay")}
            // other props here
            />
        </div>
    )
}

export default Player;
