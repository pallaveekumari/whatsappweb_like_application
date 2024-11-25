// // // // import { useEffect } from "react";

// // // // export const useIndexedDB = () => {
// // // //   let db;

// // // //   const initDB = () => {
// // // //     const request = indexedDB.open("WhatsAppCloneDB", 1);
// // // //     request.onupgradeneeded = (event) => {
// // // //       db = event.target.result;
// // // //       if (!db.objectStoreNames.contains("messages")) {
// // // //         db.createObjectStore("messages", { keyPath: "id" });
// // // //       }
// // // //     };
// // // //     request.onsuccess = (event) => {
// // // //       db = event.target.result;
// // // //     };
// // // //   };

// // // //   const saveMessage = (message) => {
// // // //     const transaction = db.transaction(["messages"], "readwrite");
// // // //     const store = transaction.objectStore("messages");
// // // //     store.add(message);
// // // //   };

// // // //   const getMessages = () => {
// // // //     return new Promise((resolve) => {
// // // //       const transaction = db.transaction(["messages"], "readonly");
// // // //       const store = transaction.objectStore("messages");
// // // //       const request = store.getAll();
// // // //       request.onsuccess = () => resolve(request.result);
// // // //     });
// // // //   };

// // // //   useEffect(() => {
// // // //     initDB();
// // // //   }, []);

// // // //   return { saveMessage, getMessages };
// // // // };


// // // import { useState, useEffect } from "react";
// // // import { openDB } from "idb"; // Using idb library for IndexedDB interaction

// // // const useIndexedDB = () => {
// // //   const [messages, setMessages] = useState([]);

// // //   useEffect(() => {
// // //     const getMessagesFromDB = async () => {
// // //       const db = await openDB("chatAppDB", 1, {
// // //         upgrade(db) {
// // //           db.createObjectStore("messages", {
// // //             keyPath: "id",
// // //             autoIncrement: true,
// // //           });
// // //         },
// // //       });
// // //       const storedMessages = await db.getAll("messages");
// // //       setMessages(storedMessages);
// // //     };

// // //     getMessagesFromDB();
// // //   }, []);

// // //   return messages;
// // // };

// // // export default useIndexedDB;


// // import { useEffect } from "react";

// // const useIndexedDB = (dbName, storeName) => {
// //   let db;

// //   const openDB = () => {
// //     return new Promise((resolve, reject) => {
// //       const request = indexedDB.open(dbName, 1);
// //       request.onupgradeneeded = (event) => {
// //         db = event.target.result;
// //         if (!db.objectStoreNames.contains(storeName)) {
// //           db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
// //         }
// //       };
// //       request.onsuccess = (event) => {
// //         db = event.target.result;
// //         resolve(db);
// //       };
// //       request.onerror = (event) => reject(event.target.error);
// //     });
// //   };

// //   const addData = async (data) => {
// //     await openDB();
// //     return new Promise((resolve, reject) => {
// //       const transaction = db.transaction([storeName], "readwrite");
// //       const store = transaction.objectStore(storeName);
// //       const request = store.add(data);

// //       request.onsuccess = () => resolve(request.result);
// //       request.onerror = (event) => reject(event.target.error);
// //     });
// //   };

// //   const getData = async () => {
// //     await openDB();
// //     return new Promise((resolve, reject) => {
// //       const transaction = db.transaction([storeName], "readonly");
// //       const store = transaction.objectStore(storeName);
// //       const request = store.getAll();

// //       request.onsuccess = () => resolve(request.result);
// //       request.onerror = (event) => reject(event.target.error);
// //     });
// //   };

// //   useEffect(() => {
// //     openDB();
// //   }, []);

// //   return { addData, getData };
// // };

// // export default useIndexedDB;

// import { useEffect } from "react";

// const useIndexedDB = (dbName, storeName) => {
//   let db;

//   const openDB = () => {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open(dbName, 1);
//       request.onupgradeneeded = (event) => {
//         db = event.target.result;
//         if (!db.objectStoreNames.contains(storeName)) {
//           db.createObjectStore(storeName, { keyPath: "id" });
//         }
//       };
//       request.onsuccess = (event) => {
//         db = event.target.result;
//         resolve(db);
//       };
//       request.onerror = (event) => reject(event.target.error);
//     });
//   };

//   const addData = async (data) => {
//     await openDB();
//     return new Promise((resolve, reject) => {
//       const transaction = db.transaction([storeName], "readwrite");
//       const store = transaction.objectStore(storeName);
//       const request = store.add(data);

//       request.onsuccess = () => resolve(request.result);
//       request.onerror = (event) => reject(event.target.error);
//     });
//   };

//   const getData = async () => {
//     await openDB();
//     return new Promise((resolve, reject) => {
//       const transaction = db.transaction([storeName], "readonly");
//       const store = transaction.objectStore(storeName);
//       const request = store.getAll();

//       request.onsuccess = () => resolve(request.result);
//       request.onerror = (event) => reject(event.target.error);
//     });
//   };

//   useEffect(() => {
//     openDB();
//   }, []);

//   return { addData, getData };
// };

// export default useIndexedDB;


import { useEffect } from "react";

const useIndexedDB = (dbName = "MyAppDB", storeName = "users") => {
  let db;

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      };
      request.onsuccess = (event) => {
        db = event.target.result;
        resolve(db);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  };

  const saveUserToIndexedDB = async (data) => {
    await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };

  const getUsersFromIndexedDB = async () => {
    await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };

  useEffect(() => {
    openDB();
  }, []);

  return { saveUserToIndexedDB, getUsersFromIndexedDB };
};

export default useIndexedDB;
