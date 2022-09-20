import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { createSong, getSongs } from "../../store/songs.js"


const CreateNewSong = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log("dispatching in my useEffect")
        dispatch(getSongs())
    }, [dispatch]);

    const curState = useSelector(state => state.songs);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSong = {
            title,
            description,
            url,
            imageUrl,
            albumId,
        }
        let song = dispatch(createSong(newSong));
        console.log("this is my new song: ", song)
        if (song) {
            const lastId = Object.values(curState).length
            const nextId = lastId + 1;
            history.push(`/songs/${nextId}`);
        }
    };

    if (!Object.values(curState).length) return null;

    return (
        <>
            <form className="create-pokemon-form" onSubmit={handleSubmit}>
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
                <button className='new-song' type='submit'>Create new song</button>
            </form>
        </>
    );
};

export default CreateNewSong;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';
// // import { NavLink, Route, useParams } from 'react-router-dom';
// import { createSong, getSongs } from "../../store/songs.js"

// const CreateNewSong = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [url, setUrl] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [albumId, setAlbumId] = useState(null);
//     const dispatch = useDispatch();
//     const history = useHistory();
//     // const { songId } = useParams();

//     useEffect(() => {
//         console.log("getting all songs in my CreateNewSong component")
//         dispatch(getSongs())
//     }, [dispatch]);

//     const songs = useSelector(state => state.songs);
//     const songsArr = Object.values(songs);
//     const lastSong = songsArr[songsArr.length - 1];
//     const lastId = lastSong.id;

//     useEffect(() => {
//         console.log("dispatching in my useEffect")
//         dispatch(getSongs())
//     }, [dispatch]);

//     const curState = useSelector(state => state.songs);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newSong = {
//             title,
//             description,
//             url,
//             imageUrl,
//             albumId,
//         }
//         let song = dispatch(createSong(newSong));
//         console.log("this is my new song: ", song)
//         if (song) {
//             const nextId = lastId + 1;
//             history.push(`/songs/${nextId}`);
//         }
//     };

//     if (!Object.values(curState).length) return null;

//     return (
//         <>
//             <form className="create-song-form" onSubmit={handleSubmit}>
//                 <input
//                     type="title"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)} />
//                 {/* <ErrorMessage label={"Title"} message={errorMessages.title} /> */}
//                 <input
//                     type="description"
//                     placeholder="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)} />
//                 {/* <ErrorMessage label={"Description"} message={errorMessages.description} /> */}
//                 <input
//                     type="url"
//                     placeholder="Url"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)} />
//                 {/* <ErrorMessage label={"Url"} message={errorMessages.url} /> */}
//                 <input
//                     type="imageUrl"
//                     placeholder="Image URL"
//                     value={imageUrl}
//                     onChange={(e) => setImageUrl(e.target.value)} />
//                 {/* <ErrorMessage label={"Image URL"} message={errorMessages.imageUrl} /> */}
//                 <input
//                     type="albumId"
//                     placeholder="Album Id"
//                     value={albumId}
//                     onChange={(e) => setAlbumId(e.target.value)} />
//                 {/* <ErrorMessage label={"AlbumId"} message={errorMessages.albumId} /> */}
//                 <button className='new-song' type='submit'>Create new song</button>
//             </form>
//         </>
//     );
// };

// export default CreateNewSong;