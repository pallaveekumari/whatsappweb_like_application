const messagesReducer = (state, action) => {
    switch (action.type) {
      case "SET_CONTACTS":
        return { ...state, contacts: action.payload };
      case "SET_MESSAGES":
        return { ...state, messages: action.payload };
      default:
        return state;
    }
  };
  
  export default messagesReducer;
  