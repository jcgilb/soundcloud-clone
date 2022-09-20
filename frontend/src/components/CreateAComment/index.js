import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { createComment } from "../../store/comments.js"

const CreateNewComment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const curState = useSelector(state => state.comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            // title,
            // description,
            // url,
            // imageUrl,
            // albumId,
        }
        let comment = await dispatch(createComment(newComment));
        console.log("this is my new comment: ", comment)
        if (comment) {
            history.push(`/comments/${comment.id}`)
        }
    };

    if (!Object.values(curState).length) return null;

    return (
        <>
            <form className="create-comment-form" onSubmit={handleSubmit}>
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
                <button className='new-comment' type='submit'>Create new comment</button>
            </form>
        </>
    );
};

export default CreateNewComment;


