import { useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getSongs } from "../../store/songs"
import { useIsPaused } from '../../context/IsPausedContext';
import "./Audio.css";

const Player = ({ songs }) => {
    const { isPaused, setIsPaused } = useIsPaused();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    let currentSong = songs.currentSong;
    const player = useRef();

    if (isPaused === false) {
        if (currentSong) {
            player.current.audio.current.play();
            setIsPaused(null);
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
