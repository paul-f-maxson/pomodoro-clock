import React, { useContext } from 'react';
import styled from 'styled-components';
import { ClockMachineContext } from './App';

const Button = styled.button`
  background: white;
  color: green;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Emoji = styled.span`
  font-size: x-large;
`;

const EmojiButton = props => (
  <Button onClick={props.onClick}>
    <Emoji role="img" aria-label={props.label}>
      {props.emoji}
    </Emoji>
  </Button>
);

const Presentational = () => {
  const machine = useContext(ClockMachineContext);
  const { state, context, send } = machine;
  var senders = {};
  [
    'RUN',
    'RESET',
    'PAUSE',
    'RESUME',
    'CONTINUE',
    'SNOOZE',
    'INC_WORK_MINS',
    'DEC_WORK_MINS',
    'INC_BREAK_MINS',
    'DEC_BREAK_MINS',
  ].forEach(eventName => {
    senders[eventName] = () => send(eventName);
  });
  return (
    <>
      <Emoji label="pomodoro clock">🍎 ⏳ ⏰</Emoji>

      <EmojiButton
        onClick={senders.RUN}
        emoji={'🍎  🎬'}
        label="run clock"
      />
      <span> / </span>
      <EmojiButton
        onClick={senders.RESET}
        emoji={'🍎❗🔄‍'}
        label="reset clock"
      />
      <span> | </span>
      <EmojiButton
        onClick={senders.PAUSE}
        emoji={'🍎 🧘‍'}
        label="pause clock"
      />
      <span>/</span>
      <EmojiButton
        onClick={senders.RESUME}
        emoji={'🍎 🏃'}
        label="resume clock"
      />

      <h2>Current State: {state.toStrings().slice(-1)}</h2>
      <time
        dateTime={`PT${context.time.getMinutes()}M${context.time.getSeconds()}S`}
      >
        {context.time.getMinutes()}:
        {context.time.getSeconds()}
      </time>
      <br />
      <EmojiButton
        onClick={senders.CONTINUE}
        emoji={'🍎  ⏭️'}
        label="advance clock"
      />
      <span>|</span>
      <EmojiButton
        onClick={senders.SNOOZE}
        emoji={'🛌  💤'}
        label="snooze clock"
      />
      {context.ringing ? (
        <span role="img" aria-label="alarm">
          ⌛ 🚨 🔔
        </span>
      ) : null}
      <br />
      <Emoji label="controls">🎛️</Emoji>
      <h2>Work Minutes: {context.workMinutes}</h2>
      <EmojiButton
        onClick={senders.INC_WORK_MINS}
        emoji={'🔺'}
        label="increase work minutes"
      />
      <span>|</span>
      <EmojiButton
        onClick={senders.DEC_WORK_MINS}
        emoji={'🔻'}
        label="decrease work minutes"
      />
      <h2>Break Minutes: {context.breakMinutes}</h2>
      <EmojiButton
        onClick={senders.INC_BREAK_MINS}
        emoji={'🔺'}
        label="increase break minutes"
      />
      <span>|</span>
      <EmojiButton
        onClick={senders.DEC_BREAK_MINS}
        emoji={'🔻'}
        label="decrease break minutes"
      />
    </>
  );
};

export default Presentational;
