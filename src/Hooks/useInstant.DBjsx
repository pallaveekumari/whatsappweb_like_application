import { InstantDB } from "instantdb";

const db = new InstantDB({
  projectId: "7221ed1b-9b0d-42f3-9c66-19c64f5e8ee2",
  apiKey: "7221ed1b-9b0d-42f3-9c66-19c64f5e8ee2",
});

export const useInstantDB = () => {
  const getMessages = async (contactId) => {
    return await db.collection("messages").where("contactId", contactId).get();
  };

  const sendMessage = async (message) => {
    await db.collection("messages").add(message);
  };

  return { getMessages, sendMessage };
};
