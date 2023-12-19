import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './styles/Leaderboard.css';

export default function Leaderboard({ setGameOngoing, setLeaderboardVisible }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/leaderboard`, {
          method: 'GET',
        });
        const responseBody = await response.json();
        setLeaderboard(responseBody);
        setLoading(false);
        setError('');
      } catch (err) {
        setError('Unable to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };
    getLeaderboard();
  }, []);

  if (loading) return <>Loading...</>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="main">
      <h1>Leaderboard</h1>
      <button
        type="button"
        className="button"
        onClick={() => {
          setGameOngoing(false);
          setLeaderboardVisible(false);
        }}
      >
        Back to start
      </button>
      <div className="leaderboard">
        {leaderboard.map((user) => (
          <div
            className={`user-wrapper ${
              user.userId === localStorage.getItem('userToken')
                ? 'highlight-user'
                : ''
            }`}
            key={user.key}
          >
            <div className="user-name">{user.name}</div>{' '}
            <div className="user-score">{user.durationFormatted}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Leaderboard.propTypes = {
  setGameOngoing: PropTypes.func.isRequired,
  setLeaderboardVisible: PropTypes.func.isRequired,
};
