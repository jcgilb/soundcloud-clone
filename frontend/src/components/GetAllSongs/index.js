import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js";
import { NavLink, useHistory } from "react-router-dom";
import { useIsPaused } from "../../context/IsPausedContext.js";
import { useIsPlaying } from "../../context/IsPlayingContext";
import "./GetAllSongs.css";
import "../SplashPage/SplashPage.css";

const GetAllSongs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // context for the audio player
  const { setIsPaused } = useIsPaused();
  const { isPlaying, setIsPlaying } = useIsPlaying();
  // state for controlling whether or not to render the "pause" button
  const [pauseButton, setPauseButton] = useState(false);
  // get the current song in order to set the current song
  const curSong = useSelector((state) => state.songs.currentSong);
  const [currentSong, setCurrentSong] = useState(curSong);

  const songsObj = useSelector((state) => state.songs);
  // slice off the "current song" because there's no need to map it
  let myMap = Object.values(songsObj).slice(
    0,
    Object.values(songsObj).length - 1
  );

  // get songs
  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  return (
    <div className="main-container-div">
      <div className="main-top-div"></div>
      <div className="main-middle-div">
        <div className="title-container">
          <div className="main-title">All songs</div>
          <div className="tiles">
            {myMap.map((song) => (
              <div className="song-tile">
                <div key="image" className="image-url">
                  <div className="album-art">
                    <img
                      style={{ borderRadius: "2px", textDecoration: "none" }}
                      className="tile"
                      alt={song.id}
                      src={song.imageUrl}
                    />
                    <div className="play-pause">
                      {/* show a play button if currentSong === songFromUrl and isPaused*/}
                      {!isPlaying && currentSong.url === song.url && (
                        <div
                          className="press-play"
                          onClick={async () => {
                            if (currentSong !== song) {
                              if (currentSong.url) setIsPlaying(false);
                              setCurrentSong(song);
                            }
                            await dispatch(playASong(song.id));
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
                      {/* show a pause button if currentSong === song and isPlaying*/}
                      {isPlaying && currentSong.url === song.url && (
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
                      {/* show a play button if currentSong !== song and !isPlaying*/}
                      {currentSong.url !== song.url && !isPlaying && (
                        <div
                          className="press-play"
                          onClick={async () => {
                            setCurrentSong(song);
                            await dispatch(playASong(song.id));
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
                      {/* show a play button if currentSong !== song and isPlaying*/}
                      {currentSong.url !== song.url && isPlaying && (
                        <div
                          className="press-play"
                          onClick={async (e) => {
                            if (currentSong !== song) {
                              if (currentSong.url) setIsPlaying(false);
                              setCurrentSong(song);
                            }
                            setCurrentSong(song);
                            await dispatch(playASong(song.id));
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
                      {/* render a play button on every song
                      {song !== currentSong && (
                        <div
                          className="play-button"
                          onClick={async () => {
                            setCurrentSong(song);
                            setIsPaused(false);
                            dispatch(playASong(song.id));
                          }}
                        >
                          <i className="fa-solid fa-play fa-2x"></i>
                        </div>
                      )}
                      {/**show a play button after a user presses pause */}
                      {/* {!isPlaying && currentSong === song && (
                        <div
                          className="play-button"
                          onClick={async () => {
                            setCurrentSong(song);
                            setIsPaused(false);
                            dispatch(playASong(song.id));
                          }}
                        >
                          <i className="fa-solid fa-play fa-2x"></i>
                        </div>
                      )}
                      show the paused button after a user presses play */}
                      {/* {currentSong === song && isPlaying && (
                        <div
                          className="pause-button"
                          onClick={async () => {
                            setIsPaused(true);
                          }}
                        >
                          <i className="fa-solid fa-pause fa-2x"></i>
                        </div>
                      )}  */}
                    </div>
                  </div>
                  <div className="title-nav">
                    <NavLink
                      style={{
                        color: "black",
                        fontSize: "14.5px",
                        textDecoration: "none",
                      }}
                      key={song.id}
                      to={`/songs/${song.id}`}
                    >
                      {song.title}
                    </NavLink>
                    <p id="artist-name">{song.Artist?.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetAllSongs;
