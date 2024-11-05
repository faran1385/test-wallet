import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchBalances(payload: any,type:any) {
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      setError(null);

      const walletId = localStorage.getItem("walletId");
      const jwtToken = localStorage.getItem("jwtToken");
      const storedAssets = localStorage.getItem("userAssets");

      if (!storedAssets || !walletId || !jwtToken) {
        setError("Required data not found in localStorage.");
        setLoading(false);
        return;
      }
      console.log("pa", payload);
      try {
        const response = await axios.post(
          "https://api.hero.io/account/GetTotalBalance",
          payload,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );

        setBalances(response.data?.result);
        console.log("All balance data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching balance data:", error);
        setError("Error fetching balance data.");
      } finally {
        setLoading(false);
      }
    };

    type != "manage" && fetchBalances();
  }, []);

  return { loading, balances, error };
}
