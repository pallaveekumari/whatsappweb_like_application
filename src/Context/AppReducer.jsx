const AppReducer = (state, action) => {
    switch (action.type) {
      case "SET_CONTACTS":
        return { ...state, contacts: action.payload };
      case "ADD_MESSAGE":
        const { contactId, message } = action.payload;
        return {
          ...state,
          messages: {
            ...state.messages,
            [contactId]: [...(state.messages[contactId] || []), message],
          },
        };
      default:
        return state;
    }
  };
  
  export default AppReducer;
  