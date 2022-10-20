import { csrfFetch } from "./csrf";
const GET = "songs/GET";
const ADD_ONE = "songs/ADD_ONE";
const PLAY_SONG = "song/PLAY_SONG";
const DELETE = "songs/DELETE";
const POPULAR = "songs/POPULAR";

const get = (songs) => {
  return {
    type: GET,
    songs,
  };
};
const getPopular = (songs) => {
  return {
    type: POPULAR,
    songs,
  };
};

const addOne = (song) => {
  return {
    type: ADD_ONE,
    song,
  };
};

const playSong = (song) => {
  return {
    type: PLAY_SONG,
    song,
  };
};

const remove = (songId) => {
  return {
    type: DELETE,
    songId,
  };
};

// get all songs thunk
export const getSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs");
  if (response.ok) {
    const data = await response.json();
    // console.log("this is my data in my getSongs thunk", data)
    dispatch(get(data));
  }
  return response;
};

// get all songs thunk
export const getPopularSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs/splash");
  if (response.ok) {
    const data = await response.json();
    // console.log("this is my data in my getSongs thunk", data)
    dispatch(getPopular(data));
  }
  return response;
};

// get one song thunk
export const getOneSong = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`);
  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song;
  }
};

// play one song thunk
export const playASong = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`);
  if (response.ok) {
    const song = await response.json();
    dispatch(playSong(song));
    return song;
  }
};

// create a song thunk
export const createSong = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song;
  }
};

// increment plays thunk
export const incrementPlays = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/plays`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const songData = await response.json();
    dispatch(addOne(songData));
    return songData;
  }
};

// update a song thunk
export const updateSong = (songBody, songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songBody),
  });
  if (response.ok) {
    const songData = await response.json();
    dispatch(addOne(songData));
    return songData;
  }
};

// delete a song thunk
export const deleteSong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(remove(songId));
  }
};

const initialState = { popularSongs: {}, currentSong: {} };

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET:
      const allSongs = {};
      action.songs.songs.forEach((song) => {
        allSongs[song.id] = song;
      });
      return {
        ...allSongs,
        ...state,
      };
    case ADD_ONE:
      if (!state[action.song.id]) {
        newState = { ...state };
        newState[action.song.id] = action.song;
        return newState;
      }
      return {
        ...state,
        [action.song.id]: {
          ...state[action.song.id],
          ...action.song,
        },
      };
    case PLAY_SONG:
      return {
        ...state,
        currentSong: { ...action.song },
      };
    case POPULAR:
      newState = { ...state };
      // action.songs.forEach((song) => {
      //   newState.popularSongs[song.id] = song;
      // });
      newState.popularSongs = action.songs;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.songId];
      return newState;
    default:
      return state;
  }
};
export default songsReducer;
