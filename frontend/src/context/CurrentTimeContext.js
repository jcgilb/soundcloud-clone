import { createContext, useContext, useState } from "react";

export const CurrentTimeContext = createContext();
export const useCurrentTime = () => useContext(CurrentTimeContext);

export default function CurrentTimeProvider(props) {
  const [curTime, setCurTime] = useState(0);

  return (
    <CurrentTimeContext.Provider
      value={{
        curTime,
        setCurTime,
      }}
    >
      {props.children}
    </CurrentTimeContext.Provider>
  );
}
