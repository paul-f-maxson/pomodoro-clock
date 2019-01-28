import React, { useContext } from 'react';
import styled from 'styled-components';

// Disabling because font implementation is outside the scope of this rule
// eslint-disable-next-line no-unused-vars
import RobotoMono from 'typeface-roboto-mono';

import { ClockMachineServiceContext } from '../../';

import { useServiceForState } from '../../UseMachine';

const StateH2 = styled.h2`
  font-family: RobotoMono, monospace;
  line-height: 0;
`;

export default () => {
  const { service, initialState } = useContext(ClockMachineServiceContext);
  const state = useServiceForState(service, initialState);
  // Get the hierarchical lowest state only
  const lowestState = state
    .toStrings()
    .slice(-1)[0]
    .split('.')
    .slice(-1);

  const displayText = {
    Set: 'READY',
    Working: 'WORK',
    EndofWork: 'ALARM',
    EndofBreak: 'ALARM',
    TakingBreak: 'BREAK',
    Snoozing: 'SNOOZE',
    Paused: 'PAUSE',
  }[lowestState];
  return <StateH2>{displayText}</StateH2>;
};
