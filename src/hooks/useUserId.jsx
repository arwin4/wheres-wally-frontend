import { useEffect, useState } from 'react';

export default function useUserId() {
  const [error, setError] = useState('');

  useEffect(() => {
    // userId is persistent across reloads
    if (localStorage.getItem('userId')) return;

    const fetchAndSetToken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/token`);
        if (!response.ok) {
          throw new Error('Unable to fetch user token from API');
        }
        const responseBody = await response.json();
        const token = responseBody.userId;
        localStorage.setItem('userId', token);
        setError(''); // Prevent error state persisting
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAndSetToken();
  }, []);

  return { error };
}
