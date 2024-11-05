import axios from "axios";
import { useEffect, useState } from "react";

const useFetchAssets = (payload: any) => {
  const [assets, setAssets] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        "https://api.hero.io/Assets/GetAll",
        payload,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setAssets(response.data?.result?.list);
      console.log("tes", response.data?.result?.list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { assets, loading, error };
};

export default useFetchAssets;
