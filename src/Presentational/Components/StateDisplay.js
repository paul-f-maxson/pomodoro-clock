import React, { useContext } from 'react';
import styled from 'styled-components';

import { Flex, ThinBox } from './Universal';

import { ClockMachineServiceContext } from '../../';

import { useServiceForState } from '../../UseMachine';

const StateH2 = styled.h2`
  font-family: 'Roboto Mono', monospace;
  line-height: 0;
`;

export default () => {
  const { service, initialState } = useContext(
    ClockMachineServiceContext
  );
  const state = useServiceForState(service, initialState);
  // Get the hierarchical lowest state only
  const lowestState = state
    .toStrings()
    .slice(-1)[0]
    .split('.')
    .slice(-1);

  const displayText = {
    Set: 'SET',
    Working: 'WRK',
    EndofWork: 'END',
    EndofBreak: 'END',
    TakingBreak: 'BRK',
    Snoozing: 'SNZ',
    Paused: 'PSE',
  }[lowestState];
  return (
    <ThinBox>
      <Flex>
        <StateH2>{displayText}</StateH2>
      </Flex>
    </ThinBox>
  );
};
