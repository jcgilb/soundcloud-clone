import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/GetAllSongs";
import SongDetails from "./components/SongDetails";
import Player from "./components/AudioPlayer";
import CreateNewSong from "./components/CreateNewSong";
import UpdateSong from "./components/UpdateSong";
import SplashPage from "./components/SplashPage";
import SearchResults from "./components/Search";
import { getSongs } from "./store/songs";
import * as sessionActions from "./store/session";
import { getArtist } from "./store/artists";
import { useSearchResults } from "./context/SearchResultsContext";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const songs = useSelector((state) => state.songs);
  const currentSong = Object.values(songs.currentSong);
  const user = useSelector((state) => state.session.user);

  const { searchResults, setSearchResults } = useSearchResults();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="overall-container">
        <div className="inner-container">
          {isLoaded && (
            <Switch>
              <Route exact path="/">
                <SplashPage songs={songs} />
              </Route>
              <Route path="/new">
                <CreateNewSong />
              </Route>
              <Route exact path="/songs/:songId/edit">
                <UpdateSong />
              </Route>
              <Route exact path="/songs/:songId">
                <SongDetails />
              </Route>
              <Route exact path="/songs">
                <GetAllSongs songs={songs} />
              </Route>
              <Route exact path="/songs/results">
                <SearchResults
                  isLoaded={isLoaded}
                  searchResults={searchResults}
                />
              </Route>
            </Switch>
          )}
        </div>
        {!!currentSong.length && (
          <footer>
            <Player songs={songs} isLoaded={isLoaded} />
          </footer>
        )}
      </div>
    </>
  );
}

export default App;
