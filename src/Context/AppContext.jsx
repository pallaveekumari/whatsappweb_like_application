import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  contacts: [], // Example: [{ id: 1, name: "John" }]
  messages: {}, // Example: { 1: [{ text: "Hi", time: "12:00" }] }
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
