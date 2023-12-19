import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './styles/SubmitName.css';

export default function SubmitName({
  setSubmitNameVisible,
  setLeaderboardVisible,
}) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    const getUserScore = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await fetch(
          `http://localhost:3000/user/score/${userToken}`,
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

    const response = await fetch(`http://localhost:3000/user/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userToken: localStorage.getItem('userToken'),
        name: e.target.name.value,
      }),
    });

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
