import { useEffect, useState } from 'react';

export default function setSessionToken() {
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAndSetToken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tokens/session`);
        if (!response.ok) {
          throw new Error('Unable to fetch user token from API');
        }
        const responseBody = await response.json();
        const token = responseBody.sessionToken;
        localStorage.setItem('sessionToken', token);
        setError(''); // Prevent error state persisting
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAndSetToken();
  }, []);

  return { error };
}
