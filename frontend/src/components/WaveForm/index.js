// import { WaveSurfer, WaveForm } from 'wavesurfer-react';
// import { useAudioElement } from '../../context/AudioElementContext';
// import { useIsPaused } from '../../context/IsPausedContext';
// import { useIsPlaying } from '../../context/IsPlayingContext';
// import { useEffect, useRef, useCallback, useState } from 'react';
// import { useSelector } from 'react-redux';

// // THIS IS THE SECOND UGLIEST AUDIO VISUALIZER, 
// // USE AS SECOND TO LAST RESORT

// const MyWave = () => {
//     const currentSong = useSelector(state => state.songs.currentSong);
//     const [audioSource, setAudioSource] = useState(currentSong.url);
//     const { isPaused, setIsPaused } = useIsPaused();
//     const { isPlaying, setIsPlaying } = useIsPlaying();
//     const { audioElement } = useAudioElement();
//     const wavesurferRef = useRef();

//     useEffect(() => {
//         setAudioSource(currentSong.url)
//         wavesurferRef.current.load(currentSong.url);

//     }, [currentSong])

//     const handleWSMount = useCallback((waveSurfer) => {

//         wavesurferRef.current = waveSurfer;

//         if (wavesurferRef.current && currentSong.url) {
//             // wavesurferRef.current.load(currentSong.url);

//             wavesurferRef.current.on("ready", () => {
//                 console.log("WaveSurfer is ready");
//             });

//             wavesurferRef.current.on("loading", (data) => {
//                 console.log("loading --> ", data);
//             });

//             if (window) {
//                 window.surferidze = wavesurferRef.current;
//             }
//         }
//     }, [audioSource, isPaused, currentSong]);

//     useEffect(() => {
//         if (isPlaying) {
//             wavesurferRef.current.playPause();
//         }
//     }, [isPlaying, isPaused])

//     if (!currentSong.url) return null;
//     return (
//         <>
//             < WaveSurfer onMount={handleWSMount}>
//                 <WaveForm id="waveform" hideScrollbar="true" waveColor="#005999" progressColor="#005999" />
//                 {/* <WaveForm
//                     id={`WF`}
//                     waveColor={"#808080"}
//                     progressColor={"#cc2223"}
//                     normalize={true}
//                     height={128}
//                     barRadius={3}
//                     barWidth={3}
//                     barMinHeight={25}
//                     hideScrollbar={true}
//                 ></WaveForm> */}
//             </WaveSurfer>
//             {/* <button onClick={play}>Play / Pause</button> */}
//         </>
//     )
// }
// export default MyWave;

// REALLY UGLY WAVE ONLY USE AS LAST RESORT 

import ReactWaves from "@dschoon/react-waves";
import { useAudioElement } from '../../context/AudioElementContext';
import { useIsPaused } from '../../context/IsPausedContext';
import { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
console.log(ReactWaves);

export default function MyWave() {
    const currentSong = useSelector(state => state.songs.currentSong);
    const [audioSource, setAudioSource] = useState(currentSong.src);
    const [playing, setPlaying] = useState(false);
    const { isPaused, setIsPaused } = useIsPaused();
    const { audioElement } = useAudioElement();


    useEffect(() => {
        setAudioSource(currentSong.src);
        console.log("song src", currentSong.src)
    }, [currentSong, audioElement, isPaused]);

    if (!currentSong.url) return null
    return (
        <div className="App">
            <div style={{ fontSize: 62 }} onClick={() => setPlaying(!playing)}>
                {!playing ? "▶" : "■"}
            </div>
            <ReactWaves
                audioFile={currentSong.url}
                playing={playing}
                options={{
                    barWidth: 3,
                    barRadius: 2,
                    hideScrollbar: true,
                    cursorWidth: 0,
                    progressColor: "#4159FB",
                    waveColor: "rgba(65, 89, 251, 0.4)",
                    responsive: true
                }}
                volume={1}
                zoom={1}
            />
        </div>
    );
}