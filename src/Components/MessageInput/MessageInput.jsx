// import React, { useState } from "react";
// // import "./ChatWindow.css";

// const MessageInput = ({ onSend }) => {
//   const [message, setMessage] = useState("");

//   const handleSendMessage = () => {
//     if (message.trim() !== "") {
//       onSend(message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="message-input-container">
//       <input
//         type="text"
//         className="message-input"
//         placeholder="Type a message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//       />
//       <button className="send-button" onClick={handleSendMessage}>
//         ➤
//       </button>
//     </div>
//   );
// };

// export default MessageInput;


import React, { useState } from "react";
import PropTypes from "prop-types"; // For prop validation
import "./MessageInput.css"; // Ensure this file exists for consistent styling

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage !== "") {
      onSend(trimmedMessage); // Send trimmed message
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        className="message-input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        role="textbox" // Improves accessibility
        aria-label="Message input field" // Screen reader description
      />
      <button
        className="send-button"
        onClick={handleSendMessage}
        aria-label="Send message"
        disabled={message.trim() === ""} // Disable button if input is empty
      >
        ➤
      </button>
    </div>
  );
};

MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default MessageInput;
