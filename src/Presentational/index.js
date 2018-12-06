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
  ClockControls,
  PageTitle,
  TimeRemaining,
  WorkMinutes,
  BreakMinutes,
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
            <Col auto>
              <TimeRemaining />
              <ClockControls />
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
