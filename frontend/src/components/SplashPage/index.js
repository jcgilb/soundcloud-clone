import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong, incrementPlays } from "../../store/songs.js";
import { NavLink, useHistory } from "react-router-dom";
import { useIsPaused } from "../../context/IsPausedContext.js";
import "./SplashPage.css";

const SplashPage = ({ songs }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // context for the audio player
  const { setIsPaused } = useIsPaused();
  // state for controlling whether or not to render the "pause" button
  const [pauseButton, setPauseButton] = useState(false);
  // identify the "current song" from songs object
  const curSong = useSelector((state) => state.songs.currentSong);
  const [currentSong, setCurrentSong] = useState(curSong);

  // get songs
  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  // only show the first 10 songs on the splash page
  let myMap = Object.values(songs).slice(0, 10);
  if (!myMap.length) return null;

  return (
    <div className="splash-container">
      <div className="top-splash">
        <img
          className="img-splash"
          alt="main-background"
          src={
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664141664/backgrounds/sc_landing_header_web_b-447230ef_pzqzhn.jpg"
          }
        />
      </div>
      <div className="middle-splash">
        Hear what's trending in the Audio Stratus community
      </div>
      <hr></hr>
      <div className="bottom-splash">
        {myMap.length > 0 &&
          myMap.map((song) => (
            <div className="song-card">
              <div id="inner-song-card">
                <div className="album-cover">
                  <img
                    style={{ borderRadius: "4px" }}
                    alt="album-cover"
                    src={`${song.imageUrl}`}
                  />
                  <div className="play-pause">
                    {/* render a play button on every song */}
                    {song !== currentSong && (
                      <div
                        className="play-button"
                        onClick={async (e) => {
                          e.preventDefault();
                          setCurrentSong(song);
                          await dispatch(playASong(song.id));
                          await dispatch(incrementPlays(song.id));
                          setIsPaused(false);
                          setPauseButton(true);
                        }}
                      >
                        <i className="fa-solid fa-play fa-2x"></i>
                      </div>
                    )}
                    {!pauseButton && (
                      <div
                        className="play-button"
                        onClick={async (e) => {
                          e.preventDefault();
                          setCurrentSong(song);
                          await dispatch(playASong(song.id));
                          setIsPaused(false);
                          setPauseButton(true);
                        }}
                      >
                        <i className="fa-solid fa-play fa-2x"></i>
                      </div>
                    )}
                    {/* show the paused button after a user presses play */}
                    {currentSong === song && pauseButton && (
                      <div
                        className="pause-button"
                        onClick={async (e) => {
                          e.preventDefault();
                          setIsPaused(true);
                          setPauseButton(false);
                        }}
                      >
                        <i className="fa-solid fa-pause fa-2x"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="artist-info">
                  <NavLink
                    style={{
                      color: "black",
                      fontSize: "14.5px",
                      textDecoration: "none",
                    }}
                    to={`/songs/${song.id}`}
                  >
                    {song.title}
                  </NavLink>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/songs/${song.id}`);
                    }}
                    className="artist-name"
                  >
                    {song.Artist?.username}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SplashPage;
