import React, { Fragment, useMemo } from 'react';
import {
  BaseCSS,
  Container,
  Row,
  Col,
} from 'styled-bootstrap-grid';

import {
  GlobalStyle,
  HeaderDivider,
  ClockControlsBox,
  PageTitle,
  Button,
  UpDown,
  TimeRemaining,
  EmojiWrapper,
  TimeAmountDisplay,
  TimesUp,
  Flex,
} from './Components';

const clockControlsConfig = {
  RUN: { emoji: '🎬', label: 'run clock' },
  RESET: { emoji: '🔄‍', label: 'reset clock' },
  PAUSE: { emoji: '🧘‍', label: 'pause clock' },
  RESUME: { emoji: '🏃', label: 'resume clock' },
  CONTINUE: { emoji: '⏭️', label: 'advance clock' },
  SNOOZE: { emoji: '🛌', label: 'snooze alarm' },
};

export default ({
  state,
  context,
  senders,
  possibleClockEvents,
}) => {
  // Produce an object of { eventName: Fragment, } shape containing a button for each clock control
  const clockControls = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(clockControlsConfig).map(
          ([eventName, data]) => {
            const sender = senders[eventName];

            const { emoji, label } = data;
            return [
              eventName,
              <Fragment key={label}>
                <Button onClick={sender}>
                  <EmojiWrapper label={label}>
                    {emoji}
                  </EmojiWrapper>
                </Button>
              </Fragment>,
            ];
          }
        )
      ),
    [
      clockControlsConfig,
      senders,
      Fragment,
      Button,
      EmojiWrapper,
    ]
  );

  // NOTE: I didn't really like the bootstrap grid system I used here, maybe use a different one.
  return (
    <>
      <GlobalStyle />
      <BaseCSS />
      <Container>
        <header>
          <Row>
            <Col auto>
              {/*  */}
              <PageTitle />
              {/*  */}
            </Col>
          </Row>
        </header>

        <HeaderDivider />

        <main>
          <Row>
            <Col col={11} sm={6}>
              <Flex col>
                {/* TODO: a more semantically beautiful way of placing the TimesUp icon where I want it */}
                <Flex
                  row
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <TimeRemaining
                    minutes={context.time.getMinutes()}
                    seconds={context.time.getSeconds()}
                  />

                  {context.ringing ? <TimesUp /> : null}
                </Flex>
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
                      possibleClockEvents.PAUSE
                    )
                      ? clockControls.PAUSE
                      : clockControls.RESUME}
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
              </Flex>
            </Col>
            <Col auto>
              <Row alignItems="center">
                <Col>
                  <Flex row alignItems="center">
                    {/* Work Minutes  */}
                    <UpDown
                      onUp={senders.INC_WORK_MINS}
                      onDown={senders.DEC_WORK_MINS}
                      upTitle="increase work minutes"
                      downTitle="decrease work minutes"
                    />

                    <TimeAmountDisplay
                      timeAmount={context.workMinutes}
                      labelText="minutes working"
                    />
                    {/*  */}
                  </Flex>
                </Col>
              </Row>
              <Row>
                <Col auto>
                  <Flex row alignItems="center">
                    {/* Break Minutes  */}
                    <UpDown
                      onUp={senders.INC_BREAK_MINS}
                      onDown={senders.DEC_BREAK_MINS}
                      upTitle="increase break minutes"
                      downTitle="decrease break minutes"
                    />

                    <TimeAmountDisplay
                      timeAmount={context.breakMinutes}
                      labelText="minute break"
                    />
                    {/*  */}
                  </Flex>
                </Col>
              </Row>
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
};
