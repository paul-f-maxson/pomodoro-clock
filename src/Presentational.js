import React, { useContext } from 'react';
import { ClockMachineContext } from './App';

const Presentational = () => {
  const machine = useContext(ClockMachineContext);
  const { state, context, send } = machine;

  return (
    <>
      <button
        onClick={() => {
          send('RUN');
        }}
      >
        RUN
      </button>
      <span>/</span>
      <button
        onClick={() => {
          send('RESET');
        }}
      >
        RESET
      </button>
      <span>|</span>
      <button
        onClick={() => {
          send('PAUSE');
        }}
      >
        PAUSE
      </button>
      <span>/</span>
      <button
        onClick={() => {
          send('RESUME');
        }}
      >
        RESUME
      </button>

      <h2>Current State: {state.toStrings().slice(-1)}</h2>
      <time
        dateTime={`PT${context.time.getMinutes()}M${context.time.getSeconds()}S`}
      >
        {context.time.getMinutes()}:
        {context.time.getSeconds()}
      </time>
      <br />
      <button
        onClick={() => {
          send('CONTINUE');
        }}
      >
        CONTINUE
      </button>
      <span>|</span>
      <button
        onClick={() => {
          send('SNOOZE');
        }}
      >
        SNOOZE
      </button>
      {context.ringing ? (
        <span role="img" aria-label="alarm">
          🚨
        </span>
      ) : null}
      <h2>Work Minutes: {context.workMinutes}</h2>
      <button onClick={() => send('INC_WORK_MINS')}>
        INC
      </button>
      <span>|</span>
      <button onClick={() => send('DEC_WORK_MINS')}>
        DEC
      </button>
      <h2>Break Minutes: {context.breakMinutes}</h2>
      <button onClick={() => send('INC_BREAK_MINS')}>
        INC
      </button>
      <span>|</span>
      <button onClick={() => send('DEC_BREAK_MINS')}>
        DEC
      </button>
    </>
  );
};

export default Presentational;
