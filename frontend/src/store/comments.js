import { csrfFetch } from "./csrf";
const GET = "comments/GET";
const ADD_ONE = "comments/ADD_ONE";
const DELETE = "comments/DELETE";

const get = (comments) => {
  return {
    type: GET,
    comments,
  };
};

const addOne = (comment) => {
  return {
    type: ADD_ONE,
    comment,
  };
};

const remove = (commentId) => {
  return {
    type: DELETE,
    commentId,
  };
};

// get all comments based on songId thunk
export const getComments = (d) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`);
  if (response.ok) {
    const data = await response.json();
    // console.log("this is my data in my getComments thunk", data)
    dispatch(get(data));
  }
  return response;
};

// get one comment thunk
export const getOneComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`);
  if (response.ok) {
    const data = await response.json();
    // console.log("this is my data in my getOneComment thunk", data)
    dispatch(addOne(data));
  }
  return response;
};

// create a comment thunk
export const createComment = (payload, songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(addOne(comment));
    return comment;
  }
};

// update a comment thunk
export const updateComment = (commentBody, commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentBody),
  });
  if (response.ok) {
    const commentData = await response.json();
    dispatch(addOne(commentData));
    return commentData;
  }
};

// delete a comment thunk
export const deleteComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(remove(commentId));
  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET:
      const allComments = {};
      action.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return {
        ...allComments,
        ...state,
      };
    case ADD_ONE:
      if (!state[action.comment.id]) {
        newState = { ...state };
        newState[action.comment.id] = action.comment;
        return newState;
      }
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          ...action.comment,
        },
      };
    case DELETE:
      newState = { ...state };
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};
export default commentsReducer;
