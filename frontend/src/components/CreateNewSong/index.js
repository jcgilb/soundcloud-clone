import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/albums.js';
import { createSong } from "../../store/songs.js"
import "./CreateNewSong.css"

const CreateNewSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const [albumSelect, setAlbumSelect] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const user = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumsArr = Object.values(albums);
    let userAlbums = albumsArr.filter(album => album.userId === user.id)
    console.log(userAlbums)

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

    const updateAlbum = (e) => setAlbumSelect(e.target.value);

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId();
    };

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
            <div className="upload-container">

                <div className="upload-song-title">Take your music to the next level.</div>

                <div className="another-container">
                    <div className='columnLeft'></div>
                    <div className="create-song-form-container">
                        <div className="upload-heading">Upload your tracks here</div>

                        <form className="create-song-form" onSubmit={handleSubmit}>
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

                            {/* <input
                    disabled={userAlbums.length > 0 ? false : true}
                    type="albumId"
                    placeholder="Album Id"
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)} /> */}
                            <ul className="errors">
                                {validationErrors.length > 0 &&
                                    validationErrors.map((err) => <div id="err" key={err}>{err}</div>)}
                            </ul>
                            <button className='new-song' type='submit' disabled={!!validationErrors.length}>Upload song</button>
                            {/* <div> */}
                            {/* <button onClick={() => revert()}> Cancel </button> */}
                            {/* </div> */}
                        </form>
                    </div>
                    <div className='columnLeft'></div>

                </div>



            </div>
            <div className="upload-footer"></div>
        </>



    );
};

export default CreateNewSong;