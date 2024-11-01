import React, { useEffect } from "react";
import { fetchBalances } from "./components/lib/useFetchBalances/useFetchBalances";

const TestPage = () => {
  const fetchData = async () => {
    const result = await fetchBalances();
    console.log("balances assets ", result);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>TestPage</div>;
};

export default TestPage;
