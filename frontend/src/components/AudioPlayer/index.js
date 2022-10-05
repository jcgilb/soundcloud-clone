import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { getSongs } from "../../store/songs"
import { useIsPaused } from '../../context/IsPausedContext';
import "./Audio.css";

const Player = ({ songs }) => {
    // context for when the song is paused
    const { isPaused, setIsPaused } = useIsPaused();
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

    if (isPaused === false) {
        if (currentSong) {
            player.current.audio.current.play();
            setIsPaused(null); // prevents infinite loop
        }
    }
    if (isPaused) {
        if (currentSong) {
            player.current.audio.current.pause();
            setIsPaused(null)
        }
    }

    return (
        <>
            <AudioPlayer className='audio'
                ref={player}
                src={currentSong.url}
                showJumpControls={true}
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
