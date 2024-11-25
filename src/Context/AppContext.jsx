// // // import React, { createContext, useReducer } from "react";
// // // import messagesReducer from "../reducers/messagesReducer";

// // // const initialState = { contacts: [], messages: [] };
// // // export const AppContext = createContext();

// // // export const AppProvider = ({ children }) => {
// // //   const [state, dispatch] = useReducer(messagesReducer, initialState);

// // //   return (
// // //     <AppContext.Provider value={{ state, dispatch }}>
// // //       {children}
// // //     </AppContext.Provider>
// // //   );
// // // };
// // import React, { createContext, useReducer, useEffect } from "react";
// // import messagesReducer from "../reducers/messagesReducer";
// // import useInstantDB from "../Hooks/useInstantDB";
// // import useIndexedDB from "../Hooks/useIndexedDB";

// // const initialState = { contacts: [], messages: [] };

// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(messagesReducer, initialState);
// //   const messagesFromInstantDB = useInstantDB(state.selectedContactId);
// //   const messagesFromIndexedDB = useIndexedDB();

// //   useEffect(() => {
// //     // Update the global state with messages from InstantDB
// //     dispatch({
// //       type: "SET_MESSAGES",
// //       payload: messagesFromInstantDB || messagesFromIndexedDB,
// //     });
// //   }, [messagesFromInstantDB, messagesFromIndexedDB]);

// //   return (
// //     <AppContext.Provider value={{ state, dispatch }}>
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };


// import React, { createContext, useReducer, useEffect } from "react";
// // import messagesReducer, { SET_CONTACTS, SET_MESSAGES } from "../Reducers/MessagesReducer";
// import useInstantDB from "../Hooks/useInstantDB";
// import useIndexedDB from "../Hooks/useIndexedDB";
// import messagesReducer from "../Reducers/MessageReducer";

// const initialState = { contacts: [], messages: [], selectedContactId: null };

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(messagesReducer, initialState);

//   const messagesFromInstantDB = useInstantDB(state.selectedContactId); // Fetch messages for the selected contact
//   const messagesFromIndexedDB = useIndexedDB();

//   // Load persisted contacts/messages on app initialization
//   useEffect(() => {
//     if (state.selectedContactId) {
//       const messages = messagesFromInstantDB || messagesFromIndexedDB;
//       dispatch({ type: SET_MESSAGES, payload: messages || [] });
//     }
//   }, [state.selectedContactId, messagesFromInstantDB, messagesFromIndexedDB]);

//   const saveMessages = (contactId, messages) => {
//     // Save messages to InstantDB or IndexedDB based on preference
//     if (contactId) {
//       useInstantDB(contactId, messages);
//     } else {
//       useIndexedDB(messages);
//     }
//   };

//   return (
//     <AppContext.Provider value={{ state, dispatch, saveMessages }}>
//       {children}
//     </AppContext.Provider>
//   );
// };


import React, { createContext, useReducer, useEffect } from "react";
import messagesReducer, { SET_CONTACTS, SET_MESSAGES } from "../Reducers/MessageReducer"; // Ensure action types are imported
import useInstantDB from "../Hooks/useInstantDB";
import useIndexedDB from "../Hooks/useIndexedDB";

const initialState = { contacts: [], messages: [], selectedContactId: null };

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  const { fetchData, saveData } = useInstantDB("https://your-api-url.com", "your-api-key");
  const { fetchAllFromStore, saveToStore } = useIndexedDB();

  // Load persisted contacts/messages on app initialization
  useEffect(() => {
    const loadMessages = async () => {
      if (state.selectedContactId) {
        try {
          const messages = await fetchData(`messages/${state.selectedContactId}`);
          dispatch({ type: SET_MESSAGES, payload: messages || [] });
        } catch (error) {
          console.error("Error fetching messages from InstantDB:", error);
          const localMessages = await fetchAllFromStore("messages");
          dispatch({ type: SET_MESSAGES, payload: localMessages || [] });
        }
      }
    };

    loadMessages();
  }, [state.selectedContactId, fetchData, fetchAllFromStore]);

  const saveMessages = async (contactId, messages) => {
    try {
      if (contactId) {
        await saveData(`messages/${contactId}`, messages);
      } else {
        await saveToStore("messages", messages);
      }
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, saveMessages }}>
      {children}
    </AppContext.Provider>
  );
};
