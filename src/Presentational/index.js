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
  Flex,
} from './Components';

export default () => {
  // NOTE: I didn't really like the bootstrap grid system I used here, maybe use a different one.
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
