import { csrfFetch } from './csrf';
const LOAD = 'songs/LOAD';

const load = (songs) => {
    return {
        type: LOAD,
        songs,
    };
};

// get all songs thunk action
export const getSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs');
    if (response.ok) {
        const data = await response.json();
        console.log("this is my data in my getSongs thunk", data)
        dispatch(load(data))
    }
    return response
};

const initialState = {}

const songsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            // newState = Object.assign({}, state, { songs: action.songs });
            // return newState;
            const allSongs = {}
            action.songs.songs.forEach(song => {
                allSongs[song.id] = song;
            });
            return {
                ...allSongs,
                ...state,
            };
        default:
            return state;
    }
};

export default songsReducer;