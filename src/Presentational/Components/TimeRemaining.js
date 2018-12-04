import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
// import LogRocket from 'logrocket';

import { useService, useSenders } from '../../UseMachine';

import { ClockMachineContext } from '../../';

const DigitalClock = styled.time`
  font-size: 4rem;
  font-family: Orbitron, Arial, sans-serif;
  line-height: 1.25;
`;

export default () => {
  const machine = useContext(ClockMachineContext);
  const { context, service } = useService(machine);
  const { time } = context;

  const { send } = service;

  const senders = useSenders(send);

  // TODO: Implement the ticker inside the machine
  // Set interval to send TICK event every second
  useEffect(
    () => {
      const ticker = setInterval(() => {
        senders.TICK();
      }, 1000);

      return () => {
        clearInterval(ticker);
      };
    },
    [send]
  );

  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return (
    <DigitalClock dateTime={`PT${minutes}M${seconds}S`}>
      {String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </DigitalClock>
  );
};
