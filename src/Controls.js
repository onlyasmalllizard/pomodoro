import React from 'react';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Controls = (props) => {
  const textColor = props.colors[0];
  const borderColor = props.colors[1];
  const backgroundColor = props.colors[2];

  return (
    <div className='box controls-box' style={{ borderColor: borderColor }}>
      <button
        id='start_stop'
        className='btn controls-btn'
        style={{ color: textColor, background: backgroundColor }}
        onClick={() => props.toggleTimer()}
      >
        <FontAwesomeIcon icon={faPlay} /> / <FontAwesomeIcon icon={faPause} />
      </button>
      <button
        className='btn controls-btn'
        style={{ color: textColor, background: backgroundColor }}
        onClick={() => props.reset()}
      >
        <FontAwesomeIcon icon={faRedoAlt} flip='horizontal' />
      </button>
    </div>
  );
};

export default Controls;
