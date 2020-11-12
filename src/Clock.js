import React from 'react';

const Clock = ({ isSession, timeRemaining, colors }) => {
  // Declare all variables needed to display the clock
  const radius = 20;
  const centre = 50;
  const secondRadians = (timeRemaining / 60) * (2 * Math.PI);
  const minuteRadians = (timeRemaining / 60 / 60) * (2 * Math.PI);
  const secDispLenAdjustment = 5;
  const minDispLenAdjustment = 10;
  const secondX =
    Math.sin(secondRadians) * (radius - secDispLenAdjustment) + centre;
  const secondY =
    -Math.cos(secondRadians) * (radius - secDispLenAdjustment) + centre;
  const minuteX =
    Math.sin(minuteRadians) * (radius - minDispLenAdjustment) + centre;
  const minuteY =
    -Math.cos(minuteRadians) * (radius - minDispLenAdjustment) + centre;

  // Convert time remaining into minutes and seconds
  const minutes = Math.floor(timeRemaining / 60).toString();
  const seconds = (timeRemaining % 60).toString();

  const color = colors[0];

  return (
    <div id='full-clock'>
      <div id='timer-label' style={{ color: color }}>
        {isSession ? 'Session' : 'Break'}
      </div>
      <div id='time-left' style={{ color: color }}>
        {minutes.length === 2 ? minutes : `0${minutes}`}:
        {seconds.length === 2 ? seconds : `0${seconds}`}
      </div>
      <div id='svg-container'>
        <svg className='clock' viewBox='25 25 50 50' height='100%'>
          <ellipse
            cx={centre}
            cy={centre}
            rx={radius}
            ry={radius}
            style={{ stroke: color }}
          ></ellipse>
          <ellipse
            cx={centre}
            cy={centre}
            rx='1'
            ry='1'
            style={{ stroke: color }}
          ></ellipse>
          <line
            x1={centre}
            y1={centre}
            x2={secondX}
            y2={secondY}
            style={{ stroke: color }}
          ></line>
          <line
            x1={centre}
            y1={centre}
            x2={minuteX}
            y2={minuteY}
            style={{ stroke: color }}
          ></line>
        </svg>
      </div>
    </div>
  );
};

export default Clock;
