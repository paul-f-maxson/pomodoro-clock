import React, { Fragment, useContext } from 'react';

import {
  Flex,
  Button,
  EmojiWrapper,
  ThinBox,
} from './Universal';

import { eventNames as possibleClockEvents } from '../../PomodoroClockMachine';

import {
  ClockMachineServiceContext,
  SendersContext,
} from '../../';

import { useServiceForState } from '../../UseMachine';

const clockControlsConfig = {
  RUN: { emoji: '🎬', label: 'run clock' },
  RESET: { emoji: '🔄‍', label: 'reset clock' },
  PAUSE: { emoji: '🧘‍', label: 'pause clock' },
  RESUME: { emoji: '🏃', label: 'resume clock' },
  CONTINUE: { emoji: '⏭️', label: 'advance clock' },
  SNOOZE: { emoji: '🛌', label: 'snooze alarm' },
};

const clockControls = Object.fromEntries(
  Object.entries(clockControlsConfig).map(
    ([eventName, data]) => {
      const { emoji, label } = data;

      const ClockControl = () => {
        const senders = useContext(SendersContext);
        const sender = senders[eventName];

        return (
          <Fragment key={label}>
            <Button onClick={sender}>
              <EmojiWrapper label={label}>
                {emoji}
              </EmojiWrapper>
            </Button>
          </Fragment>
        );
      };
      return [eventName, <ClockControl />];
    }
  )
);

const EmptyButton = () => <Button />;

const makeDualOptionalControl = (...args) => props => {
  const [optionAKey, optionBKey] = args;
  const { nextEvents } = props;
  const containsOptionA = nextEvents.includes(
    possibleClockEvents[optionAKey]
  );
  const containsOptionB = nextEvents.includes(
    possibleClockEvents[optionBKey]
  );

  if (containsOptionA && containsOptionB) {
    throw new Error(
      `${optionAKey} and ${optionBKey} should not be accessible at the same time.`
    );
  }

  return containsOptionA
    ? clockControls[optionAKey]
    : containsOptionB
    ? clockControls[optionBKey]
    : EmptyButton;
};

const makeOptionalControl = optionKey => props => {
  const { nextEvents } = props;
  const containsOption = nextEvents.includes(
    possibleClockEvents[optionKey]
  );

  return containsOption
    ? clockControls[optionKey]
    : EmptyButton;
};

// MAKE CONTROLS
const RunResetControl = makeDualOptionalControl(
  possibleClockEvents.RUN,
  possibleClockEvents.RESET
);
const PauseResumeControl = makeDualOptionalControl(
  possibleClockEvents.PAUSE,
  possibleClockEvents.Resume
);

const ContinueControl = makeOptionalControl(
  possibleClockEvents.CONTINUE
);
const SnoozeControl = makeOptionalControl(
  possibleClockEvents.SNOOZE
);

export default () => {
  const { service, initialState } = useContext(
    ClockMachineServiceContext
  );

  const state = useServiceForState(service, initialState);
  const { nextEvents } = state;
  return (
    <ThinBox width="11rem">
      <Flex row alignItems="flex-end">
        <RunResetControl nextEvents={nextEvents} />
        <PauseResumeControl nextEvents={nextEvents} />
        <ContinueControl nextEvents={nextEvents} />
        <SnoozeControl nextEvents={nextEvents} />
      </Flex>
    </ThinBox>
  );
};
