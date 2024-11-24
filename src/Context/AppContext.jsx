import React, { createContext, useReducer } from "react";
import messagesReducer from "../reducers/messagesReducer";

const initialState = { contacts: [], messages: [] };
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
