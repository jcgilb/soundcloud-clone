import { csrfFetch } from "./csrf";
const GET = "artist/GET";
const REMOVE = "artist/REMOVE";

const get = (artist) => {
  return {
    type: GET,
    artist,
  };
};

const clear = () => {
  return {
    type: REMOVE,
  };
};

// get current artist thunk
export const getArtist = (artistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/artists/${artistId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(get(data));
  }
  return response;
};

// get current artist thunk
export const clearArtist = () => async (dispatch) => {
  dispatch(clear());
};

const initialState = { artist: null };

const artistsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET:
      return {
        ...state,
        artist: { ...action.artist },
      };
    case REMOVE:
      newState = Object.assign({}, state);
      newState.artist = null;
      return newState;
    default:
      return state;
  }
};
export default artistsReducer;
