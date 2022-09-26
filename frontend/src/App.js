import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/GetAllSongs";
import SongDetails from "./components/SongDetails"
import Player from "./components/AudioPlayer"
import CreateNewSong from "./components/CreateNewSong"
import UpdateSong from "./components/UpdateSong"
import SplashPage from "./components/SplashPage"
import { getSongs } from "./store/songs";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch]);

  const songs = useSelector(state => state.songs)
  const currentSong = Object.values(songs.currentSong)
  const user = useSelector(state => state.session.user)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage songs={songs} />
          </Route>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/new">
            <CreateNewSong />
          </Route>
          <Route exact path="/songs/:songId/edit">
            <UpdateSong />
          </Route>
          <Route exact path='/songs/:songId'>
            <SongDetails />
          </Route>
          <Route exact path='/songs'>
            <GetAllSongs songs={songs} />
          </Route>
        </Switch>
      )}
      {!!currentSong.length &&
        <Player isLoaded={isLoaded} />
      }
    </>
  );
}

export default App;
