import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const ContactList = ({ onSelect }) => {
  const { state } = useContext(AppContext);

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div key={contact.id} onClick={() => onSelect(contact.id)}>
          {contact.name}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
