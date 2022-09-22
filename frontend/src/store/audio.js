import { csrfFetch } from './csrf';
const GET = 'audio/GET';
const ADD_ONE = 'audio/ADD_ONE';
const DELETE = 'audio/DELETE';

const addOne = (audio) => {
    return {
        type: ADD_ONE,
        audio,
    };
};

// get one audio thunk 
export const getSongAudio = (id) => async dispatch => {
    const response = await csrfFetch(`/api/song/${id}`);
    if (response.ok) {
        const data = await response.json();
        console.log("this is my data in my getSongAudio thunk", data)
        dispatch(addOne(data));
    }
    return response
};

const initialState = {}

const audioReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // case GET:
        //     const allaudio = {}
        //     action.audio.audio.forEach(comment => {
        //         allaudio[comment.id] = comment;
        //     });
        //     return {
        //         ...allaudio,
        //         ...state,
        //     };
        case ADD_ONE:
            if (!state[action.comment.id]) {
                newState = { ...state }
                newState[action.comment.id] = action.comment
                return newState;
            } return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            }
    }
};
export default audioReducer;