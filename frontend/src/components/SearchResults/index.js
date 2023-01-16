import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, playASong } from "../../store/songs.js";
import { NavLink, useHistory } from "react-router-dom";
import { useIsPaused } from "../../context/IsPausedContext.js";
import { useIsPlaying } from "../../context/IsPlayingContext";
import { useSearchResults } from "../../context/SearchResultsContext";
import "../GetAllSongs/GetAllSongs.css";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // context for the audio player
  const { setIsPaused } = useIsPaused();
  const { isPlaying, setIsPlaying } = useIsPlaying();

  // search results context
  const { searchResults, setSearchResults } = useSearchResults();
  console.log("search results in search results component", searchResults);

  // state for controlling whether or not to render the "pause" button
  const [pauseButton, setPauseButton] = useState(false);

  // get the current song in order to set the current song
  const curSong = useSelector((state) => state.songs.currentSong);
  const [currentSong, setCurrentSong] = useState(curSong);

  //get the current user for when a song is just published
  const user = useSelector((state) => state.session.user);

  const songsObj = useSelector((state) => state.songs);
  // slice off the "current song" because there's no need to map it
  let myMap = Object.values(songsObj).slice(
    0,
    Object.values(songsObj).length - 2
  );

  return (
    <div className="results-container-div">
      <div className="results-container">
        <div className="results-title">Search results</div>
        <div className="results-grid">
          {searchResults.length > 0 &&
            searchResults.map((song) => (
              <div className="song-card">
                <div id="inner-song-card">
                  <div className="album-cover">
                    <img
                      style={{ borderRadius: "2px" }}
                      alt="album-cover"
                      src={`${song.imageUrl}`}
                    />
                    <div className="play-pause">
                      {/* show a play button if currentSong === songFromUrl and isPaused*/}
                      {!isPlaying && currentSong.id === song.id && (
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
                      {isPlaying && currentSong.id === song.id && (
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
                      {currentSong.id !== song.id && !isPlaying && (
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
                      {currentSong.id !== song.id && isPlaying && (
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
    </div>
  );
};
export default SearchResults;
