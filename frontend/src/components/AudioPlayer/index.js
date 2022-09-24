import { useIsPaused } from '../../context/IsPausedContext';
import { useSelector } from "react-redux";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./Audio.css";

const Player = () => {
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
        <footer>
            <div className="audio-url">
                <AudioPlayer
                    className="audio"
                    src={currentSong.url}
                    autoPlay
                    controls
                />
            </div>
        </footer>
    )
}
<>

</>


export default Player;

{/* <audio className="audio"
    id="player"
    autoPlay
    play="true"
    controls
    src={currentSong.url}
/> */}