import { createContext, useContext, useState } from 'react';

export const IsPausedContext = createContext();
export const useIsPaused = () => useContext(IsPausedContext)

export default function IsPausedProvider(props) {
    const [isPaused, setIsPaused] = useState();

    return (
        <IsPausedContext.Provider
            value={{
                isPaused,
                setIsPaused
            }}
        >
            {props.children}
        </IsPausedContext.Provider>
    )
}