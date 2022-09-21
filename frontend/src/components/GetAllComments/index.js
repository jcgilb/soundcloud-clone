import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from "react-redux";
import { getComments, deleteComment } from "../../store/comments.js"
import { useParams, useHistory } from "react-router-dom";
import DeleteAComment from "../DeleteAComment"
// import { NavLink, Route } from 'react-router-dom';

const GetAllComments = () => {
    const [userComment, setUserComment] = useState(false);
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
        console.log("dispatching in my GetAllComments useEffect");
        dispatch(getComments(songId));
    }, [dispatch, songId]);

    console.log("these are my comments", commentsObj);
    console.log("this is my comments array", commentsArr);

    // const details = () => {
    //     if (showDetails) return;
    //     setShowDetails(true);
    // }

    useEffect(() => {
        if (!showDetails) return;
        const closeDetails = () => {
            setShowDetails(false);
        };
        document.addEventListener('click', closeDetails);
        return () => document.removeEventListener("click", closeDetails);
    }, [showDetails]);

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     if (userId === myComment.userId) {
    //         let deletedComment = await dispatch(deleteComment());
    //         return history.push(`/songs/${song.id}`);
    //     }
    // }

    // if (!commentsArr.length) return null;

    let songComments = commentsArr.filter((comment) => comment.songId === song.id);
    // let userComments = commentsArr.filter((comment) => comment.userId === user.id);
    console.log("songComments array", songComments)
    return (
        <>
            <div>
                <br></br>
                <h4>Comments</h4>
                {!!commentsArr.length &&
                    <button className="comment-details" onClick={() => setShowDetails(true)}>{<>{!showDetails && <>show details</>}{showDetails && <>hide details</>}</>}</button>
                }
                {songComments.map(comment => (
                    <>
                        <div key={comment.id} className="comment-body">{comment.body}</div>
                        {showDetails &&
                            <>
                                <div>hi</div>
                                {comment.userId === user.id &&
                                    <button onClick={async (e) => {
                                        e.preventDefault();
                                        let deletedComment = await dispatch(deleteComment(comment.id));
                                        return history.push(`/songs/${song.id}`);
                                    }}>delete comment</button>
                                }
                            </>
                        }

                    </>
                ))}
            </div>
        </>

    );
};
export default GetAllComments;
