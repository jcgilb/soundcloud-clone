import { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

export const CurrentSongContext = createContext();
export const useCurrentSong = () => useContext(CurrentSongContext)

export default function CurrentSongProvider(props) {
    // const firstSong = useSelector(state => state.songs[1])
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <CurrentSongContext.Provider
            value={{
                currentSong,
                setCurrentSong
            }}
        >
            {props.children}
        </CurrentSongContext.Provider>
    )
}