import { useState, createContext } from 'react';
import { globalState } from './data';

export const GlobalContext = createContext();

// eslint-disable-next-line
export const AppContext = (props) => {
  const [contextState, setContextState] = useState(globalState);
  return (
    <GlobalContext.Provider value={{ contextState, setContextState }}>
      {/* eslint-disable-next-line */}
      {props.children}
    </GlobalContext.Provider>
  );
};
