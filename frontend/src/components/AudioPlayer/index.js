import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { getSongs } from "../../store/songs"
import { useIsPaused } from '../../context/IsPausedContext';
import { useIsPlaying } from '../../context/IsPlayingContext';
import { useAudioElement } from '../../context/AudioElementContext';
import "./Audio.css";

const Player = ({ songs }) => {
    // context for when the song is paused
    const { isPaused, setIsPaused } = useIsPaused();
    const { isPlaying, setIsPlaying } = useIsPlaying();

    // get the audio element to use in other components
    const { audioElement, setAudioElement } = useAudioElement();
    // let thisAudioElement = document.querySelector("audio");

    const dispatch = useDispatch();
    // get songs
    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    // identify the "current song"
    let currentSong = songs.currentSong;

    // get a reference to the audio player 
    // in order to perform .play() and .pause() methods
    const player = useRef();
    setAudioElement(player.current);

    if (isPaused === false) {
        if (currentSong) {
            player.current.audio.current.play();
            setIsPaused(null); // prevents infinite loop
            setIsPlaying(true);
        }
    }
    if (isPaused) {
        if (currentSong) {
            player.current.audio.current.pause();
            setIsPaused(null)
            setIsPlaying(false);
        }
    }

    return (
        <>
            <AudioPlayer className='audio'
                ref={player}
                src={currentSong.url}
                showJumpControls={true}
                crossOrigin='anonymous'
                timeFormat={"mm:ss"}
                onPlay={(e) => {
                    e.preventDefault();
                    setIsPaused(false);
                }}
                onPause={(e) => {
                    e.preventDefault();
                    setIsPaused(true);
                }}
                autoPlayAfterSrcChange={true}
            />
            <div className="song-details-preview">
                <img alt='album-art' src={currentSong.imageUrl} />
                <div>
                    <div className="track-details">{currentSong.title}</div>
                    <div className="artist-details">by{" "}{currentSong?.Artist?.username}</div>
                </div>
            </div>
        </>
    );
};

export default Player;
