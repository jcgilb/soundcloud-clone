// import { Wave } from "@foobar404/wave";
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { useAudioElement } from '../../context/AudioElementContext';
// import React, { useRef } from 'react'

// const AudioVisualizer = () => {
//     const currentSong = useSelector(state => state.songs.currentSong);
//     const [frequencyData, setFrequencyData] = useState([]);
//     let canvas = useRef();
//     console.log("this is my canvas ref", canvas)

//     const { audioElement } = useAudioElement();
//     console.log("this is my audioElement", audioElement)
//     if (!audioElement) return null;
//     if (currentSong !== null) {
//         let myAudio = new Audio(audioElement.props.src);
//         // prevent cors access restriction
//         myAudio.crossOrigin = "anonymous";
//         console.log("this is my audio element", myAudio);
//         console.log("this is my canvas element", canvas.current);
//         if (canvas.current) {
//             let wave = new Wave(myAudio, canvas.current);

//             // // Simple example: add an animation
//             // wave.addAnimation(new wave.animations.Wave());
//             wave.addAnimation(new wave.animations.Square({
//                 count: 50,
//                 diamater: 300
//             }));

//             wave.addAnimation(new wave.animations.Glob({
//                 fillColor: { gradient: ["red", "blue", "green"], rotate: 45 },
//                 lineWidth: 10,
//                 lineColor: "#fff"
//             }));
//         }


//     }

//     return (
//         <div style={{ height: "300px", width: "600px" }}>
//             <canvas ref={canvas} height="200" width="500"></canvas>
//         </div>
//     );
// };

// export default AudioVisualizer;


// // import { useSelector } from 'react-redux';
// // import { useEffect, useState } from 'react';
// // import { useAudioElement } from '../../context/AudioElementContext';
// // import React, { useRef } from 'react'

// // const AudioVisualizer = () => {
// //     const currentSong = useSelector(state => state.songs.currentSong);
// //     const [frequencyData, setFrequencyData] = useState([]);
// //     let canvas = useRef();
// //     console.log("this is my canvas ref", canvas)

// //     const { audioElement } = useAudioElement();
// //     //console.log("this is my audio element", audioElement)
// //     if (!audioElement) return null;
// //     if (currentSong !== null) {
// //         let myAudio = new Audio(audioElement.props.src);

// //         // prevent cors access restriction
// //         myAudio.crossOrigin = "anonymous";
// //         console.log("this is my audio element", myAudio);
// //         myAudio.load();

// //         // create an audio context node
// //         let audioContextNode = new (window.AudioContext || window.webkitAudioContext)();

// //         // make an analyser node
// //         let analyserNode = audioContextNode.createAnalyser();
// //         analyserNode.minDecibels = -10000000000
// //         console.log("this is my analyser node", analyserNode);

// //         // make a source node
// //         let sourceNode = audioContextNode.createMediaElementSource(myAudio);
// //         console.log("this is my source node", sourceNode);

// //         // connect the source node to the analyser node
// //         sourceNode.connect(analyserNode);
// //         analyserNode.connect(audioContextNode.destination);
// //         // sourceNode.connect(audioContextNode.destination);
// //         console.log("this is my source node after connecting to analyserNode", sourceNode);

// //         // number of data points collected will be half the fftSize
// //         analyserNode.fftSize = 256; //if size isn't specified, default is 2048
// //         const numDataPoints = analyserNode.frequencyBinCount;
// //         console.log("num data points", numDataPoints);

// //         // create arrays to copy audio data into
// //         let uIntDataArray = new Uint8Array(numDataPoints);
// //         console.log("data array", uIntDataArray)
// //         // const floatArray = new Float32Array(numDataPoints);

// //         if (canvas.current) {
// //             // get the canvas element
// //             let canvasCtx = canvas.current.getContext("2d");
// //             console.log("this is my canvas element", canvasCtx);

// //             // capture audio data
// //             // analyserNode.getFloatFrequencyData(floatArray); // produces 32-bit floats
// //             // analyserNode.getFloatTimeDomainData(floatArray); // produces 32-bit floats 
// //             // analyserNode.getByteFrequencyData(uIntDataArray);
// //             analyserNode.getByteTimeDomainData(uIntDataArray);
// //             console.log("AFTER mutating data array", uIntDataArray);

// //             // clear the canvas
// //             canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);

// //             // setTimeout(() => {
// //             //     analyserNode.getByteFrequencyData(uIntDataArray);
// //             //     console.log(uIntDataArray);
// //             // }, 5000);

// //             const draw = () => {
// //                 // use some recursion to draw the frames
// //                 requestAnimationFrame(draw);
// //                 analyserNode.getByteFrequencyData(uIntDataArray);
// //                 // analyserNode.getFloatFrequencyData(floatArray); // produces 32-bit floats
// //                 // analyserNode.getFloatTimeDomainData(floatArray); // produces 32-bit floats 

// //                 canvasCtx.fillStyle = "rgb(200, 200, 200)";
// //                 canvasCtx.fillRect(0, 0, 500, 200);

// //                 // set bar width and height
// //                 // multiply by 2.5 because most frequencies have no audio
// //                 const barWidth = (500 / numDataPoints) * 2.5;
// //                 let barHeight;
// //                 let x = 0;

// //                 // loop through the array
// //                 for (let i = 0; i < numDataPoints; i++) {
// //                     barHeight = uIntDataArray[i] / 2;
// //                     // barHeight = floatArray[i] / 2;
// //                     canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
// //                     canvasCtx.fillRect(x, 200 - barHeight / 2, barWidth, barHeight);
// //                     x += barWidth + 1;
// //                 };
// //             };

// //             // call the draw function
// //             draw();
// //         };

// //     };


// //     return (
// //         <div style={{ height: "300px", width: "600px" }}>
// //             <canvas ref={canvas} height="200" width="500"></canvas>
// //         </div>
// //     );
// // };

// // export default AudioVisualizer;