import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOneSong, playASong } from "../../store/songs";
import { useIsPlaying } from "../../context/IsPlayingContext";
import { useAudioElement } from "../../context/AudioElementContext";
import { useIsPaused } from "../../context/IsPausedContext";
import GetAllComments from "../GetAllComments";
import CreateNewComment from "../CreateAComment";
import LikeSong from "../LikeSong";
import { Wave } from "@foobar404/wave";
import ReactWaves from "@dschoon/react-waves";
import "./SongDetails.css";

const SongDetails = () => {
  const dispatch = useDispatch();
  // context for the audio player
  const { isPaused, setIsPaused } = useIsPaused();
  const { isPlaying, setIsPlaying } = useIsPlaying();
  console.log("isPlaying context", isPlaying);
  // state for controlling whether or not to render the "pause" button
  const [pauseButton, setPauseButton] = useState(false);
  const curSong = useSelector((state) => state.songs.currentSong);
  const [currentSong, setCurrentSong] = useState(curSong);
  // get and set two random colors for gradient
  const [color1, setColor1] = useState(1);
  const [color2, setColor2] = useState(1);
  let { songId } = useParams();
  const songs = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);
  // identify song from url
  songId = parseInt(songId);
  const songFromUrl = Object.values(songs).find((song) => song.id === songId);
  const [trashState, setTrashState] = useState();
  const thisWave = useRef();
  const { audioElement } = useAudioElement();

  useEffect(() => {
    // dispatch(getOneSong(songId));
    // put these in a useEffect so a new gradient doesn't render every time a
    // user posts a comment or presses play/pause
    setColor1(one);
    setColor2(two);
  }, [dispatch, songId]);
  //////////////////////////////////////////////

  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [vol, setVol] = useState(0);
  const wavesurfer = useRef();

  const changePosition = () => {
    console.log("changing position", position);
    // audioElement.audio.current.currentTime = position;
    setPosition(parseFloat(audioElement.audio.current.currentTime));
  };

  const skipAhead = () => {
    if (currentSong.url === songFromUrl.url) {
      console.log("seeking to", position);
      // audioElement.audio.current.currentTime = position;
      setPosition(parseFloat(audioElement.audio.current.currentTime));
      wavesurfer.current.volume(vol);
    }
  };

  console.log("currentsong", currentSong);
  console.log("songFromUrl", songFromUrl);

  useEffect(() => {
    if (currentSong === songFromUrl) {
      if (isPlaying === true) setPlaying(true);
      else setPlaying(false);
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (isPlaying) {
      if (audioElement && currentSong.url === songFromUrl.url) {
        setPosition(parseFloat(audioElement.audio.current.currentTime));
        setPlaying(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (currentSong.url === songFromUrl.url) {
        setPlaying(false);
      }
    }
  }, [isPlaying]);
  //////////////////////////////////////////////////

  // random color
  const getColor = () => {
    // all possible hex characters
    const hexChars = "0123456789abcdef";
    let hex = "#";
    // loop through and concatenate 6 random chars onto "#"
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    // return the random color
    return hex;
  };

  // call random color generator twice to get two random colors
  const one = getColor();
  const two = getColor();

  // define inline gradient style
  const randomGradient = {
    background: `linear-gradient(to right, ${color1}, ${color2})`,
  };

  if (!songFromUrl) return null;

  return (
    <>
      <div className="one-song">
        {/* use the random gradient as a background */}
        <div className="song-details" style={randomGradient}>
          <div className="left-wrapper">
            <div key="desc" className="description">
              <div key="play" className="play-current-song">
                {/* show a play button if currentSong === songFromUrl and isPaused*/}
                {!isPlaying && currentSong.url === songFromUrl.url && (
                  <div
                    className="press-play"
                    onClick={async () => {
                      if (currentSong !== songFromUrl) {
                        if (currentSong.url) setIsPlaying(false);
                        setCurrentSong(songFromUrl);
                      }
                      await dispatch(playASong(songFromUrl.id));
                      setIsPaused(false); // for AudioPlayer component
                      setIsPlaying(true);
                      setPauseButton(true);
                    }}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-solid fa-play fa-4x"
                    ></i>
                  </div>
                )}
                {/* show a pause button if currentSong === songFromUrl and isPlaying*/}
                {isPlaying && currentSong.url === songFromUrl.url && (
                  <div
                    className="press-pause"
                    onClick={async () => {
                      setIsPaused(true); // for AudioPlayer component
                      setIsPlaying(false);
                      setPauseButton(false);
                    }}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-solid fa-pause fa-4x"
                    ></i>
                  </div>
                )}
                {/* show a play button if currentSong !== songFromUrl and !isPlaying*/}
                {currentSong.url !== songFromUrl.url && !isPlaying && (
                  <div
                    className="press-play"
                    onClick={async () => {
                      setCurrentSong(songFromUrl);
                      await dispatch(playASong(songFromUrl.id));
                      setIsPaused(false); // for AudioPlayer component
                      setIsPlaying(true);
                      setPauseButton(true);
                    }}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-solid fa-play fa-4x"
                    ></i>
                  </div>
                )}
                {/* show a play button if currentSong !== songFromUrl and isPlaying*/}
                {currentSong.url !== songFromUrl.url && isPlaying && (
                  <div
                    className="press-play"
                    onClick={async (e) => {
                      if (currentSong !== songFromUrl) {
                        if (currentSong.url) setIsPlaying(false);
                        setCurrentSong(songFromUrl);
                      }
                      setCurrentSong(songFromUrl);
                      await dispatch(playASong(songFromUrl.id));
                      setIsPaused(false); // for AudioPlayer component
                      setIsPlaying(true);
                      setPauseButton(true);
                    }}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-solid fa-play fa-4x"
                    ></i>
                  </div>
                )}
              </div>
              <div className="artist-details">
                <h2>{songFromUrl.title}</h2>
                <span>{songFromUrl?.Artist?.username}</span>
              </div>
            </div>
            <div className="audio-visualizer">
              {/* <div ref={thisWave} className="wave">
                <canvas id="output" />
              </div> */}
              <ReactWaves
                ref={wavesurfer}
                audioFile={songFromUrl.url}
                playing={playing}
                pos={position}
                volume={0}
                zoom={1}
                options={{
                  barWidth: 3,
                  barRadius: 2,
                  hideScrollbar: true,
                  cursorWidth: 0,
                  progressColor: "#4159FB",
                  waveColor: "rgba(65, 89, 251, 0.4)",
                  responsive: true,
                }}
                // onPosChange={changePosition}
                // onSeek={skipAhead}
              />
            </div>
          </div>
          <div key="image" className="individual-song-image-url">
            <img
              style={{ borderRadius: "4px" }}
              alt={songFromUrl.id}
              src={songFromUrl.imageUrl}
            />
          </div>
        </div>
        <LikeSong song={songFromUrl}></LikeSong>
        <div className="edit-song-details">
          {user?.id === songFromUrl.userId && (
            // get rid of NavLink default styling
            <NavLink
              style={{ color: "black" }}
              to={`/songs/${songFromUrl.id}/edit`}
            >
              Edit song details
            </NavLink>
          )}
        </div>
        <div className="comments-container">
          <div className="leave-comment">
            <CreateNewComment />
          </div>
          <GetAllComments />
        </div>
      </div>
    </>
  );
};

export default SongDetails;

// let wave;
// let myAudio;
// useLayoutEffect(() => {
//   if (!trashState) {
//     if (audioElement && currentSong === songFromUrl) {
//       myAudio = new Audio(songFromUrl.url);
//       if (!myAudio.src) {
//         console.log("second attempt at connecting");
//         myAudio = new Audio(songFromUrl.url);
//       }
//       myAudio.crossOrigin = "anonymous";
//       myAudio.autoplay = "false";
//       myAudio.currentTime = parseFloat(
//         audioElement.audio.current.currentTime
//       );
//       audioElement.audio.current.volume = 0;
//       let canvasElement = document.querySelector("#output");
//       wave = new Wave(myAudio, canvasElement);
//       wave.clearAnimations();
//       wave.addAnimation(new wave.animations.Wave());
//     }
//     setTrashState(true);
//   }
//   if (isPlaying) {
//     if (audioElement && currentSong.url === songFromUrl.url) {
//       myAudio = new Audio(songFromUrl.url);
//       if (!myAudio.src) {
//         console.log("second attempt at connecting");
//         myAudio = new Audio(songFromUrl.url);
//       }
//       myAudio.crossOrigin = "anonymous";
//       myAudio.autoplay = "true";
//       myAudio.currentTime = parseFloat(
//         audioElement.audio.current.currentTime
//       );
//       audioElement.audio.current.volume = 0;
//       let canvasElement = document.querySelector("#output");
//       wave = new Wave(myAudio, canvasElement);
//       wave.clearAnimations();
//       wave.addAnimation(new wave.animations.Wave());
//     }
//   }
//   if (myAudio) {
//     return () => {
//       // console.log("cleaning up audio")
//       if (myAudio) {
//         myAudio.src = null;
//       }
//       audioElement.audio.current.volume = 1;
//     };
//   }
// }, [currentSong, isPlaying, trashState]);
