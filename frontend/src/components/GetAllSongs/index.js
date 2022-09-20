import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs.js"
import { NavLink, Route, useParams } from 'react-router-dom';

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

    // load all the songs on this page
    // show a button to get song details, 
    // add onClick to go to <SongDetails song={song} />
    // pass in songs={songs} as props
    return (
        <>
            <div>
                {songsArr.map((song) => (
                    <h2>
                        <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <div className="description">{song.description}</div>
                        <div className="image-url">{song.imageUrl}</div>
                        <div className="audio-url">{song.url}</div>
                    </h2>
                ))}

            </div>
        </>

    );
};
export default GetAllSongs;
