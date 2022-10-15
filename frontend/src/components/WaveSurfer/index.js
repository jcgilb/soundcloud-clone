import { useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import { useIsPlaying } from "../../context/IsPlayingContext";
import { useAudioElement } from "../../context/AudioElementContext";
import { useIsPaused } from "../../context/IsPausedContext";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { WaveForm, WaveSurfer } from "wavesurfer-react";
import ReactWaves from "@dschoon/react-waves";

export function AudioVisualizer() {
  const dispatch = useDispatch();
  // context for the audio player
  const { isPaused, setIsPaused } = useIsPaused();
  const { isPlaying, setIsPlaying } = useIsPlaying();
  const { audioElement } = useAudioElement();
  // state for controlling whether or not to render the "pause" button
  const [pauseButton, setPauseButton] = useState(false);
  const curSong = useSelector((state) => state.songs.currentSong);
  const [currentSong, setCurrentSong] = useState(curSong);
  let { songId } = useParams();
  const songs = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);
  // identify song from url
  songId = parseInt(songId);
  const songFromUrl = Object.values(songs).find((song) => song.id === songId);
  const [trashState, setTrashState] = useState();

  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [vol, setVol] = useState(0);
  const wavesurfer = useRef();

  const changePosition = () => {
    console.log("changing position", position);
    setPosition(parseFloat(audioElement.audio.current.currentTime));
  };

  const skipAhead = () => {
    if (currentSong.url === songFromUrl.url) {
      console.log("seeking to", position);
      setPosition(parseFloat(audioElement.audio.current.currentTime));
      wavesurfer.seekTo(parseFloat(audioElement.audio.current.currentTime));
      wavesurfer.volume(vol);
    }
  };

  console.log("currentsong", currentSong);
  console.log("songFromUrl", songFromUrl);
  useEffect(() => {
    if (currentSong.url === songFromUrl.url) {
      if (isPlaying === true) setPlaying(true);
      else setPlaying(false);
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (isPlaying) {
      if (audioElement && currentSong.url === songFromUrl.url) {
        setPosition(parseFloat(audioElement.audio.current.currentTime) + 10);
        wavesurfer.volume = 0;
      }
    }
  }, []);

  //   useLayoutEffect(() => {
  //     if (!trashState) {
  //       if (audioElement && currentSong === songFromUrl) {
  //         // console.log("audio is muted")

  //         if (wavesurferRef.current && currentSong.url) {
  //           // wavesurferRef.current.load(currentSong.url);

  //           wavesurferRef.current.on("ready", () => {
  //             console.log("WaveSurfer is ready");
  //           });

  //           wavesurferRef.current.on("loading", (data) => {
  //             console.log("loading --> ", data);
  //           });

  //           if (window) {
  //             window.surferidze = wavesurferRef.current;
  //           }
  //         }
  //         setTrashState(true);
  //       }
  //       if (isPlaying) {
  //         if (audioElement && currentSong.url === songFromUrl.url) {
  //           // console.log("audio is muted")
  //           let newAudio = new Audio(songFromUrl.url);
  //           newAudio.currentTime = parseFloat(
  //             audioElement.audio.current.currentTime
  //           );
  //           setAudioSource(newAudio.src);
  //         }
  //       }
  //       if (audioSource) {
  //         return () => {
  //           // console.log("cleaning up audio")
  //           if (audioSource) {
  //             setAudioSource(null);
  //           }
  //           // audioElement.audio.current.volume = 1;
  //         };
  //       }
  //     }
  //   }, [currentSong, isPlaying, trashState]);

  if (!songFromUrl) return null;

  return (
    <>
      <ReactWaves
        ref={wavesurfer}
        audioFile={songFromUrl.url}
        playing={playing}
        options={{
          barWidth: 3,
          barRadius: 2,
          hideScrollbar: true,
          cursorWidth: 0,
          progressColor: "#4159FB",
          waveColor: "rgba(65, 89, 251, 0.4)",
          responsive: true,
        }}
        onPosChange={changePosition}
        pos={position}
        volume={0}
        zoom={1}
        onSeek={skipAhead}
      />
      {/* <div ref={wavesurferRef}>
        <WaveSurfer onMount={handleWSMount}>
          <WaveForm></WaveForm>
        </WaveSurfer>
      </div>
      <button onClick={play}>Play / Pause</button> */}
    </>
  );
}
