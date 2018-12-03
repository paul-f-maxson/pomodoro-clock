import React, { useMemo, Fragment } from 'react';
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

export default ({ state, context, senders }) => {
  // entries the config, map it to make a [key, component] array, Map that back into an object
  const clockControls = useMemo(() =>
    Object.entries(clockControlsConfig).map(
      ([eventName, data]) => {
        const sender = senders[eventName];

        const { emoji, label } = data;
        return (
          <Fragment key={label}>
            <Button onClick={sender}>
              <EmojiWrapper label={label}>
                {emoji}
              </EmojiWrapper>
            </Button>
          </Fragment>
        );
      }
    )
  );

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
      </Container>
    </>
  );
};
