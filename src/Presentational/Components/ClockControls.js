import React, { useContext } from 'react';

import styled, { css, keyframes } from 'styled-components';

import { Play, Pause, PowerOff } from 'styled-icons/fa-solid';
import { Snooze } from 'styled-icons/material';

import { ThinBox, Button, Flex } from './Universal';

import { ClockMachineServiceContext, SendersContext } from '../../';

import { useServiceForState } from '../../UseMachine';

const glow = css`
  animation: ${keyframes`
    from {
      color: black;
    }
    to {
      color: limegreen;
    }
  `} 1s ease-in-out infinite alternate;
`;

const withButton = Component => ({ onClick, ...props }) => (
  <Button onClick={onClick}>
    <Component {...props} />
  </Button>
);

const withDisabledStyle = Component => styled(Component)`
  filter: ${({ disabled }) => (disabled ? 'opacity(0.4)' : null)};
`;

const Power = styled(PowerOff)`
  ${({ powerOn }) => (powerOn ? glow : null)};
`;

const PowerButton = withButton(Power);
PowerButton.defaultProps = { size: 25 };

const PauseButton = withDisabledStyle(withButton(Pause));
PauseButton.defaultProps = { size: 25 };

const PlayButton = withDisabledStyle(withButton(Play));
PlayButton.defaultProps = { size: 25 };

const SnoozeButton = withDisabledStyle(withButton(Snooze));
SnoozeButton.defaultProps = { size: 29 };

const derivedStates = {
  Set: {
    power: { powerOn: false, event: 'RUN', title: 'run clock' },
    pause: { disabled: true },
    play: { disabled: false, event: 'RUN', title: 'run clock' },
    snooze: { disabled: true },
  },
  Paused: {
    power: { powerOn: true, event: 'RESET', title: 'reset clock' },
    pause: { disabled: true },
    play: { disabled: false, event: 'RESUME', title: 'resume clock' },
    snooze: { disabled: true },
  },
  Snoozing: {
    power: { powerOn: true, event: 'RESET', title: 'reset clock' },
    pause: { disabled: false, event: 'PAUSE', title: 'pause clock' },
    play: { disabled: false, event: 'CONTINUE', title: 'advance clock' },
    snooze: { disabled: true },
  },
  'Running.Working': {
    power: { powerOn: true, event: 'RESET', title: 'reset clock' },
    pause: { disabled: false, event: 'PAUSE', title: 'pause clock' },
    play: { disabled: true },
    snooze: { disabled: true },
  },
  'Running.EndofWork': {
    power: { powerOn: true, event: 'RESET', title: 'reset clock' },
    pause: { disabled: false, event: 'PAUSE', title: 'pause clock' },
    play: { disabled: false, event: 'CONTINUE', title: 'advance clock' },
    snooze: { disabled: false, event: 'SNOOZE', title: 'snooze alarm' },
  },
  'Running.TakingBreak': {
    power: { powerOn: true, event: 'RESET', title: 'reset clock' },
    pause: { disabled: false, event: 'PAUSE', title: 'pause clock' },
    play: { disabled: true },
    snooze: { disabled: true },
  },
  'Running.EndofBreak': {
    power: { powerOn: true, event: 'RESET', title: 'reset clock' },
    pause: { disabled: false, event: 'PAUSE', title: 'pause clock' },
    play: { disabled: false, event: 'CONTINUE', title: 'advance clock' },
    snooze: { disabled: false, event: 'SNOOZE', title: 'snooze alarm' },
  },
};

export default () => {
  const { service, initialState } = useContext(ClockMachineServiceContext);
  const senders = useContext(SendersContext);

  const state = useServiceForState(service, initialState);

  // Determine the desired state of the controls based on the state of the machine
  const { power, pause, play, snooze } = derivedStates[
    Object.keys(derivedStates).filter(state.matches.bind(state))[0]
  ];

  return (
    <ThinBox width="12.5rem" >
      <Flex>
        <PowerButton {...power} onClick={senders[power.event]} />
        <PauseButton {...pause} onClick={senders[pause.event]} />
        <PlayButton {...play} onClick={senders[play.event]} />
        <SnoozeButton {...snooze} onClick={senders[snooze.event]} />
      </Flex>
    </ThinBox>
  );
};
