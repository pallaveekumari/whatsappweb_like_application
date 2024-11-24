import { useEffect } from "react";

export const useIndexedDB = () => {
  let db;

  const initDB = () => {
    const request = indexedDB.open("WhatsAppCloneDB", 1);
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => {
      db = event.target.result;
    };
  };

  const saveMessage = (message) => {
    const transaction = db.transaction(["messages"], "readwrite");
    const store = transaction.objectStore("messages");
    store.add(message);
  };

  const getMessages = () => {
    return new Promise((resolve) => {
      const transaction = db.transaction(["messages"], "readonly");
      const store = transaction.objectStore("messages");
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  };

  useEffect(() => {
    initDB();
  }, []);

  return { saveMessage, getMessages };
};
