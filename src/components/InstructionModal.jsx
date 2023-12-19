import React from 'react';
import PropTypes from 'prop-types';

export default function InstructionModal({ setInstructionModalVisible }) {
  return (
    <div className="instruction-modal modal">
      <div className="instruction-modal-text">
        Move the image by clicking and dragging. When you&apos;ve found one of
        the sights, click on it. Good luck!
      </div>
      <button
        type="button"
        className="close-modal button"
        onClick={() => setInstructionModalVisible(false)}
      >
        OK!
      </button>
    </div>
  );
}

InstructionModal.propTypes = {
  setInstructionModalVisible: PropTypes.func.isRequired,
};
