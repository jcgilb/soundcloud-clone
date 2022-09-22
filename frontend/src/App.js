import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/GetAllSongs";
import SongDetails from "./components/SongDetails"
import * as sessionActions from "./store/session";


// import { getSongs } from "./store/songs";
// import CreateNewSong from "./components/CreateNewSong";
// import EditSong from "./components/UpdateSong"
// import DeleteSong from "./components/DeleteSong"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const songs = useSelector(state => state.songs)

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
          <Route path='/songs/:songId'>
            <SongDetails />
          </Route>
          <Route exact path='/songs'>
            <GetAllSongs songs={songs} />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
