import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comments.js"
// import { NavLink, Route, useParams } from 'react-router-dom';

const GetAllComments = () => {
    const dispatch = useDispatch();

    const commentsObj = useSelector(state => state.comments)
    const commentsArr = Object.values(commentsObj);

    useEffect(() => {
        console.log("dispatching in my GetAllComments useEffect");
        dispatch(getComments());
    }, [dispatch]);

    console.log("these are my comments", commentsObj);
    console.log("this is my comments array", commentsArr);

    if (!commentsArr.length) return null;

    return (
        <>
            <div>
                comments placeholder
            </div>
        </>

    );
};
export default GetAllComments;
