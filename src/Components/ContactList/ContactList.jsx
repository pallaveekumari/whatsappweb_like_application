
// import React from "react";
// import PropTypes from "prop-types"; // For prop validation
// import "./ContactList.css";

// const ContactList = ({ contacts, onSelectContact }) => {
//   return (
//     <div className="contact-list">
//       {contacts.length > 0 ? (
//         contacts.map((contact) => (
//           <div
//             key={contact.id}
//             className="contact-item"
//             onClick={() => onSelectContact(contact)}
//             tabIndex={0} // Allows keyboard navigation
//             role="button" // Indicates this is an interactive element
//             aria-label={`Select contact ${contact.name}`}
//           >
//             {contact.name}
//           </div>
//         ))
//       ) : (
//         <p className="no-contacts">No contacts available</p>
//       )}
//     </div>
//   );
// };

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onSelectContact: PropTypes.func.isRequired,
// };

// export default ContactList;


import React from "react";
import PropTypes from "prop-types"; // For prop validation
import "./ContactList.css";

const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <div className="contact-list">
      {contacts?.length > 0 ? ( // Use optional chaining to handle undefined or null
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => onSelectContact(contact)}
            tabIndex={0} // Allows keyboard navigation
            role="button" // Indicates this is an interactive element
            aria-label={`Select contact ${contact.name}`}
          >
            {contact.name}
          </div>
        ))
      ) : (
        <p className="no-contacts">No contacts available</p>
      )}
    </div>
  );
};

// Add default props to handle undefined inputs gracefully
ContactList.defaultProps = {
  contacts: [], // Default to an empty array
  onSelectContact: () => {}, // Default to a no-op function
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectContact: PropTypes.func.isRequired,
};

export default ContactList;
