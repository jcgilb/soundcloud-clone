import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs.js"
// import { NavLink, Route, useParams } from 'react-router-dom';

const GetAllSongs = () => {
    const dispatch = useDispatch();

    const songsObj = useSelector(state => state.songs)
    const songsArr = Object.values(songsObj);

    useEffect(() => {
        console.log("dispatching in my GetAllSongs useEffect");
        dispatch(getSongs());
    }, [dispatch]);

    console.log("these are my songs", songsObj);
    console.log("this is my songs array", songsArr);

    if (!songsArr.length) return null;

    return (
        <>
            <div>
                songs placeholder
            </div>
        </>

    );
};
export default GetAllSongs;
