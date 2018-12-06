import React, { useContext } from 'react';
import styled from 'styled-components';
// import LogRocket from 'logrocket';

import { useServiceForContext } from '../../UseMachine';

import { ClockMachineServiceContext } from '../../';

const DigitalClock = styled.time`
  font-size: 4rem;
  font-family: Orbitron, Arial, sans-serif;
  line-height: 1.25;
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
