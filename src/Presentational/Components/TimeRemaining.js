import React, { useContext } from 'react';
import styled from 'styled-components';

// Disabling because font implementation is outside the scope of this rule
// eslint-disable-next-line no-unused-vars
import PressStart2P from "typeface-press-start-2p";

import { useServiceForContext } from '../../UseMachine';

import { ClockMachineServiceContext } from '../../';

const DigitalClock = styled.time`
  font-size: 3rem;
  font-family: "Press Start 2P", monospace;
  line-height: 1;
`;

export default () => {
  const { service, initialContext } = useContext(
    ClockMachineServiceContext
  );
  const context = useServiceForContext(
    service,
    initialContext
  );
  const { time } = context;

  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return (
    <DigitalClock dateTime={`PT${minutes}M${seconds}S`}>
      {String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </DigitalClock>
  );
};
