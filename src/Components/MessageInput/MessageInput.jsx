import React, { useState } from "react";
// import "./ChatWindow.css";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
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
      />
      <button className="send-button" onClick={handleSendMessage}>
        ➤
      </button>
    </div>
  );
};

export default MessageInput;
