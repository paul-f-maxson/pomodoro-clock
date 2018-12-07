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
  Flex,
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
            <Col auto>
              <Flex row spaceBetweenKids="0.2rem">
                <ClockControls />
                <StateDisplay />
              </Flex>

              <TimeRemaining />
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
