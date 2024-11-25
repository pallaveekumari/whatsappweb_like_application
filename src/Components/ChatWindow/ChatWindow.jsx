

// import React from "react";
// import PropTypes from "prop-types";
// import "./ChatWindow.css";
// import MessageInput from "../MessageInput/MessageInput";

// const ChatWindow = ({ messages, onSendMessage }) => {
//   // Fallback to empty array if messages is undefined
//   const safeMessages = messages || [];

//   return (
//     <div className="chat-window">
//       {/* Messages Section */}
//       <div className="messages" aria-live="polite" aria-label="Chat messages">
//         {safeMessages.length > 0 ? (
//           safeMessages.map((msg, index) => (
//             <div
//               key={msg.id || index} // Fallback to index if id is missing
//               className={`message ${msg.sender === "me" ? "outgoing" : "incoming"}`}
//               role="status"
//               aria-label={`${msg.sender === "me" ? "Outgoing" : "Incoming"} message: ${msg.text}`}
//             >
//               {msg.text}
//             </div>
//           ))
//         ) : (
//           <p className="no-messages">No messages yet</p>
//         )}
//       </div>

//       {/* Message Input Section */}
//       <div className="chat-input-container">
//         <MessageInput onSend={onSendMessage} />
//       </div>
//     </div>
//   );
// };

// ChatWindow.propTypes = {
//   messages: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       text: PropTypes.string.isRequired,
//       sender: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onSendMessage: PropTypes.func.isRequired,
// };

// export default ChatWindow;


import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./ChatWindow.css";
import MessageInput from "../MessageInput/MessageInput";
import { AppContext } from "../../Context/AppContext";
// import { AppContext } from "../Context/AppContext";

const ChatWindow = () => {
  const { state, dispatch, saveMessages } = useContext(AppContext);
  const { selectedContactId, messages } = state;

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: "me",
    };
    const updatedMessages = [...messages, newMessage];

    dispatch({ type: "SET_MESSAGES", payload: updatedMessages });
    saveMessages(selectedContactId, updatedMessages); // Save to database
  };

  return (
    <div className="chat-window">
      <div className="messages" aria-live="polite">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "me" ? "outgoing" : "incoming"}`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    })
  ),
};

export default ChatWindow;
