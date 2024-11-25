// import React, { createContext, useReducer } from "react";
// import messagesReducer from "../reducers/messagesReducer";

// const initialState = { contacts: [], messages: [] };
// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(messagesReducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
import React, { createContext, useReducer, useEffect } from "react";
import messagesReducer from "../reducers/messagesReducer";
import useInstantDB from "../Hooks/useInstantDB";
import useIndexedDB from "../Hooks/useIndexedDB";

const initialState = { contacts: [], messages: [] };

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, initialState);
  const messagesFromInstantDB = useInstantDB(state.selectedContactId);
  const messagesFromIndexedDB = useIndexedDB();

  useEffect(() => {
    // Update the global state with messages from InstantDB
    dispatch({
      type: "SET_MESSAGES",
      payload: messagesFromInstantDB || messagesFromIndexedDB,
    });
  }, [messagesFromInstantDB, messagesFromIndexedDB]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
