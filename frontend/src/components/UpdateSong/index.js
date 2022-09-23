import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { updateSong, getSongs } from "../../store/songs.js"
import { getAlbums } from "../../store/albums.js"
import DeleteSong from "../DeleteSong";

// import { NavLink, Route, useParams } from 'react-router-dom';

const UpdateSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [showForm, setShowForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [validations, setValidations] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);

    // const albums = useSelector(state => state.albums);
    const userId = useSelector(state => state.session.user.id);
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs);
    const thisSong = songsArr.find((song) => song.id === songId);

    useEffect(() => {
        // console.log("getting all songs in my UpdateSong component")
        dispatch(getSongs())
        dispatch(getAlbums())
    }, [dispatch]);

    useEffect(() => {
        let errors = [];
        if (!title) errors.push("Song title is required");
        if (!url) errors.push("Audio is required");
    }, [title, url])

    if (thisSong.albumId) setIsDisabled(false);

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setAlbumId();
    };

    // console.log("songsObj ", songs)
    // console.log("this is my songsArray ", songsArr)
    // console.log("user id is:", userId)
    // console.log("this is the id in the url: ", songId)
    // console.log('this is my song to edit: ', thisSong);

    const handleSubmit = async (e) => {
        setShowForm(false);
        e.preventDefault();
        let songBody = {
            title,
            description,
            url,
            albumId,
        }
        if (userId === thisSong.userId) {
            revert();
            let updatedSong = await dispatch(updateSong(songBody, songId));
            if (!validations.length) return history.push(`/songs/${updatedSong.id}`);
        }
    };

    if (!Object.values(songs).length) return null;

    return (
        <>
            <button onClick={() => setShowForm(true)}> Edit song details </button>
            {showForm &&
                <form className="edit-song-form" onSubmit={handleSubmit}>
                    <ul className="errors">
                        {validations.length > 0 &&
                            validations.map((err) => <li key={err}>{err}</li>)}
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
                        type="albumId"
                        placeholder="Album Id"
                        value={albumId}
                        disabled={isDisabled}
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
