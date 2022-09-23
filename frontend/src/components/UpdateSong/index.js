import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { updateSong, getSongs } from "../../store/songs.js"
import DeleteSong from "../DeleteSong";

// import { NavLink, Route, useParams } from 'react-router-dom';

const UpdateSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [showForm, setShowForm] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);

    const userId = useSelector(state => state.session.user.id)
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs);
    const thisSong = songsArr.find((song) => song.id === songId)

    useEffect(() => {
        console.log("getting all songs in my UpdateSong component")
        dispatch(getSongs())
    }, [dispatch]);

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setAlbumId();
    };

    console.log("songsObj ", songs)
    console.log("this is my songsArray ", songsArr)
    console.log("user id is:", userId)
    console.log("this is the id in the url: ", songId)
    console.log('this is my song to edit: ', thisSong);

    // form validations
    useEffect(() => {
        const errors = [];
        setValidationErrors(errors);
        if (!title.length) errors.push("Song title is required.");
        if (!url) errors.push("Audio is required.");
        if (isNaN(albumId) && albumId) errors.push(`"${albumId}" is not a valid integer.`)
        if (!thisSong.albumId) {

            setIsDisabled(true)
        }
        setValidationErrors(errors);
    }, [title, url, albumId]);

    const handleSubmit = async (e) => {
        setShowForm(false);
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
        <>
            <div>
                <button onClick={() => setShowForm(true)}> Edit song details </button>
            </div>
            {showForm &&
                <form className="edit-song-form" onSubmit={handleSubmit}>
                    <ul className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((err) => <li key={err}>{err}</li>)}
                    </ul>
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
                    <button className='edit-song' type='submit'>Submit</button>
                    <div>
                        <button onClick={() => setShowForm(false)}> Cancel </button>
                    </div>
                    <div>
                        < DeleteSong />
                    </div>
                </form>
            }

        </>
    );
};

export default UpdateSong;