import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { updateSong, getSongs } from "../../store/songs.js"

// import { NavLink, Route, useParams } from 'react-router-dom';

const UpdateSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [albumId, setAlbumId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);

    const userId = useSelector(state => state.session.user.id)
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs);
    const mySong = songsArr.find((song) => song.id === songId)

    useEffect(() => {
        console.log("getting all songs in my UpdateSong component")
        dispatch(getSongs())
    }, [dispatch]);

    console.log("songsObj ", songs)
    console.log("this is my songsArray ", songsArr)
    console.log("user id is:", userId)
    console.log("this is the id in the url: ", songId)
    console.log('this is my song to edit: ', mySong);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let songBody = {
            title,
            description,
            url,
            albumId,
        }
        if (userId === mySong.userId) {
            let updatedSong = await dispatch(updateSong(songBody, songId));
            history.push(`/songs/${updatedSong.id}`);
        }
    };

    if (!Object.values(songs).length) return null;

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

export default UpdateSong;