import { createContext, useContext, useState } from 'react';

export const CurrentSongContext = createContext();
export const useCurrentSong = () => useContext(CurrentSongContext)

export default function CurrentSongProvider(props) {
    const [currentSong, setCurrentSong] = useState();

    return (
        <CurrentSongContext.Provider
            value={{
                currentSong,
                setCurrentSong,
            }}
        >
            {props.children}
        </CurrentSongContext.Provider>
    )
}