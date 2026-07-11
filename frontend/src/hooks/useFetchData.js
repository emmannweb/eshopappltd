import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // calling refetch will force a rerender on the hook
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const value = await fetch(url);
        if (!value.ok) {
          throw new Error("An error occured");
        }
        const res = await value.json();
        setData(res);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [url, shouldRefetch]);

  return {
    data,
    loading,
    error,
    refetch: () => refetch({}),
  };
};

export default useFetchData;
