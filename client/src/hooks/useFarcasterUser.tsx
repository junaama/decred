import { useState, useEffect } from "react";

const useFarcasterUser = (address: string) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.farcaster.xyz/v2/user-by-verification?address=${address}`,
          {
            headers: {
              authorization: `Bearer ${process.env.NEXT_PUBLIC_FARCASTER_KEY}`,
              Accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setUser(data.result.user);
      } catch (err) {
        // @ts-ignore
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [address]);

  return { user, loading, error };
};

export default useFarcasterUser;
