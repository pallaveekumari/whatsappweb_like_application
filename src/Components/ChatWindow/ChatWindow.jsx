import React from "react";
import "./ChatWindow.css";
// import Message from "../Message";
import MessageInput from "../MessageInput/MessageInput";
const ChatWindow = ({ messages, onSendMessage }) => {
  return (
    <div className="chat-window">
      {/* Messages Section */}
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === "me" ? "outgoing" : "incoming"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="chat-input-container">
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
