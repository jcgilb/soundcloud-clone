import { csrfFetch } from "./csrf";

const GET = "likes/GET";
const GETALL = "likes/GETALL";
const LIKE_SONG = "likes/likeOne";
const DISLIKE_SONG = "likes/dislikeOne";

const get = (songlikes) => {
  return {
    type: GET,
    songlikes,
  };
};
const getAll = (songlikes) => {
  return {
    type: GETALL,
    songlikes,
  };
};

const likeOne = (like) => {
  return {
    type: LIKE_SONG,
    like,
  };
};

const dislikeOne = (likeId) => {
  return {
    type: DISLIKE_SONG,
    likeId,
  };
};

// get all likes thunk
export const getLikes = () => async (dispatch) => {
  const response = await csrfFetch("/api/likes");
  if (response.ok) {
    const data = await response.json();
    dispatch(getAll(data));
  }
  return response;
};

// get all likes based on songId thunk
export const getSongLikes = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/likes`);
  if (response.ok) {
    const data = await response.json();
    dispatch(get(data));
  }
  return response;
};

// like a song thunk
export const likeASong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const like = await response.json();
    dispatch(likeOne(like));
    return like;
  }
};

// dislike a song thunk
export const deleteLike = (likeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/likes/${likeId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(dislikeOne(likeId));
  }
};

const initialState = {};

const likesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET:
      const allSongLikes = {};
      action.songlikes.SongLikes.forEach((like) => {
        allSongLikes[like.id] = like;
      });
      return {
        ...allSongLikes,
        ...state,
      };
    case GETALL:
      const allLikes = {};
      action.songlikes.likes.forEach((like) => {
        allLikes[like.id] = like;
      });
      return {
        ...allLikes,
        ...state,
      };
    case LIKE_SONG:
      if (!state[action.like.id]) {
        newState = { ...state };
        newState[action.like.id] = action.like;
        return newState;
      }
    case DISLIKE_SONG:
      newState = { ...state };
      delete newState[action.likeId];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
