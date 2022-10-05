import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteSong, getSongs } from "../../store/songs.js"
import "../UpdateSong/UpdateSong.css"

const DeleteSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // identify the song from the url
    let { songId } = useParams();
    songId = parseInt(songId);

    const songs = useSelector(state => state.songs);
    // const songsArr = Object.values(songs);
    // const mySong = songsArr.find((song) => song.id === songId)

    // get songs
    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch]);

    // onClick, delete the song from the url 
    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteSong(songId));
        return history.push(`/songs`);
    };

    if (!Object.values(songs).length) return null;

    return (
        <>
            <i class="fa-regular fa-trash-can" onClick={handleClick}></i>
        </>
    );
};

export default DeleteSong;