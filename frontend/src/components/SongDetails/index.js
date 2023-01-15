import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { playASong } from "../../store/songs";
import { useIsPlaying } from "../../context/IsPlayingContext";
import { useAudioElement } from "../../context/AudioElementContext";
import { useIsPaused } from "../../context/IsPausedContext";
import GetAllComments from "../GetAllComments";
import CreateNewComment from "../CreateAComment";
import ArtistInfo from "../ArtistInfo";
import LikeSong from "../LikeSong";
import { Wave } from "@foobar404/wave";
import ReactWaves from "@dschoon/react-waves";
import "./SongDetails.css";

const SongDetails = () => {
  const dispatch = useDispatch();
  // context for the audio player
  const { isPaused, setIsPaused } = useIsPaused();
  const { isPlaying, setIsPlaying } = useIsPlaying();
  // state for controlling whether or not to render the "pause" button
  const [pauseButton, setPauseButton] = useState(false);
  const curSong = useSelector((state) => state.songs.currentSong);
  const [currentSong, setCurrentSong] = useState(curSong);
  const [firstPlay, setFirstPlay] = useState(true);
  // get and set two random colors for gradient
  const [color1, setColor1] = useState(1);
  const [color2, setColor2] = useState(1);
  let { songId } = useParams();
  const songs = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);
  // identify song from url
  songId = parseInt(songId);
  const songFromUrl = Object.values(songs).find((song) => song.id === songId);
  const { audioElement } = useAudioElement();

  useEffect(() => {
    // dispatch(getOneSong(songId));
    // put these in a useEffect so a new gradient doesn't render every time a
    // user posts a comment or presses play/pause
    setColor1(one);
    setColor2(two);
  }, [dispatch, songId]);

  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [vol, setVol] = useState(0);
  const wavesurfer = useRef();

  useLayoutEffect(() => {
    if (audioElement && currentSong.url === songFromUrl.url) {
      if (isPlaying === true) setPlaying(true);
      else setPlaying(false);
    }
  }, [isPlaying, currentSong]);

  useLayoutEffect(() => {
    if (isPlaying) {
      if (audioElement && currentSong.url === songFromUrl.url) {
        setPosition(parseFloat(audioElement.audio.current.currentTime));
        setPlaying(true);
      }
    }
  }, []);

  useLayoutEffect(() => {
    if (!isPlaying) {
      if (audioElement && currentSong === songFromUrl) {
        setPlaying(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      if (audioElement && currentSong.url === songFromUrl.url) {
        setPlaying(false);
      }
    }
  }, [isPlaying]);

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
                      className="fa-solid fa-play fa-5x"
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
                      className="fa-solid fa-pause fa-5x"
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
                      className="fa-solid fa-play fa-5x"
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
                      className="fa-solid fa-play fa-5x"
                    ></i>
                  </div>
                )}
              </div>
              <div className="artist-details">
                <h2>{songFromUrl.title}</h2>
                {songFromUrl.Artist && (
                  <span>{songFromUrl?.Artist?.username}</span>
                )}

                {!songFromUrl.Artist && <span>{user?.username}</span>}
              </div>
            </div>
            <div className="audio-visualizer">
              <ReactWaves
                ref={wavesurfer}
                audioFile={songFromUrl.url}
                options={{
                  barWidth: 3,
                  barRadius: 2,
                  barHeight: 2,
                  height: 200,
                  hideScrollbar: true,
                  cursorWidth: 0,
                  progressColor: "#023047",
                  waveColor: "rgb(255, 255, 255)",
                  responsive: true,
                }}
                playing={playing}
                pos={position}
                volume={0}
                zoom={1}
              />
            </div>
          </div>
          <div key="image" className="individual-song-image-url">
            <img
              style={{ borderRadius: "2px" }}
              alt={songFromUrl.id}
              src={songFromUrl.imageUrl}
            />
          </div>
        </div>
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
            <LikeSong />
          </div>
          <div className="comment-row">
            <ArtistInfo />
            <GetAllComments />
          </div>
        </div>
      </div>
    </>
  );
};

export default SongDetails;
