import React from 'react';

import {
  BaseCSS,
  Container,
  Row,
  Col,
} from 'styled-bootstrap-grid';

import {
  HeaderDivider,
  StateDisplay,
  ClockControls,
  AlarmAudio,
  PageTitle,
  Flex,
  TimeRemaining,
  WorkMinutes,
  BreakMinutes,
} from './Components';

export default () => {
  return (
    <>
      <BaseCSS />
      <Container>
        <header>
          <Row>
            <Col auto>
              <PageTitle />
            </Col>
          </Row>
        </header>

        <HeaderDivider />

        <main>
          <Row>
            <Col auto>
              <Flex row spaceBetweenKids="0.2rem">
                <ClockControls />
                <StateDisplay />
              </Flex>
              <TimeRemaining />
              <AlarmAudio
                volume={0.5}
                src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
              />
            </Col>
            <Col auto>
              <WorkMinutes />
              <BreakMinutes />
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
};
