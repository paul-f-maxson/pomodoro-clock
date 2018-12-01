import React, { useContext, useMemo } from 'react';
import {
  BaseCSS,
  Container,
  Row,
  Col,
} from 'styled-bootstrap-grid';

import {
  GlobalStyle,
  HeaderDivider,
  Box,
  PageTitle,
  Button,
  UpDown,
  TimeRemaining,
  Emoji,
  TimeAmountDisplay,
  TimeAmount,
  Flex,
} from './Components';

import { ClockMachineContext } from '../App';

const possibleEvents = [
  'RUN',
  'RESET',
  'PAUSE',
  'RESUME',
  'CONTINUE',
  'SNOOZE',
  'INC_WORK_MINS',
  'DEC_WORK_MINS',
  'INC_BREAK_MINS',
  'DEC_BREAK_MINS',
];

const eventEmojis = {
  RUN: { emoji: '🎬', label: 'run clock' },
  RESET: { emoji: '🔄‍', label: 'reset clock' },
  PAUSE: { emoji: '🧘‍', label: 'pause clock' },
  RESUME: { emoji: '🏃', label: 'resume clock' },
  CONTINUE: { emoji: '⏭️', label: 'advance clock' },
  SNOOZE: { emoji: '🛌', label: 'snooze alarm' },
  INC_WORK_MINS: undefined,
  DEC_WORK_MINS: undefined,
  INC_BREAK_MINS: undefined,
  DEC_BREAK_MINS: undefined,
};

export default () => {
  const machine = useContext(ClockMachineContext);
  const { state, context, send } = machine;

  const senders = useMemo(
    () => {
      let senders = {};
      possibleEvents.forEach(eventName => {
        senders[eventName] = () => send(eventName);
      });
      return senders;
    },
    [possibleEvents, send]
  );

  const nme = 'RUN';
  console.log(eventEmojis[nme]);
  console.log(senders);

  const availableButtons = state.nextEvents.map(
    eventName => {
      const sender = senders[eventName];
      const eventEmoji = eventEmojis[eventName];

      return eventEmoji !== undefined ? (
        <div key={eventEmoji.label}>
          <Button onClick={sender}>
            <Emoji label={eventEmoji.label}>
              {eventEmoji.emoji}
            </Emoji>
          </Button>
        </div>
      ) : null;
    }
  );

  return (
    <>
      {/* eslint-disable jsx-a11y/accessible-emoji */}
      {/* disabling because rule is followed in the Emoji component */}
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
            <Col auto>
              <TimeRemaining
                minutes={context.time.getMinutes()}
                seconds={context.time.getSeconds()}
              />
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

                    <TimeAmountDisplay>
                      <TimeAmount>
                        {String(
                          context.workMinutes
                        ).padStart(2, '0')}
                      </TimeAmount>{' '}
                      minutes&nbsp;working
                    </TimeAmountDisplay>
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

                    <TimeAmountDisplay>
                      <TimeAmount>
                        {String(
                          context.breakMinutes
                        ).padStart(2, '0')}
                      </TimeAmount>{' '}
                      minute&nbsp;break
                    </TimeAmountDisplay>
                    {/*  */}
                  </Flex>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col auto>
              {/* Clock controls */}
              <Box>
                <Flex>{availableButtons}</Flex>
              </Box>
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
