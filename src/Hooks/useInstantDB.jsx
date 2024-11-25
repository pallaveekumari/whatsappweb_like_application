// // // import { InstantDB } from "instantdb";

// // // const db = new InstantDB({
// // //   projectId: "7221ed1b-9b0d-42f3-9c66-19c64f5e8ee2",
// // //   apiKey: "7221ed1b-9b0d-42f3-9c66-19c64f5e8ee2",
// // // });

// // // export const useInstantDB = () => {
// // //   const getMessages = async (contactId) => {
// // //     return await db.collection("messages").where("contactId", contactId).get();
// // //   };

// // //   const sendMessage = async (message) => {
// // //     await db.collection("messages").add(message);
// // //   };

// // //   return { getMessages, sendMessage };
// // // };

// // import { useEffect, useState } from "react";

// // const useInstantDB = (contactId) => {
// //   const [messages, setMessages] = useState([]);

// //   useEffect(() => {
// //     // Fetch messages from InstantDB (or subscribe to real-time updates)
// //     const fetchMessages = async () => {
// //       // Example: Fetch messages for the selected contact
// //       const fetchedMessages = await fetchMessagesFromInstantDB(contactId);
// //       setMessages(fetchedMessages);
// //     };

// //     fetchMessages();
// //   }, [contactId]);

// //   return messages;
// // };

// // export default useInstantDB;


// import { useState, useEffect } from "react";
// import axios from "axios";

// const useInstantDB = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch data
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(url);
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new data
//   const addData = async (newData) => {
//     try {
//       const response = await axios.post(url, newData);
//       setData((prev) => [...prev, response.data]);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return { data, loading, error, addData, fetchData };
// };

// export default useInstantDB;

import { useState } from "react";

const useInstantDB = (baseURL, apiKey) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveData = async (endpoint, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`, // Include the API key in the headers
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data to InstantDB");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`, // Include the API key in the headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from InstantDB");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { saveData, fetchData, loading, error };
};

export default useInstantDB;
