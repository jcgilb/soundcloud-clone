import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import CurrentSongProvider from './context/CurrentSongContext'
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
// import * as songActions from './store/songs';
import { deleteSong, getOneSong, getSongs } from './store/songs';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.deleteSong = deleteSong;
  window.getOneSong = getOneSong;
  window.getSongs = getSongs;
  // window.songActions = songActions // do I need this here?
};

function Root() {
  return (
    <ReduxProvider store={store}>
      <CurrentSongProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CurrentSongProvider>
    </ReduxProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
