import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { updateSong, getSongs } from "../../store/songs.js"
import { restoreUser } from '../../store/session.js';

const EditSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [albumId, setAlbumId] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);

    useEffect(() => {
        console.log("getting all songs in my EditSong component")
        dispatch(getSongs())
        dispatch(restoreUser)
    }, [dispatch]);

    const userId = useSelector(state => state.session.user.id)
    const songs = useSelector(state => state.songs);
    const mySong = Object.values(songs).find((song) => song.id === songId)

    console.log("user id is:", userId)
    console.log("songsObj ", songs)
    console.log('this is my song to edit: ', mySong);

    const handleSubmit = (e) => {
        e.preventDefault();
        let songBody = {
            title,
            description,
            url,
            albumId,
        }
        if (userId === mySong.userId) {
            dispatch(updateSong(songBody, songId));
            history.push(`/songs/${songId}`);
        }
    };

    // if (!Object.values(songs).length) return null;

    return (
        <>
            <form className="edit-song-form" onSubmit={handleSubmit}>
                <input
                    type="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                {/* <ErrorMessage label={"Title"} message={errorMessages.title} /> */}
                <input
                    type="description"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                {/* <ErrorMessage label={"Description"} message={errorMessages.description} /> */}
                <input
                    type="url"
                    placeholder="Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} />
                {/* <ErrorMessage label={"Url"} message={errorMessages.url} /> */}
                <input
                    type="albumId"
                    placeholder="Album Id"
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)} />
                {/* <ErrorMessage label={"AlbumId"} message={errorMessages.albumId} /> */}
                <button className='edit-song' type='submit'>Edit song details</button>
            </form>
        </>
    );
};

export default EditSong;