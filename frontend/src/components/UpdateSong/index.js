import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { updateSong, getSongs } from "../../store/songs.js"
import DeleteSong from "../DeleteSong";
import "./UpdateSong.css"

const UpdateSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);

    const userId = useSelector(state => state.session.user.id)
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs);
    const thisSong = songsArr.find((song) => song.id === songId)

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch]);

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setAlbumId();
    };

    // form validations
    useEffect(() => {
        const errors = [];
        setValidationErrors(errors);
        if (!title.length) errors.push("Song title is required.");
        if (!url) errors.push("Audio is required.");
        // if (isNaN(albumId) && albumId) errors.push(`"${albumId}" is not a valid integer.`)
        setValidationErrors(errors);
    }, [title, url, albumId, thisSong.albumId]);

    const handleSubmit = async (e) => {
        // setShowForm(false);
        e.preventDefault();
        setValidationErrors([]);
        let songBody = {
            title,
            description,
            url,
            albumId,
        }
        if (userId === thisSong.userId) {
            revert();
            let updatedSong = await dispatch(updateSong(songBody, songId));
            history.push(`/songs/${updatedSong.id}`);
        }
    };

    if (!Object.values(songs).length) return null;

    return (
        <div className='edit-container'>
            <br></br>

            <form className="edit-song-form" onSubmit={handleSubmit}>

                <div className="edit-title">Edit song detais below:</div>

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
                    placeholder="Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} />
                <input
                    disabled={thisSong.albumId ? false : true}
                    type="albumId"
                    placeholder="Album Id"
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)} />
                <ul className="errors">
                    {validationErrors.length > 0 &&
                        validationErrors.map((err) => <li id="err" key={err}>{err}</li>)}
                </ul>
                <button className='edit-song-submit' type='submit' disabled={!!validationErrors.length}>Submit</button>
                <div>
                    < DeleteSong />
                </div>
            </form>

        </div>


    );
};

export default UpdateSong;