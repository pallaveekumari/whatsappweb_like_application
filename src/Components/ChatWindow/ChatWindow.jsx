// import React from "react";
// import "./ChatWindow.css";
// // import Message from "../Message";
// import MessageInput from "../MessageInput/MessageInput";
// const ChatWindow = ({ messages, onSendMessage }) => {
//   return (
//     <div className="chat-window">
//       {/* Messages Section */}
//       <div className="messages">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`message ${
//               msg.sender === "me" ? "outgoing" : "incoming"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Message Input Section */}
//       <div className="chat-input-container">
//         <MessageInput onSend={onSendMessage} />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;


import React from "react";
import PropTypes from "prop-types"; // For prop validation
import "./ChatWindow.css";
import MessageInput from "../MessageInput/MessageInput";

const ChatWindow = ({ messages, onSendMessage }) => {
  return (
    <div className="chat-window">
      {/* Messages Section */}
      <div className="messages" aria-live="polite" aria-label="Chat messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={msg.id || index} // Fallback to index if id is missing
              className={`message ${
                msg.sender === "me" ? "outgoing" : "incoming"
              }`}
              role="status" // Indicates the message content
              aria-label={`${msg.sender === "me" ? "Outgoing" : "Incoming"} message: ${msg.text}`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet</p>
        )}
      </div>

      {/* Message Input Section */}
      <div className="chat-input-container">
        <MessageInput onSend={onSendMessage} />
      </div>
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
  ).isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default ChatWindow;
