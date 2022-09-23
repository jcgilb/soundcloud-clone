import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { createComment } from "../../store/comments.js"

const CreateNewComment = () => {
    const [body, setBody] = useState('');
    const [showForm, setShowForm] = useState(false);;
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
        setShowForm(false)
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
        <>
            <div>
                <button onClick={() => setShowForm(true)}> Leave a comment </button>
            </div>
            {showForm &&
                <form className="create-comment-form" onSubmit={handleSubmit}>
                    <input
                        type="body"
                        placeholder="Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)} />
                    <button className='new-comment' type='submit'> Submit </button>
                    <div>
                        <button onClick={() => setShowForm(false)}> Cancel </button>
                    </div>
                </form>}
        </>
    );
};

export default CreateNewComment;


