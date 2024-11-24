import React, { useState } from "react";

import "./ChatWindow.css";
import Message from "../Message";
import MessageInput from "../MessageInput";

const ChatWindow = ({ messages, onSendMessage }) => {
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>
      <MessageInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
