import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getComments, deleteComment } from "../../store/comments.js"
import { useParams, useHistory } from "react-router-dom";
import "./GetAllComments.css"
// import DeleteAComment from "../DeleteAComment"
// import { NavLink, Route } from 'react-router-dom';

const GetAllComments = () => {
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs)
    const user = useSelector(state => state.session.user)
    const song = Object.values(songs).find((song) => song.id === parseInt(songId));
    const commentsObj = useSelector(state => state.comments)
    const commentsArr = Object.values(commentsObj);


    useEffect(() => {
        // console.log("dispatching in my GetAllComments useEffect");
        dispatch(getComments(songId));
    }, [dispatch, songId]);

    // console.log("these are my comments", commentsObj);
    // console.log("this is my comments array", commentsArr);

    useEffect(() => {
        if (!showDetails) return;
        const closeDetails = () => {
            setShowDetails(false);
        };
        document.addEventListener('click', closeDetails);
        return () => document.removeEventListener("click", closeDetails);
    }, [showDetails]);

    let songComments = commentsArr.filter((comment) => comment.songId === song.id);
    // console.log("songComments array", songComments);

    return (
        <>
            <div className="get-all-comments">
                <br></br>
                <div> <i class="fa-regular fa-message"></i> {songComments.length} Comments</div>
                <br></br>
                <hr></hr>
                <br></br>
                {songComments.map(comment => (
                    <div className="individual-comment">
                        <div key={comment.id} className="comment-body">{comment.body}</div>

                        <div className="comment-end">
                            <div key="my-comment">{user.username} { }: {(comment.createdAt).slice(0, 10)}</div>
                            {comment.userId === user.id &&
                                <i class="fa-regular fa-trash-can"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await dispatch(deleteComment(comment.id));
                                        return history.push(`/songs/${song.id}`);
                                    }}></i>
                            }
                        </div>




                    </div>
                ))}
            </div>
        </>

    );
};
export default GetAllComments;
