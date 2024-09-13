import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const res = await fetch(url);
        if (!res.ok) {
          console.error(`Error fetching data. Status: ${res.status}`);
          setIsError(true);
          return;
        }
        const result = await res.json();
        console.log("Fetched data:", result); 
        if (!result.length) { 
          console.error('No definitions found');
          setIsError(true);
        } else {
          setData(result);
          setIsError(false);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setIsError(true);
      } finally {
        setIsLoading(false); 
      }
    };

    if (url) fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useFetch;