import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ModalProvider } from "./context/Modal";
import IsPlayingProvider from "./context/IsPlayingContext";
import IsPausedProvider from "./context/IsPausedContext";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { deleteSong, getOneSong, getSongs } from "./store/songs";
import { deleteLike, likeASong, getSongLikes, getLikes } from "./store/likes";
import AudioElementProvider from "./context/AudioElementContext";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.deleteSong = deleteSong;
  window.getOneSong = getOneSong;
  window.getSongs = getSongs;
  window.getSongLikes = getSongLikes;
  window.likeASong = likeASong;
  window.deleteLike = deleteLike;
  window.getLikes = getLikes;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <IsPlayingProvider>
            <IsPausedProvider>
              <AudioElementProvider>
                <App />
              </AudioElementProvider>
            </IsPausedProvider>
          </IsPlayingProvider>
        </BrowserRouter>
      </ModalProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
