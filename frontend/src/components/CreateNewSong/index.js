import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSong } from "../../store/songs.js"
// import { NavLink, Route, useParams } from 'react-router-dom';

const CreateNewSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState();
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const revert = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId();
    };

    const handleSubmit = async (e) => {
        setShowForm(false)
        e.preventDefault();
        const newSong = {
            title,
            description,
            url,
            imageUrl,
            albumId,
        }
        let song = await dispatch(createSong(newSong));
        if (song) {
            revert();
            return history.push(`/songs/${song.id}`);
        }
    };

    return (
        <>
            <div>
                <button onClick={() => setShowForm(true)}> Upload </button>
            </div>
            {showForm &&
                <form className="create-song-form" onSubmit={handleSubmit}>
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
                    <button className='new-song' type='submit'>Upload song</button>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            revert()
                            setShowForm(false)
                        }}> Cancel </button>
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
