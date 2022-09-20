import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/GetAllSongs";
import CreateNewSong from "./components/CreateNewSong";
import EditSong from "./components/UpdateSong"
import * as sessionActions from "./store/session";
// import { getSongs } from "./store/songs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // the site doesn't hold on to song data when navigating to one /songs/:songId, 
  // so adding this here appears to fix that problem...
  // useEffect(() => {
  //   console.log("getting all songs in my EditSong component")
  //   dispatch(getSongs())
  // }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <GetAllSongs />
      <CreateNewSong />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/home'>
          </Route>
          <Route path='/edit'>
            <EditSong />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
