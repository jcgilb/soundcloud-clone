import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/albums.js';
import { createSong } from "../../store/songs.js"
import "./CreateNewSong.css"

const CreateNewSong = () => {
    // getters and setters for the form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const [albumSelect, setAlbumSelect] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    // get albums
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    // find all albums belonging to the user
    const user = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumsArr = Object.values(albums);
    let userAlbums = albumsArr.filter(album => album.userId === user?.id)

    // form validations
    useEffect(() => {
        const errors = [];
        setValidationErrors(errors);
        if (!title.length) errors.push("Song title is required.");
        if (!url) errors.push("Audio is required.");
        if (isNaN(albumId) && albumId) errors.push(`"${albumId}" is not a valid integer.`)
        if (!userAlbums.length && albumId) errors.push("Authorization required.")
        setValidationErrors(errors);
    }, [title, url, albumId, userAlbums.length]);

    // set the user albums
    const updateAlbum = (e) => setAlbumSelect(e.target.value);

    // helper function for clearing the form
    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId();
    };

    // handle submit onClick event
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSong = {
            title,
            description,
            url,
            imageUrl,
            albumId,
        }
        revert();
        let song = await dispatch(createSong(newSong)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
        });
        if (song) {
            if (validationErrors.length === 0) return history.push(`/songs/${song.id}`);
        }
    };

    return (
        <>
            <br></br>
            <br></br>
            <div className="upload-title">Take your music to the next level.</div>
            <div className="upload-container">
                <br></br>
                <form className="upload-song-form" onSubmit={handleSubmit}>
                    <div className="upload-form-heading">Upload your tracks here</div>
                    <input
                        type="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <input
                        type="description"
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <input
                        type="url"
                        placeholder="Audio URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)} />
                    <input
                        type="imageUrl"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} />
                    <select onChange={updateAlbum} value={albumSelect} placeholder="Select an album">
                        <option value="" disabled selected>Select an album...</option>
                        {userAlbums.map(album =>
                            <option key={album.title}>{album.title}</option>
                        )}
                    </select>
                    <ul className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((err) => <div id="err" key={err}>{err}</div>)}
                    </ul>
                    <button className='upload-submit' type='submit' disabled={!!validationErrors.length}>Upload song</button>
                </form>
            </div>
        </>
    );
};

export default CreateNewSong;