import { csrfFetch } from './csrf';
const GET = 'albums/GET';

const get = (albums) => {
    return {
        type: GET,
        albums,
    };
};

// get all albums thunk 
export const getAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums');
    if (response.ok) {
        const data = await response.json();
        dispatch(get(data));
        return data
    }
};

const initialState = {}

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET:
            const allAlbums = {}
            action.albums.Albums.forEach(album => {
                allAlbums[album.id] = album;
            });
            return {
                ...allAlbums,
                ...state
            };
        default:
            return state;
    }
};
export default albumsReducer;