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
  ClockControls,
  PageTitle,
  TimeRemaining,
  WorkMinutes,
  BreakMinutes,
  Flex,
} from './Components';

import { ClockMachineContext, SendersContext } from '../';

export default ({ possibleClockEvents }) => {
  const { context } = useContext(ClockMachineContext);
  const senders = useContext(SendersContext);

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
                <Flex
                  row
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <TimeRemaining
                    minutes={context.time.getMinutes()}
                    seconds={context.time.getSeconds()}
                  />
                </Flex>
                <ClockControls
                  senders={senders}
                  possibleClockEvents={possibleClockEvents}
                />
              </Flex>
            </Col>
            <Col auto>
              <Row alignItems="center">
                <Col>
                  <WorkMinutes />
                </Col>
              </Row>
              <Row>
                <Col auto>
                  <BreakMinutes />
                </Col>
              </Row>
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
};
