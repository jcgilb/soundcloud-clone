import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Wave } from "@foobar404/wave";
import { useAudioElement } from '../../context/AudioElementContext';
import { useIsPaused } from '../../context/IsPausedContext';
import { useIsPlaying } from '../../context/IsPlayingContext';
import ReactDom from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';


const Waves = () => {
    const currentSong = useSelector(state => state.songs.currentSong);
    const [audioSource, setAudioSource] = useState(currentSong.url);
    const { isPaused, setIsPaused } = useIsPaused();
    const thisWave = useRef()
    const { audioElement } = useAudioElement();
    const dispatch = useDispatch();

    let wave;
    useEffect(() => {
        if (audioElement && currentSong.url) {
            setAudioSource(currentSong.url);
            let canvasElement = document.querySelector("#output");
            wave = new Wave(audioElement.audio.current, canvasElement);
            wave.clearAnimations()
            console.log("my wave object", wave)
            console.log("audioElement", audioElement.audio.current);

            // Simple animation
            wave.addAnimation(new wave.animations.Wave());

            const constraints = { audio: true };

            async function getMedia(constraints) {
                let stream = null;
                try {
                    stream = await navigator.mediaDevices.getUserMedia(constraints);
                } catch (err) {
                    console.log(err.message);
                }
            }
            getMedia(constraints)
        }
    }, [currentSong, audioElement, isPaused]);

    if (!currentSong.url) return null;
    if (!audioElement) return null

    return (
        <div ref={thisWave} className="wave">
            <canvas id="output" height="70" width="235" />
        </div>
    );
}

export default Waves