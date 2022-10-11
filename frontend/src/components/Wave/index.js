// import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux"
// import { Wave } from "@foobar404/wave";
// import { useAudioElement } from '../../context/AudioElementContext';
// import { useIsPaused } from '../../context/IsPausedContext';
// import { useIsPlaying } from '../../context/IsPlayingContext';
// import ReactDom from 'react-dom';
// import { unmountComponentAtNode } from 'react-dom';


// const Waves = (songFromUrl) => {
//     const currentSong = useSelector(state => state.songs.currentSong);
//     const [audioSource, setAudioSource] = useState(currentSong.url);
//     const { isPaused, setIsPaused } = useIsPaused();
//     const { isPlaying, setIsPlaying } = useIsPlaying();
//     const thisWave = useRef()
//     const { audioElement } = useAudioElement();
//     const dispatch = useDispatch();
//     // console.log("song from URl", songFromUrl)

//     let wave;
//     let myAudio;
//     useEffect(() => {
//         if (audioElement && currentSong.url) {
//             myAudio = new Audio(audioElement.props.src);
//             myAudio.crossOrigin = "anonymous";
//             myAudio.load();
//             myAudio.autoplay = false;
//             console.log("my audio", myAudio)
//             setAudioSource(currentSong.url);
//             // setAudioSource(myAudio);
//             let canvasElement = document.querySelector("#output");
//             // wave = new Wave(audioElement.audio.current, canvasElement);
//             wave = new Wave(myAudio, canvasElement);
//             wave.clearAnimations()
//             // console.log("my wave object", wave)
//             // console.log("audioElement", audioElement.audio.current);

//             // Simple animation
//             wave.addAnimation(new wave.animations.Wave());

//             const constraints = { audio: true };

//             async function getMedia(constraints) {
//                 let stream = null;
//                 try {
//                     stream = await navigator.mediaDevices.getUserMedia(constraints);
//                 } catch (err) {
//                     console.log(err.message);
//                 }
//             }
//             getMedia(constraints)
//         }
//         return () => {
//             if (wave) {
//                 wave.clearAnimations();
//             }
//             if (myAudio) {
//                 myAudio.src = null;
//                 // myAudio.destroy();
//             }

//         }
//     }, [currentSong]);

//     useEffect(() => {
//         // if a different song is already playing
//         // if there is no current song
//         // if currentSong does not match songFromUrl
//         if (myAudio) {
//             myAudio.play()
//         }


//     }, [isPlaying])

//     // if (myAudio) {
//     //     if (isPlaying === false && currentSong.url === myAudio.src) {
//     //         // if (currentSong) {
//     //         myAudio.playPause()
//     //         // setIsPaused(null); // prevents infinite loop
//     //         // setIsPlaying(true);
//     //         // }
//     //     }
//     //     if (isPlaying && currentSong.url === myAudio.src) {
//     //         // if (currentSong) {
//     //         myAudio.playPause()
//     //         // setIsPaused(null)
//     //         // setIsPlaying(false);
//     //         // }
//     //     }
//     //     if (!currentSong.url) {
//     //         if (isPlaying) {
//     //             myAudio.playPause();
//     //         }
//     //     }
//     // }

//     useLayoutEffect(() => {
//         return () => {
//             if (myAudio) {

//                 myAudio.src = null;
//             }
//         }
//     }, [isPaused])

//     if (!currentSong.url) return null;
//     if (!audioElement) return null

//     return (
//         <>

//             <div ref={thisWave} className="wave">
//                 <canvas id="output" height="70" width="235" />
//             </div>
//         </>
//     );
// }

// export default Waves