import { useEffect, useState } from 'react';

export default function useUserToken() {
  const [error, setError] = useState('');

  useEffect(() => {
    // userToken is persistent across reloads
    if (localStorage.getItem('userToken')) return;

    const fetchAndSetToken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tokens/user`);
        if (!response.ok) {
          throw new Error('Unable to fetch user token from API');
        }
        const responseBody = await response.json();
        const token = responseBody.userToken;
        localStorage.setItem('userToken', token);
        setError(''); // Prevent error state persisting
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAndSetToken();
  }, []);

  return { error };
}
