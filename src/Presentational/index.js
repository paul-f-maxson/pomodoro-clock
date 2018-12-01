import React, { useContext } from 'react';
import {
  BaseCSS,
  Container,
  Row,
  Col,
} from 'styled-bootstrap-grid';

import {
  GlobalStyle,
  HeaderDivider,
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

export default () => {
  const machine = useContext(ClockMachineContext);
  const { state, context, send } = machine;

  let senders = {};
  [
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
  ].forEach(eventName => {
    senders[eventName] = () => send(eventName);
  });

  return (
    <>
      {/* eslint-disable jsx-a11y/accessible-emoji */}
      {/* disabling because rule is followed in the Emoji component */}
      <GlobalStyle />
      <BaseCSS />
      <Container>
        <Row>
          <Col auto>
            <header>
              {/*  */}
              <PageTitle />
              {/*  */}
            </header>
          </Col>
        </Row>

        <HeaderDivider />

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
                      {String(context.workMinutes).padStart(
                        2,
                        '0'
                      )}
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

        <Button onClick={senders.RUN} label="run clock">
          <Emoji>🎬</Emoji>
        </Button>
        <span> / </span>
        <Button onClick={senders.RESET} label="reset clock">
          <Emoji>🔄‍</Emoji>
        </Button>
        <span> | </span>
        <Button onClick={senders.PAUSE} label="pause clock">
          <Emoji>🧘‍</Emoji>
        </Button>
        <span>/</span>
        <Button
          onClick={senders.RESUME}
          label="resume clock"
        >
          <Emoji>🏃</Emoji>
        </Button>

        <h2>
          Current State: {state.toStrings().slice(-1)}
        </h2>
        <br />
        <Button
          onClick={senders.CONTINUE}
          label="advance clock"
        >
          <Emoji>⏭️</Emoji>
        </Button>
        <span>|</span>
        <Button
          onClick={senders.SNOOZE}
          label="snooze clock"
        >
          <Emoji>🛌</Emoji>
        </Button>
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
