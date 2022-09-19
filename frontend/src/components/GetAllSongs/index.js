import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from "../../store/songs.js"

const GetAllSongs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("dispatching in my useEffect")
        dispatch(getSongs())
    }, [dispatch]);

    const songsObj = useSelector(state => state.songs)
    console.log("these are my songs", songsObj)
    const songsArr = Object.values(songsObj);
    console.log("this is my songs array", songsArr)

    if (!songsArr.length) {
        return null;
    }

    return (
        <>
            <div>
                songs placeholder
            </div>
        </>

    );
};

export default GetAllSongs;