// // import { useEffect } from "react";

// // const useIndexedDB = (dbName = "MyAppDB", storeName = "users") => {
// //   let db;

// //   const openDB = () => {
// //     return new Promise((resolve, reject) => {
// //       const request = indexedDB.open(dbName, 1);
// //       request.onupgradeneeded = (event) => {
// //         db = event.target.result;
// //         if (!db.objectStoreNames.contains(storeName)) {
// //           db.createObjectStore(storeName, { keyPath: "id" });
// //         }
// //       };
// //       request.onsuccess = (event) => {
// //         db = event.target.result;
// //         resolve(db);
// //       };
// //       request.onerror = (event) => reject(event.target.error);
// //     });
// //   };

// //   const saveUserToIndexedDB = async (data) => {
// //     await openDB();
// //     return new Promise((resolve, reject) => {
// //       const transaction = db.transaction([storeName], "readwrite");
// //       const store = transaction.objectStore(storeName);
// //       const request = store.add(data);

// //       request.onsuccess = () => resolve(request.result);
// //       request.onerror = (event) => reject(event.target.error);
// //     });
// //   };

// //   const getUsersFromIndexedDB = async () => {
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

// //   return { saveUserToIndexedDB, getUsersFromIndexedDB };
// // };

// // export default useIndexedDB;


import { useEffect, useState } from "react";

const useIndexedDB = (dbName = "MyAppDB", storeName = "users") => {
  const [db, setDb] = useState(null);

  // Open the database and set the instance
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onupgradeneeded = (event) => {
        const dbInstance = event.target.result;
        if (!dbInstance.objectStoreNames.contains(storeName)) {
          dbInstance.createObjectStore(storeName, { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        const dbInstance = event.target.result;
        setDb(dbInstance);
        resolve(dbInstance);
      };

      request.onerror = (event) => {
        console.error("Error opening IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  };

  // Save a user to IndexedDB
  const saveUserToIndexedDB = async (data) => {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => {
        console.error("Error saving data to IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  };

  // Fetch all users from IndexedDB
  const getUsersFromIndexedDB = async () => {
    if (!db) await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => {
        console.error("Error fetching data from IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  };

  useEffect(() => {
    openDB();

    // Cleanup function (optional)
    return () => {
      if (db) {
        db.close();
        setDb(null);
      }
    };
  }, []);

  return { saveUserToIndexedDB, getUsersFromIndexedDB };
};

export default useIndexedDB;


// import { useEffect, useState } from "react";

// const useIndexedDB = (dbName = "MyAppDB", defaultStoreName = "users") => {
//   const [db, setDb] = useState(null);

//   // Open the database and set the instance
//   const openDB = () => {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open(dbName, 1);

//       request.onupgradeneeded = (event) => {
//         const dbInstance = event.target.result;
//         if (!dbInstance.objectStoreNames.contains(defaultStoreName)) {
//           dbInstance.createObjectStore(defaultStoreName, { keyPath: "id" });
//         }
//       };

//       request.onsuccess = (event) => {
//         const dbInstance = event.target.result;
//         setDb(dbInstance);
//         resolve(dbInstance);
//       };

//       request.onerror = (event) => {
//         console.error("Error opening IndexedDB:", event.target.error);
//         reject(event.target.error);
//       };
//     });
//   };

//   // Save data to IndexedDB
//   const saveToStore = async (storeName, data) => {
//     if (!db) {
//       console.error("Database is not initialized. Ensure openDB was successful.");
//       return;
//     }
//     return new Promise((resolve, reject) => {
//       const transaction = db.transaction([storeName], "readwrite");
//       const store = transaction.objectStore(storeName);

//       transaction.oncomplete = () => console.log("Transaction completed successfully.");
//       transaction.onerror = (event) => console.error("Transaction error:", event.target.error);

//       const request = store.add(data);
//       request.onsuccess = () => resolve(request.result);
//       request.onerror = (event) => reject(event.target.error);
//     });
//   };

//   // Fetch all data from IndexedDB
//   const fetchAllFromStore = async (storeName) => {
//     if (!db) {
//       console.error("Database is not initialized. Ensure openDB was successful.");
//       return [];
//     }
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

//     return () => {
//       if (db) {
//         db.close();
//         setDb(null);
//       }
//     };
//   }, []);

//   return {
//     saveToStore: (data, storeName = defaultStoreName) => saveToStore(storeName, data),
//     fetchAllFromStore: (storeName = defaultStoreName) => fetchAllFromStore(storeName),
//   };
// };

// export default useIndexedDB;
