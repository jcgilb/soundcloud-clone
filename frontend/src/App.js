import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/GetAllSongs";
import CreateNewSong from "./components/CreateNewSong";
import EditSong from "./components/UpdateSong"
import * as sessionActions from "./store/session";
import { getSongs } from "./store/songs.js"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/home'>
            <GetAllSongs />
            <CreateNewSong />
          </Route>
          <Route path='/songs/:songId'>
            <EditSong />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
