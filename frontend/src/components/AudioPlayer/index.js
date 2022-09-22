import { useCurrentSong } from "../../context/CurrentSongContext";
import { useIsPaused } from '../../context/IsPausedContext';

const Player = () => {
    const { currentSong } = useCurrentSong();
    const { isPaused, setIsPaused } = useIsPaused()

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

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOneSong } from '../../store/songs'

// const dispatch = useDispatch();
// const songs = useSelector(state => state.songs)

// useEffect(() => {
//     if (!currentSong) return null;
//     dispatch(getOneSong(currentSong.id))
//     console.log("this is my currentSong in my audio player", currentSong)
// }, [dispatch]);

// if (!currentSong) return null