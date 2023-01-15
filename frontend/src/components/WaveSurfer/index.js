import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useIsPlaying } from "../../context/IsPlayingContext";
import { useAudioElement } from "../../context/AudioElementContext";
import { useIsPaused } from "../../context/IsPausedContext";
import React, { useState, useEffect } from "react";
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

  if (!songFromUrl) return null;

  return (
    <>
      <ReactWaves
        ref={wavesurfer}
        audioFile={songFromUrl.url}
        playing={playing}
        options={{
          height: 200,
          fillParent: true,
          barWidth: 3,
          barRadius: 2,
          barHeight: 2,
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
    </>
  );
}
