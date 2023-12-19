import React, { useCallback, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { InlineIcon } from '@iconify/react';
import preloadIcons from '../utils/preloadIcons';

// Components
import Canvas from '../components/Canvas';
import Start from '../components/Start';
import Leaderboard from '../components/Leaderboard';
import SubmitName from '../components/SubmitName';
import InfoBar from '../components/InfoBar';

// Hooks
import useUserToken from '../hooks/useUserToken';

// Utils
import markWalliesAsNotFound from '../utils/markWalliesAsNotFound';
import preloadSearchImage from '../utils/preloadSearchImage';
import startTrackingGameDuration from '../utils/startTrackingGameDuration';

// Style
import '../components/styles/App.css';
import InstructionModal from '../components/InstructionModal';

function App() {
  preloadIcons();
  preloadSearchImage();
  useUserToken();

  const [gameOngoing, setGameOngoing] = useState(false);
  const [submitNameVisible, setSubmitNameVisible] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(true);
  const [walliesFound, setWalliesFound] = useState([]);

  const startGame = useCallback(async () => {
    try {
      await Promise.all([markWalliesAsNotFound(), startTrackingGameDuration()]);
      setGameOngoing(true);
    } catch (error) {
      toast.error('Unable to start game.');
    }
  }, []);

  if (submitNameVisible) {
    return (
      <SubmitName
        setSubmitNameVisible={setSubmitNameVisible}
        setLeaderboardVisible={setLeaderboardVisible}
      />
    );
  }

  if (leaderboardVisible) {
    return (
      <Leaderboard
        setGameOngoing={setGameOngoing}
        setLeaderboardVisible={setLeaderboardVisible}
      />
    );
  }

  if (gameOngoing) {
    return (
      <div className="canvas-container">
        <InfoBar walliesFound={walliesFound} />
        <Canvas
          setGameOngoing={setGameOngoing}
          setSubmitNameVisible={setSubmitNameVisible}
          setWalliesFound={setWalliesFound}
        />
        {instructionModalVisible && (
          <InstructionModal
            setInstructionModalVisible={setInstructionModalVisible}
          />
        )}
      </div>
    );
  }

  if (!gameOngoing) {
    return (
      <>
        <div className="game-explanation">
          <h1 className="title">Find the sights!</h1>
          <h2 className="explanation-text">
            It&apos;s like <em>&quot;Where&apos;s Wally?&quot;</em> (AKA{' '}
            <em>&quot;Where&apos;s Waldo?&quot;</em>).
          </h2>
          <h2 className="explanation-text">
            Your mission is to find these three sights in the amusement park:
          </h2>
          <div className="gallery">
            <div className="wally-container">
              <img src="assets/wallies/fountain.png" alt="Fountain" />
              <div className="image-description">Fountain</div>
            </div>{' '}
            <div className="wally-container">
              <img src="assets/wallies/slide.png" alt="Slide" />
              <div className="image-description">Slide</div>
            </div>{' '}
            <div className="wally-container">
              <img
                src="assets/wallies/lonely-island.png"
                alt="Lonely island with person stranded on it"
              />
              <div className="image-description">Lonely island</div>
            </div>
          </div>
          <h2 className="explanation-text">Can you find them all?</h2>
          <Start startGame={startGame} />
          <div className="credit">
            <a
              target="_blank"
              href="https://www.youtube.com/watch?v=BR3kGw_FMOM"
              rel="noreferrer"
            >
              Image credit
              <InlineIcon
                className="external-link-icon"
                icon="pixelarticons:external-link"
                height={15}
              />
            </a>{' '}
            Used with permission.
          </div>
        </div>
        <Toaster />
      </>
    );
  }
}

export default App;
