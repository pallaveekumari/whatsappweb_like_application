import React from "react";
import ChatWindow from "../../Components/ChatWindow/ChatWindow";
import ContactList from "../../Components/ContactList/ContactList";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="contact-list">
        <ContactList />
      </div>
      <div className="chat-window">
        <ChatWindow />
      </div>
    </div>
  );
};

export default HomePage;
