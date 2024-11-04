import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchUserWallets() {
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to manage errors
  const [walletData, setWalletData] = useState<Array<any>>([]); // State to store wallet data

  useEffect(() => {
    const fetchUserWallets = async () => {
      setLoading(true); // Start loading

      try {
        const response = await axios.post(
          "https://api.hero.io/account/GetUserWallets",
          {
            Token: localStorage.getItem("refreshToken"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );

        console.log("Response:", response);
        setWalletData(response.data?.result[0]); // Store wallet data
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch user wallets."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUserWallets(); // Call the fetch function
  }, []); // Empty dependency array to run only once on mount

  return { loading, walletData, error }; // Return the states
}