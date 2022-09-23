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
    const [albumId, setAlbumId] = useState(null);
    const [showForm, setShowForm] = useState(false);
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

    // const showEditForm = () => {
    //     if (showForm) return;
    //     setShowForm(true);
    // };

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setAlbumId(null);
    };

    console.log("songsObj ", songs)
    console.log("this is my songsArray ", songsArr)
    console.log("user id is:", userId)
    console.log("this is the id in the url: ", songId)
    console.log('this is my song to edit: ', mySong);

    const handleSubmit = async (e) => {
        setShowForm(false);
        e.preventDefault();
        let songBody = {
            title,
            description,
            url,
            albumId,
        }
        if (userId === mySong.userId) {
            revert();
            let updatedSong = await dispatch(updateSong(songBody, songId));
            history.push(`/songs/${updatedSong.id}`);
        }
    };

    if (!Object.values(songs).length) return null;

    return (
        <>
            <button onClick={() => setShowForm(true)}> Edit song details </button>
            {showForm &&
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