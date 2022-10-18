import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong, incrementPlays } from "../../store/songs.js";
import { NavLink, useHistory } from "react-router-dom";
import { useIsPaused } from "../../context/IsPausedContext.js";
import "./GetAllSongs.css";
import "../SplashPage/SplashPage.css";

const GetAllSongs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // context for the audio player
  const { setIsPaused } = useIsPaused();
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

  useEffect(() => {
    if (currentSong.id) {
      dispatch(incrementPlays(currentSong.id));
    }
  }, [currentSong]);

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
                      style={{ borderRadius: "4px", textDecoration: "none" }}
                      className="tile"
                      alt={song.id}
                      src={song.imageUrl}
                    />
                    <div className="play-pause">
                      {/* render a play button on every song */}
                      {song !== currentSong && (
                        <div
                          className="play-button"
                          onClick={async () => {
                            setCurrentSong(song);
                            await dispatch(playASong(song.id));
                            setIsPaused(false);
                            setPauseButton(true);
                          }}
                        >
                          <i className="fa-solid fa-play fa-2x"></i>
                        </div>
                      )}
                      {/**show a play button after a user presses pause */}
                      {!pauseButton && (
                        <div
                          className="play-button"
                          onClick={async () => {
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
                          onClick={async () => {
                            setIsPaused(true);
                            setPauseButton(false);
                          }}
                        >
                          <i className="fa-solid fa-pause fa-2x"></i>
                        </div>
                      )}
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
