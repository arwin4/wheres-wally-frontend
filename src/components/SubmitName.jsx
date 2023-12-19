import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './styles/SubmitName.css';

export default function SubmitName({
  setSubmitNameVisible,
  setLeaderboardVisible,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    const getUserScore = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(
          `https://arwin-wheres-wally-backend.fly.dev/user/${userId}/score`,
          {
            method: 'GET',
          },
        );

        const responseBody = await response.json();
        setScore(responseBody.formattedScore);
        setLoading(false);
        setError('');
      } catch (err) {
        setError('Unable to fetch user score');
      } finally {
        setLoading(false);
      }
    };
    getUserScore();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem('userId');
    const response = await fetch(
      `https://arwin-wheres-wally-backend.fly.dev/user/${userId}/name`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: e.target.name.value,
        }),
      },
    );

    if (response.status !== 200) {
      setError('Sorry, unable to save your name.');
    } else {
      setError('');
      setSubmitNameVisible(false);
      setLeaderboardVisible(true);
    }
  }

  if (loading) return <div className="loading main">Loading...</div>;

  return (
    <div className="submit-name main">
      <h1>Congrats! You found them all!</h1>
      <h2 className="text">
        It took you <em>{score}</em>.
      </h2>
      <h2 className="text">
        Enter your name to get your score on the public leaderboard.
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Your name:
            <input type="text" id="name" name="name" maxLength="100" required />
          </label>
        </div>
        <button type="submit" className="submit button">
          Submit
        </button>
      </form>
      <div className="error">{error}</div>
      <button
        type="button"
        className="no-save button"
        onClick={() => {
          setError('');
          setSubmitNameVisible(false);
          setLeaderboardVisible(true);
        }}
      >
        Go to the leaderboard without saving my name
      </button>
    </div>
  );
}

SubmitName.propTypes = {
  setSubmitNameVisible: PropTypes.func.isRequired,
  setLeaderboardVisible: PropTypes.func.isRequired,
};
