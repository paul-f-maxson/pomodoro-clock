import React, { useContext } from 'react';
import {
  BaseCSS,
  Container,
  Row,
  Col,
} from 'styled-bootstrap-grid';
import {
  GlobalStyle,
  Box,
  PageTitle,
  Button,
  DigitalClock,
  Emoji,
  TimeAmountDisplay,
} from './Components';
import { ClockMachineContext } from '../App';

export default () => {
  const machine = useContext(ClockMachineContext);
  const { state, context, send } = machine;
  var senders = {};
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
      <GlobalStyle />
      <BaseCSS />
      <Container>
        <Row justifyContent="center">
          <Col auto>
            <Box>
              <PageTitle>
                <Emoji label="app title">🍎 ⏳ ⏰</Emoji>
              </PageTitle>
            </Box>
          </Col>
        </Row>

        <Row alignItems="center">
          <Col auto>
            <DigitalClock
              minutes={context.time.getMinutes()}
              seconds={context.time.getSeconds()}
            />
          </Col>
          <Col auto>
            <Row>
              <Col>
                <TimeAmountDisplay>
                  {context.workMinutes} minutes working
                </TimeAmountDisplay>
              </Col>
            </Row>
            <Row>
              <Col>
                <TimeAmountDisplay>
                  {context.breakMinutes} minute break
                </TimeAmountDisplay>
              </Col>
            </Row>
          </Col>
        </Row>

        <Button onClick={senders.RUN} label="run clock">
          <Emoji>🍎 🎬</Emoji>
        </Button>
        <span> / </span>
        <Button onClick={senders.RESET} label="reset clock">
          <Emoji>🍎❗🔄‍</Emoji>
        </Button>
        <span> | </span>
        <Button onClick={senders.PAUSE} label="pause clock">
          <Emoji>🍎 🧘‍</Emoji>
        </Button>
        <span>/</span>
        <Button
          onClick={senders.RESUME}
          label="resume clock"
        >
          <Emoji>🍎 🏃</Emoji>
        </Button>

        <h2>
          Current State: {state.toStrings().slice(-1)}
        </h2>
        <br />
        <Button
          onClick={senders.CONTINUE}
          label="advance clock"
        >
          <Emoji>🍎 ⏭️</Emoji>
        </Button>
        <span>|</span>
        <Button
          onClick={senders.SNOOZE}
          label="snooze clock"
        >
          <Emoji>🛌 💤</Emoji>
        </Button>
        {context.ringing ? (
          <span role="img" aria-label="alarm">
            ⌛ 🚨 🔔
          </span>
        ) : null}
        <br />
        <Emoji label="controls">🎛️</Emoji>
        <h2>Work Minutes: {context.workMinutes}</h2>
        <Button
          onClick={senders.INC_WORK_MINS}
          label="increase work minutes"
        >
          <Emoji>🔺</Emoji>
        </Button>
        <span>|</span>
        <Button
          onClick={senders.DEC_WORK_MINS}
          label="decrease work minutes"
        >
          <Emoji>🔻</Emoji>
        </Button>
        <h2>Break Minutes: {context.breakMinutes}</h2>
        <Button
          onClick={senders.INC_BREAK_MINS}
          label="increase break minutes"
        >
          <Emoji>🔺</Emoji>
        </Button>
        <span>|</span>
        <Button
          onClick={senders.DEC_BREAK_MINS}
          label="decrease break minutes"
        >
          <Emoji>🔻</Emoji>
        </Button>
      </Container>
    </>
  );
};
