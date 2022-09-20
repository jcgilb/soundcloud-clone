import { csrfFetch } from './csrf';
const GET = 'songs/GET';
const ADD_ONE = 'songs/ADD_ONE';
const UPDATE = 'songs/UPDATE';
const DELETE = 'songs/DELETE';

const get = (songs) => {
    return {
        type: GET,
        songs,
    };
};

const addOne = (song) => {
    return {
        type: ADD_ONE,
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
// get all songs thunk 
export const getSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs');
    if (response.ok) {
        const data = await response.json();
        console.log("this is my data in my getSongs thunk", data)
        dispatch(get(data));
    }
    return response
};

// get one song thunk 
export const getOneSong = (id) => async dispatch => {
    const response = await csrfFetch('/api/songs/id');
    if (response.ok) {
        const data = await response.json();
        console.log("this is my data in my getOneSong thunk", data)
        dispatch(get(data));
    }
    // return response
};

// create a song thunk 
export const createSong = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const song = await response.json();
        dispatch(addOne(song));
        return song;
    }
};

// update a song thunk 
export const updateSong = song => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
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

// delete a song thunk 
export const deleteItem = (songId) => async dispatch => {
    const response = await fetch(`/api/items/${songId}`, {
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
        case ADD_ONE:
            if (!state[action.song.id]) {
                newState = { ...state }
                newState[action.song.id] = action.song
                return newState;
            } return {
                ...state,
                [action.song.id]: {
                    ...state[action.song.id],
                    ...action.song
                }
            };
        case UPDATE:
            return {
                ...state,
                [action.song.id]: {
                    ...state[action.song.id],
                    ...action.song
                }
            };
        case DELETE:
            newState = { ...state };
            delete newState[action.songId];
            return newState;

        default:
            return state;
    }
};
export default songsReducer;

// import { csrfFetch } from './csrf';
// const GET = 'songs/GET';
// const ADD_SONG = 'songs/ADD_SONG';
// // const UPDATE = 'songs/UPDATE';
// const DELETE = 'songs/DELETE';

// const loadSongs = (songs) => {
//     return {
//         type: GET,
//         songs,
//     };
// };

// const addOne = (song) => {
//     return {
//         type: ADD_SONG,
//         song
//     }
// }

// // const update = (song) => {
// //     return {
// //         type: UPDATE,
// //         song,
// //     };
// // };

// const remove = (songId) => {
//     return {
//         type: DELETE,
//         songId,
//     };
// };
// // get all songs thunk action
// export const getSongs = () => async dispatch => {
//     const response = await csrfFetch('/api/songs');
//     // if (response.ok) {
//     const data = await response.json();
//     console.log("this is my data in my getSongs thunk", data);
//     dispatch(loadSongs(data));
//     // }
//     // return response;
// };

// // create a song thunk action
// export const createSong = (payload) => async (dispatch) => {

//     const response = await csrfFetch('/api/songs', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     // if (response.ok) {
//     console.log("dispatching in my createSong thunk")
//     const song = await response.json();
//     dispatch(addOne(song));
//     return song;
//     // }
// };



// // update a song thunk action
// export const updateSong = (song, songId) => async dispatch => {
//     console.log("song body in thunk ", song)
//     console.log("is this a valid songId? ", songId)
//     const response = await csrfFetch(`/api/songs/${songId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(song)
//     });

//     if (response.ok) {
//         const songData = await response.json();
//         dispatch(addOne(songData));
//         return songData;
//     }
// };

// // delete a song thunk action
// export const deleteItem = (songId) => async dispatch => {
//     const response = await csrfFetch(`/api/songs/${songId}`, {
//         method: 'DELETE',
//     });

//     if (response.ok) {
//         const song = await response.json();
//         dispatch(remove(song.id));
//         return console.log("successfully deleted");
//     }
// };

// const initialState = {}

// const songsReducer = (state = initialState, action) => {
//     let newState;
//     switch (action.type) {
//         case GET:
//             const allSongs = {}
//             action.songs.songs.forEach(song => {
//                 allSongs[song.id] = song;
//             });
//             return {
//                 ...allSongs,
//                 ...state,
//             };
//         case ADD_SONG:
//             if (!state[action.song.id]) {
//                 const newState = {
//                     ...state,
//                     [action.song.id]: action.song
//                 };
//                 return newState;
//             }
//             return {
//                 ...state,
//                 [action.song.id]: {
//                     ...state[action.song.id],
//                     ...action.song
//                 }
//             };
//         // newState = { ...state }
//         // newState[action.song.id] = action.song
//         // return newState;
//         // case UPDATE:
//         //     if (!state[action.song.id]) {
//         //         const newState = {
//         //             ...state,
//         //             [action.song.id]: action.song
//         //         };
//         //         return newState;
//         //     }
//         //     return {
//         //         ...state,
//         //         [action.song.id]: {
//         //             ...state[action.song.id],
//         //             ...action.song
//         //         }
//         //     };
//         // return {
//         //     ...state,
//         //     [action.song.id]: {
//         //         ...state[action.song.id],
//         //         ...action.song
//         //     }
//         // };
//         case DELETE:
//             newState = { ...state };
//             delete newState[action.songId];
//             return newState;
//         default:
//             return state;
//     }
// };

// export default songsReducer;