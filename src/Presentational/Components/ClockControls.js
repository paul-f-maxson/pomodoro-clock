import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { Flex, Button, EmojiWrapper } from './Universal';

import { eventNames as possibleClockEvents } from '../../PomodoroClockMachine';

import {
  ClockMachineServiceContext,
  SendersContext,
} from '../../';

import { useServiceForState } from '../../UseMachine';

const ClockControlsBox = styled.div`
  border: 0.1rem solid darkgray;
  border-radius: 0.1rem;
  padding: 0.5rem;
  margin: 0 0 0.3rem 0;
  width: 11rem;
`;

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

<<<<<<< HEAD
    const state = useServiceForState(service, initialState);
    return (
      <ClockControlsBox>
        <Flex row>
          {/* TODO: I would really like this to only render eg, the reset control if nextEvents includes RESET, but to implement it using this logic would be a nightmare */}
          {/* TODO: I would also like to just automatically render the buttons for all of the available events, but I want to preserve the order of the buttons and I want to semantically show that e.g. RUN and RESET use the same physical space */}
          {state.nextEvents.includes(
            possibleClockEvents.RUN
          )
            ? clockControls.RUN
            : clockControls.RESET}
          {state.nextEvents.includes(
            possibleClockEvents.RESUME
          )
            ? clockControls.RESUME
            : clockControls.PAUSE}
          {state.nextEvents.includes(
            possibleClockEvents.CONTINUE
          )
            ? clockControls.CONTINUE
            : null}
          {state.nextEvents.includes(
            possibleClockEvents.SNOOZE
          )
            ? clockControls.SNOOZE
            : null}
        </Flex>
      </ClockControlsBox>
    );
  };
})(clockControlsConfig);
=======
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
    <ClockControlsBox>
      <Flex row>
        <RunResetControl nextEvents={nextEvents} />
        <PauseResumeControl nextEvents={nextEvents} />
        <ContinueControl nextEvents={nextEvents} />
        <SnoozeControl nextEvents={nextEvents} />
      </Flex>
    </ClockControlsBox>
  );
};
>>>>>>> develop
