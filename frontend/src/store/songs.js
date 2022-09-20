import { csrfFetch } from './csrf';
const GET = 'songs/GET';
const CREATE = 'songs/CREATE';
const UPDATE = 'songs/UPDATE';
const DELETE = 'songs/DELETE';

const get = (songs) => {
    return {
        type: GET,
        songs,
    };
};

const create = (song) => {
    return {
        type: CREATE,
        song,
    };
};

const update = (song) => {
    return {
        type: UPDATE,
        song,
    };
};

const remove = (songId) => {
    return {
        type: DELETE,
        songId,
    };
};
// get all songs thunk action
export const getSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs');
    if (response.ok) {
        const data = await response.json();
        console.log("this is my data in my getSongs thunk", data)
        dispatch(get(data));
    }
    return response
};

// create a song thunk action
export const createSong = (songBody) => async (dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songBody)
    });

    const song = await response.json();
    dispatch(create(song));
    return song;
};

// update a song thunk action
export const updateSong = (song, songId) => async dispatch => {
    console.log("songBody in thunk ", song)
    console.log("is this a valid songId? ", songId)
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    });

    if (response.ok) {
        const songData = await response.json();
        dispatch(update(songData));
        return songData;

    }
};

// delete a song thunk action
export const deleteItem = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const song = await response.json();
        dispatch(remove(song.id));
        return console.log("successfully deleted");
    }
};

const initialState = {}

const songsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET:
            const allSongs = {}
            action.songs.songs.forEach(song => {
                allSongs[song.id] = song;
            });
            return {
                ...allSongs,
                ...state,
            };
        case CREATE:
            if (!state[action.song.id]) {
                const newState = {
                    ...state,
                    [action.song.id]: action.song
                };
                return newState;
            }
            return {
                ...state,
                [action.song.id]: {
                    ...state[action.song.id],
                    ...action.song
                }
            };
        // newState = { ...state }
        // newState[action.song.id] = action.song
        // return newState;
        case UPDATE:
            if (!state[action.song.id]) {
                const newState = {
                    ...state,
                    [action.song.id]: action.song
                };
                return newState;
            }
            return {
                ...state,
                [action.song.id]: {
                    ...state[action.song.id],
                    ...action.song
                }
            };
        // return {
        //     ...state,
        //     [action.song.id]: {
        //         ...state[action.song.id],
        //         ...action.song
        //     }
        // };
        case DELETE:
            newState = { ...state };
            delete newState[action.songId];
            return newState;
        default:
            return state;
    }
};

export default songsReducer;