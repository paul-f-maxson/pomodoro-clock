import React, { useContext } from 'react';
import styled from 'styled-components';

import { CaretSquareUp } from 'styled-icons/fa-regular/CaretSquareUp';
import { CaretSquareDown } from 'styled-icons/fa-regular/CaretSquareDown';

import { Flex, Button } from './Universal';

import {
  ClockMachineServiceContext,
  SendersContext,
} from '../../';

import { useServiceForContext } from '../../UseMachine';

import { eventNames as possibleClockEvents } from '../../PomodoroClockMachine';

// TIME AMOUNTS CONTROLS

const makeUpDown = (
  sendersKeyForUp,
  sendersKeyForDown,
  upTitle,
  downTitle
) => () => {
  const senders = useContext(SendersContext);
  const onUp = senders[sendersKeyForUp];
  const onDown = senders[sendersKeyForDown];

  return (
    <Flex col>
      <Button noBox onClick={onUp}>
        <CaretSquareUp size="20" title={upTitle} />
      </Button>
      <Button noBox onClick={onDown}>
        <CaretSquareDown size="20" title={downTitle} />
      </Button>
    </Flex>
  );
};

const WorkMinutesUpDown = makeUpDown(
  possibleClockEvents.INC_WORK_MINS,
  possibleClockEvents.DEC_WORK_MINS,
  'increase work minutes',
  'decrease work minutes'
);
const BreakMinutesUpDown = makeUpDown(
  possibleClockEvents.INC_BREAK_MINS,
  possibleClockEvents.DEC_BREAK_MINS,
  'increase break minutes',
  'decrease break minutes'
);

////////////////////////////////////////////////////////////////////////////////
// TIME AMOUNTS

// TIME AMOUNTS

const TimeAmountSpan = styled.span`
  font-family: Arial;
  font-weight: bold;
  font-size: 3.4rem;
`;

// Factory for the number-of-minutes components
const makeTimeAmount = machineContextKey => () => {
  const { service, initialContext } = useContext(
    ClockMachineServiceContext
  );
  const context = useServiceForContext(
    service,
    initialContext
  );
  return (
    <TimeAmountSpan>
      {String(context[machineContextKey]).padStart(2, '0')}
    </TimeAmountSpan>
  );
};

const WorkMinutesAmount = makeTimeAmount('workMinutes');
const BreakMinutesAmount = makeTimeAmount('breakMinutes');

// TIME AMOUNTS LABELS

const makeVerticalWords = text => {
  const words = String(text)
    .split(' ')
    .map((word, i) => (
      <span key={`${i}-${word}`}>{word}</span>
    ));

  return () => <Flex col>{words}</Flex>;
};

const TimeAmountLabel = styled.div`
  font-family: Arial;
  font-weight: bold;
  font-size: 1.4rem;
`;

const makeTimeAmountLabel = text => {
  const VerticalWords = makeVerticalWords(text);
  return () => (
    <TimeAmountLabel>
      <VerticalWords />
    </TimeAmountLabel>
  );
};

const WorkMinutesLabel = makeTimeAmountLabel(
  'minutes working'
);
const BreakMinutesLabel = makeTimeAmountLabel(
  'minute break'
);

// TIME AMOUNTS DISPLAY

const makeTimeAmountDisplay = (
  UpDown,
  TimeAmount,
  TimeAmountLabel
) => () => (
  <Flex row alignItems="center">
    <UpDown />
    <Flex remBetweenKids={0.2} row>
      <TimeAmount />
      <TimeAmountLabel />
    </Flex>
  </Flex>
);

export const WorkMinutes = makeTimeAmountDisplay(
  WorkMinutesUpDown,
  WorkMinutesAmount,
  WorkMinutesLabel
);
export const BreakMinutes = makeTimeAmountDisplay(
  BreakMinutesUpDown,
  BreakMinutesAmount,
  BreakMinutesLabel
);
