import React from "react";
import "./Message.css";

const Message = ({ message }) => {
  return <div className={`message ${message.isSent ? "sent" : "received"}`}>{message.text}</div>;
};

export default Message;
