// const messagesReducer = (state, action) => {
//     switch (action.type) {
//       case "SET_CONTACTS":
//         return { ...state, contacts: action.payload };
//       case "SET_MESSAGES":
//         return { ...state, messages: action.payload };
//       default:
//         return state;
//     }
//   };
  
//   export default messagesReducer;

// Action Types
const SET_CONTACTS = "SET_CONTACTS";
const SET_MESSAGES = "SET_MESSAGES";

// Initial State
const initialState = {
  contacts: [], // Default as an empty array
  messages: [], // Default as an empty array
};

// Reducer Function
const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload, // Update contacts
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload, // Update messages
      };
    default:
      console.warn(`Unhandled action type: ${action.type}`); // Log unhandled actions
      return state; // Return current state if action type is not recognized
  }
};

export default messagesReducer;

// Export Action Types for Consistency
export { SET_CONTACTS, SET_MESSAGES };

  