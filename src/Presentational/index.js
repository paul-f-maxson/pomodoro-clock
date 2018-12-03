import React from 'react';
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

export default ({ state, context, senders }) => {
  const clockControls = state.nextEvents.map(eventName => {
    const sender = senders[eventName];
    const eventEmoji = clockControlsConfig[eventName];

    return eventEmoji !== undefined ? (
      <div key={eventEmoji.label}>
        <Button onClick={sender}>
          <EmojiWrapper label={eventEmoji.label}>
            {eventEmoji.emoji}
          </EmojiWrapper>
        </Button>
      </div>
    ) : null;
  });

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
                <TimeRemaining
                  minutes={context.time.getMinutes()}
                  seconds={context.time.getSeconds()}
                />
                <ClockControlsBox>
                  <Flex row>{clockControls}</Flex>
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

        {context.ringing ? (
          <span role="img" aria-label="alarm">
            ⌛
          </span>
        ) : null}
        <br />
      </Container>
    </>
  );
};
