import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteSong, getSongs } from "../../store/songs.js"

// import { NavLink, Route, useParams } from 'react-router-dom';

const DeleteSong = (currentSong = { currentSong }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { songId } = useParams();
    songId = parseInt(songId);

    const userId = useSelector(state => state.session.user.id)
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs);
    const mySong = songsArr.find((song) => song.id === songId)

    useEffect(() => {
        console.log("getting all songs in my DeleteSong component")
        dispatch(getSongs())
    }, [dispatch]);

    console.log("songsObj ", songs)
    console.log("this is my songsArray ", songsArr)
    console.log("song's userId is:", mySong.userId)
    console.log("this is the id in the url: ", songId)
    console.log('this is my song to delete: ', mySong);

    const handleClick = async (e) => {
        e.preventDefault();
        // if (userId === mySong.userId) {
        // }
        await dispatch(deleteSong(songId));
        return history.push(`/songs`);

    };

    if (!Object.values(songs).length) return null;

    return (
        <>
            <div>delete song button below</div>
            <button className='delete-song' onClick={handleClick}>Delete song</button>
        </>
    );
};

export default DeleteSong;