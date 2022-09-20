import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteComment, getComments } from "../../store/comments.js"

// import { NavLink, Route, useParams } from 'react-router-dom';

const DeleteComment = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { commentId } = useParams();
    commentId = parseInt(commentId);

    const userId = useSelector(state => state.session.user.id)
    const comments = useSelector(state => state.comments);
    const commentsArr = Object.values(comments);
    const myComment = commentsArr.find((comment) => comment.id === commentId)

    useEffect(() => {
        console.log("getting all comments in my DeleteComment component")
        dispatch(getComments())
    }, [dispatch]);

    console.log("commentsObj ", comments)
    console.log("this is my commentsArray ", commentsArr)
    console.log("user id is:", userId)
    console.log("this is the id in the url: ", commentId)
    console.log('this is my comment to delete: ', myComment);

    const handleClick = async (e) => {
        e.preventDefault();
        if (userId === myComment.userId) {
            let deletedComment = await dispatch(deleteComment(commentId));
            return history.push(`/comments`);
        }
    };

    if (!Object.values(comments).length) return null;

    return (
        <>
            <div>delete comment button below</div>
            <button className='delete-comment' onClick={handleClick}>Delete comment</button>
        </>
    );
};

export default DeleteComment;