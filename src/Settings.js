import React from 'react';
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = (props) => {
  return (
    <div id='settings'>
      <SingleSetting
        type='session'
        time={props.sessionLengths[0]}
        incrementTime={props.incrementTime}
        decrementTime={props.decrementTime}
        colors={props.colors}
      />
      <SingleSetting
        type='break'
        time={props.sessionLengths[1]}
        incrementTime={props.incrementTime}
        decrementTime={props.decrementTime}
        colors={props.colors}
      />
    </div>
  );
};

const SingleSetting = (props) => {
  const [textColor, borderColor, backgroundColor] = props.colors;

  return (
    <div className='single-setting box' style={{ borderColor: borderColor }}>
      <div className='settings-label' style={{ color: textColor }}>
        {props.type[0].toUpperCase() + props.type.substring(1)} Length
      </div>
      <div className='controls'>
        <button
          className='btn settings-btn'
          style={{ color: textColor, background: backgroundColor }}
          onClick={() => props.decrementTime(props.type)}
        >
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </button>
        <div style={{ color: textColor }}>
          {props.time / 60 < 10
            ? `${'\u00A0'} ${props.time / 60}`
            : props.time / 60}
        </div>
        <button
          className='btn settings-btn'
          style={{ color: textColor, background: backgroundColor }}
          onClick={() => props.incrementTime(props.type)}
        >
          <FontAwesomeIcon icon={faAngleDoubleUp} />
        </button>
      </div>
    </div>
  );
};

export default Settings;
