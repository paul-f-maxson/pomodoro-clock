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
  StateDisplay,
  ClockControls,
  PageTitle,
  TimeRemaining,
  WorkMinutes,
  BreakMinutes,
} from './Components';

export default () => {
  return (
    <>
      <GlobalStyle />
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
<<<<<<< HEAD
            <Col>
              <StateDisplay />
            </Col>
          </Row>
          <Row>
            <Col col={11} sm={6}>
              <Flex col>
                <TimeRemaining />
                <ClockControls />
              </Flex>
=======
            <Col auto>
              <ClockControls />
              <TimeRemaining />
>>>>>>> develop
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
