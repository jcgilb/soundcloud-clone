import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { createComment } from "../../store/comments.js"
import "./CreateAComment.css"

const CreateNewComment = () => {
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);
    const songs = useSelector(state => state.songs)
    const song = Object.values(songs).find((song) => song.id === parseInt(songId));

    const revert = () => {
        setBody('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            body
        }
        let comment = await dispatch(createComment(newComment, songId));
        if (comment) {
            revert();
            history.push(`/songs/${song.id}`)
        }
    };

    return (
        <div className="write-comment">
            <div className="weird-box"><img alt="box" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664117317/icons/commentsquare_lphvlw.jpg"} /></div>
            <form className="create-comment-form" onSubmit={handleSubmit}>
                <input
                    type="body"
                    placeholder="Write a comment"
                    value={body}
                    onChange={(e) => setBody(e.target.value)} />
                <button className='new-comment' type='submit'> Submit </button>
            </form>

        </div>
    );
};

export default CreateNewComment;


