import { useCurrentSong } from "../../context/CurrentSongContext";
import { useIsPaused } from '../../context/IsPausedContext';
import { useState } from "react";
import { useSelector } from "react-redux";

const Player = () => {
    const { currentSong } = useCurrentSong();
    const { isPaused, setIsPaused } = useIsPaused();
    const [trackList, setTrackList] = useState([...songs]);
    // const [trackIndex, setTrackIndex] = useState();
    let songs = useSelector(state => state.songs)
    let songsArr = Object.values(songs)

    // if (currentSong) {

    //     setTrackList(currentSong, ...songsArr)
    // }
    // console.log("this is my trackList", trackList)

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
            {currentSong &&
                <audio className="audio"
                    // autoPlay
                    play="true"
                    controls
                    src={currentSong.url}
                />
            }
        </div>
    )
}

export default Player;
