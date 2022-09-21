import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comments.js"
import { useParams } from "react-router-dom";
// import { NavLink, Route } from 'react-router-dom';

const GetAllComments = () => {
    const dispatch = useDispatch();
    let { songId } = useParams();
    const songs = useSelector(state => state.songs)
    const song = Object.values(songs).find((song) => song.id === parseInt(songId));
    const commentsObj = useSelector(state => state.comments)
    const commentsArr = Object.values(commentsObj);

    useEffect(() => {
        console.log("dispatching in my GetAllComments useEffect");
        dispatch(getComments(songId));
    }, [dispatch, songId]);

    console.log("these are my comments", commentsObj);
    console.log("this is my comments array", commentsArr);

    if (!commentsArr.length) return null;

    let songComments = commentsArr.filter((comment) => comment.songId === song.id)
    console.log("songComments array", songComments)
    return (
        <>
            <div>
                <br></br>
                <h4>Comments</h4>
                {songComments.map(comment => <div key={comment.id} className="comment-body">{comment.body}</div>)}
            </div>
        </>

    );
};
export default GetAllComments;
