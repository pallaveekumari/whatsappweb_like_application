

// import { useState } from "react";

// const useInstantDB = (baseURL, apiKey) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const saveData = async (endpoint, data) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${baseURL}/${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${apiKey}`, // Include the API key in the headers
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save data to InstantDB");
//       }

//       const result = await response.json();
//       return result;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchData = async (endpoint) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${baseURL}/${endpoint}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${apiKey}`, // Include the API key in the headers
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data from InstantDB");
//       }

//       const result = await response.json();
//       return result;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { saveData, fetchData, loading, error };
// };

// export default useInstantDB;


import { useState } from "react";

const useInstantDB = (baseURL, apiKey) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateApiKey = () => {
    if (!apiKey) {
      console.error("API key is missing. Ensure it is provided in the hook.");
      return false;
    }
    return true;
  };

  const saveData = async (endpoint, data) => {
    if (!validateApiKey()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to save data to InstantDB: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (endpoint) => {
    if (!validateApiKey()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data from InstantDB: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataWithRetry = async (endpoint, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchData(endpoint);
      } catch (err) {
        console.warn(`Retry ${i + 1}/${retries} failed: ${err.message}`);
      }
    }
    throw new Error("All retries to fetch data failed.");
  };

  return {
    saveData,
    fetchData,
    fetchDataWithRetry,
    loading,
    error,
  };
};

export default useInstantDB;
