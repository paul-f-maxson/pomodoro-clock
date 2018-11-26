import React, { Component } from 'react';
import clockMachine from './ClockMachine';
import { interpret } from 'xstate/lib/interpreter';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    current: clockMachine.initialState,
  };

  service = interpret(clockMachine).onTransition(current =>
    this.setState({ current })
  );

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render() {
    const { current } = this.state;
    const { context } = current;
    const { send } = this.service;

    return (
      <>
        <button onClick={() => send('RUN')}>RUN</button>
        <button onClick={() => send('RESET')}>RESET</button>
        <h2>Current States: {current.toStrings()}</h2>
        <h2>Work Minutes: {context.workMinutes}</h2>
        <button onClick={() => send('INC_WORK_MINS')}>
          INC
        </button>
        <button onClick={() => send('DEC_WORK_MINS')}>
          DEC
        </button>
        <h2>Break Minutes: {context.breakMinutes}</h2>
        <button onClick={() => send('INC_BREAK_MINS')}>
          INC
        </button>
        <button onClick={() => send('DEC_BREAK_MINS')}>
          DEC
        </button>
      </>
    );
  }
}

export default App;
