import { useState, useEffect } from 'react';

const useMintKudos = (address: string) => {
  const [kudos, setKudos] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://sandbox-api.mintkudos.xyz/v1/wallets/${address}/tokens`);
        const data = await response.json();
        setKudos(data.data);
      } catch (err) {
        // @ts-ignore
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [address]);

  return { kudos, loading, error };
};

export default useMintKudos;
