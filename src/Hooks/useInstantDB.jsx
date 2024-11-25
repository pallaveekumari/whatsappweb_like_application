

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
