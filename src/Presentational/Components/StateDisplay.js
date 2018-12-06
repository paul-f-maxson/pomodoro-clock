import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { Flex, Button, EmojiWrapper } from './Universal';

import { eventNames as possibleClockEvents } from '../../PomodoroClockMachine';

import { ClockMachineServiceContext } from '../../';

import { useServiceForState } from '../../UseMachine';

export default () => {
  const { service, initialState } = useContext(
    ClockMachineServiceContext
  );
  const state = useServiceForState(service, initialState);

  return <h2>{state.toStrings()}</h2>;
};
