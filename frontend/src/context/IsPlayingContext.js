import { createContext, useContext, useState } from 'react';

export const IsPlayingContext = createContext();
export const useIsPlaying = () => useContext(IsPlayingContext)

export default function IsPlayingProvider(props) {
    const [isPlaying, setIsPlaying] = useState();

    return (
        <IsPlayingContext.Provider
            value={{
                isPlaying,
                setIsPlaying
            }}
        >
            {props.children}
        </IsPlayingContext.Provider>
    )
}