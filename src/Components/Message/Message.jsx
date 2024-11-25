// import React from "react";
// import "./Message.css";

// const Message = ({ message }) => {
//   return <div className={`message ${message.isSent ? "sent" : "received"}`}>{message.text}</div>;
// };

// export default Message;


import React from "react";
import PropTypes from "prop-types"; // For prop validation
import "./Message.css";

const Message = ({ message }) => {
  return (
    <div
      className={`message ${message.isSent ? "sent" : "received"}`}
      role="status" // Indicates dynamic content
      aria-label={`${
        message.isSent ? "Sent" : "Received"
      } message: ${message.text}`}
    >
      {message.text}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isSent: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Message;
