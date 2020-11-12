import React from 'react';
import accurateInterval from './accurateInterval.js';
import Clock from './Clock.js';
import Settings from './Settings.js';
import Controls from './Controls.js';
import './App.css';

// Set defaults
const defaultSessionTime = 1500;
const defaultBreakTime = 300;
const sessionColors = ['#3a0ca3', '#f4362a', '#FFFAFA'];
const breakColors = ['#FFFAFA', '#DE741C', '#593E67'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.alarm = React.createRef();
    this.body = React.createRef();
    this.state = {
      isRunning: false,
      timeRemaining: defaultSessionTime,
      isSession: true,
      sessionLengths: [defaultSessionTime, defaultBreakTime],
      sessionReference: 0,
      timerId: { cancel: () => {} },
      colors: [sessionColors, breakColors],
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.progressTime = this.progressTime.bind(this);
    this.incrementTime = this.incrementTime.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.reset = this.reset.bind(this);
  }

  progressTime() {
    this.setState((state) => {
      return { timeRemaining: state.timeRemaining - 1 };
    });
    if (this.state.timeRemaining === 0) {
      this.switchSession();
    }
  }

  toggleTimer() {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true,
        timerId: accurateInterval(this.progressTime, 1000),
      });
    } else {
      this.state.timerId.cancel();

      // If the alarm is playing, stop and reset it
      this.alarm.current.pause();
      this.alarm.current.currentTime = 0;

      this.setState({
        isRunning: false,
        timerId: { cancel: () => {} },
      });
    }
  }

  switchSession() {
    this.alarm.current.play();

    let sessionRef = 1 - this.state.sessionReference;
    document.body.style.backgroundColor = this.state.colors[sessionRef][2];
    this.setState({
      isSession: !this.state.isSession,
      timeRemaining: this.state.sessionLengths[sessionRef],
      sessionReference: sessionRef,
    });
  }

  incrementTime(type) {
    if (type === 'session') {
      let updatedTime = this.state.sessionLengths[0] + 60;
      if (updatedTime <= 3600) {
        this.setState({
          sessionLengths: [updatedTime, this.state.sessionLengths[1]],
        });
      }
      if (this.state.isSession) {
        this.setState({
          timeRemaining: updatedTime,
        });
      }
    } else {
      let updatedTime = this.state.sessionLengths[1] + 60;
      if (updatedTime <= 3600) {
        this.setState({
          sessionLengths: [this.state.sessionLengths[0], updatedTime],
        });
      }
    }
  }

  decrementTime(type) {
    if (type === 'session') {
      let updatedTime = this.state.sessionLengths[0] - 60;
      if (updatedTime > 0) {
        this.setState({
          sessionLengths: [updatedTime, this.state.sessionLengths[1]],
        });
        if (this.state.isSession) {
          this.setState({
            timeRemaining: updatedTime,
          });
        }
      }
    } else {
      let updatedTime = this.state.sessionLengths[1] - 60;
      if (updatedTime > 0) {
        this.setState({
          sessionLengths: [this.state.sessionLengths[0], updatedTime],
        });
      }
    }
  }

  reset() {
    this.state.timerId.cancel();
    document.body.style.backgroundColor = this.state.colors[0][2];
    this.setState({
      isRunning: false,
      sessionLengths: [defaultSessionTime, defaultBreakTime],
      colorReference: 0,
      timerId: { cancel: () => {} },
      timeRemaining: defaultSessionTime,
      sessionReference: 0,
    });
  }
  render() {
    return (
      <main id='timer'>
        <Settings
          sessionLengths={this.state.sessionLengths}
          incrementTime={this.incrementTime}
          decrementTime={this.decrementTime}
          colors={this.state.colors[this.state.sessionReference]}
        />
        <Clock
          isSession={this.state.isSession}
          timeRemaining={this.state.timeRemaining}
          colors={this.state.colors[this.state.sessionReference]}
        />
        <Controls
          toggleTimer={this.toggleTimer}
          reset={this.reset}
          colors={this.state.colors[this.state.sessionReference]}
        />
        <audio
          id='beep'
          src='https://lizardspomodorosounds.s3.eu-west-2.amazonaws.com/gong.wav'
          ref={this.alarm}
        />
      </main>
    );
  }
}

export default App;
