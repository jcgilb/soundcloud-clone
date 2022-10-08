import { createContext, useContext, useState } from 'react';

export const AudioElementContext = createContext();
export const useAudioElement = () => useContext(AudioElementContext)

export default function AudioElementProvider(props) {
    const [audioElement, setAudioElement] = useState();

    return (
        <AudioElementContext.Provider
            value={{
                audioElement,
                setAudioElement
            }}
        >
            {props.children}
        </AudioElementContext.Provider>
    )
}