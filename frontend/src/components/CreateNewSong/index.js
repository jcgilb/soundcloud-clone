import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/albums.js';
import { createSong } from "../../store/songs.js"
// import { NavLink, Route, useParams } from 'react-router-dom';

const CreateNewSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [showForm, setShowForm] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const user = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumsArr = Object.values(albums);
    let userAlbums = albumsArr.filter(album => album.userId === user.id)

    // form validations
    useEffect(() => {
        const errors = [];
        setValidationErrors(errors);
        if (!title.length) errors.push("Song title is required.");
        if (!url) errors.push("Audio is required.");
        // if (isNaN(albumId) && albumId) errors.push(`"${albumId}" is not a valid integer.`)
        // if (!userAlbums.length && albumId) errors.push("Authorization required.")
        setValidationErrors(errors);
    }, [title, url, albumId]);

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        const newSong = {
            title,
            description,
            url,
            imageUrl,
            albumId,
        }
        let song = await dispatch(createSong(newSong));
        if (song) {
            setShowForm(false);
            revert();
            if (validationErrors.length === 0) return history.push(`/songs/${song.id}`);
        }
    };

    return (
        <>
            <div>
                <button onClick={() => setShowForm(true)}> Upload </button>
            </div>
            {showForm &&
                <form className="create-song-form" onSubmit={handleSubmit}>
                    <ul className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((err) => <li key={err}>{err}</li>)}
                    </ul>
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
                        type="imageUrl"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} />
                    {/* <ErrorMessage label={"Image URL"} message={errorMessages.imageUrl} /> */}
                    <input
                        type="albumId"
                        placeholder="Album Id"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)} />
                    {/* <ErrorMessage label={"AlbumId"} message={errorMessages.albumId} /> */}
                    <button className='new-song' type='submit' disabled={!!validationErrors.length}>Upload song</button>
                    <div>
                        <button onClick={() => setShowForm(false)}> Cancel </button>
                    </div>
                </form>
            }

        </>
    );
};

export default CreateNewSong;


// const curState = useSelector(state => state.songs);

// const showSongForm = () => {
//     if (showForm) return;
//     setShowForm(true);
// };

// useEffect(() => {
//     if (!showForm) return;
//     const hideSongForm = () => {
//         setShowForm(false);
//     };
//     document.addEventListener('click', hideSongForm);
//     return () => document.removeEventListener("click", hideSongForm);
// }, [showForm]);
