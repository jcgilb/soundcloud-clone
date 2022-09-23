import { useIsPaused } from '../../context/IsPausedContext';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Player = ({ songs }) => {
    const { isPaused, setIsPaused } = useIsPaused();
    // const [trackList, setTrackList] = useState([...songs]);
    // const [trackIndex, setTrackIndex] = useState();
    let currentSong = useSelector(state => state.songs.currentSong)

    if (isPaused === false) {
        if (currentSong) {
            let audio = document.querySelector("audio.audio")
            audio.play();
            setIsPaused(null);
        }
    }
    if (isPaused) {
        if (currentSong) {
            let audio = document.querySelector("audio.audio")
            audio.pause();
            // console.log("paused is true")
            setIsPaused(null)
        }
    }

    return (
        // load up a playlist so the player always shows
        <div className="audio-url">

            <audio className="audio"
                autoPlay
                play="true"
                controls
                src={currentSong.url}
            />

        </div>
    )
}

export default Player;
