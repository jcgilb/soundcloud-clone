import { csrfFetch } from "./csrf";
const ADD_ONE = "songs/ADD_ONE";
const DELETE = "songs/DELETE";
const TOGGLE_LIKE = "produce/TOGGLE_LIKE";

const addOne = (song) => {
  return {
    type: ADD_ONE,
    song,
  };
};

const remove = (songId) => {
  return {
    type: DELETE,
    songId,
  };
};

export const toggleLike = (songId) => {
  return {
    type: TOGGLE_LIKE,
    songId,
  };
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

// delete a song thunk
export const deleteSong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(remove(songId));
  }
};

const initialState = {};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case DELETE:
      newState = { ...state };
      delete newState[action.songId];
      return newState;
    case TOGGLE_LIKE:
      return {
        ...state,
        [action.produceId]: {
          ...state[action.produceId],
          liked: !state[action.produceId].liked,
        },
      };
    default:
      return state;
  }
};
export default albumsReducer;
