import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

const ChatWindow = ({ contactId }) => {
  const { state } = useContext(AppContext);
  const messages = state.messages[contactId] || [];

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} time={msg.time} />
        ))}
      </div>
      <MessageInput contactId={contactId} />
    </div>
  );
};

export default ChatWindow;
