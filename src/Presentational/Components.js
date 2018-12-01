import React from 'react';
import styled, {
  createGlobalStyle,
} from 'styled-components';

import { CaretSquareUp } from 'styled-icons/fa-regular/CaretSquareUp';
import { CaretSquareDown } from 'styled-icons/fa-regular/CaretSquareDown';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron');
`;

/* eslint-disable jsx-a11y/accessible-emoji */
/* disabling because rule is followed in the Emoji component */

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ col }) => (col ? 'column' : 'row')};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) =>
    justifyContent};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 0.5rem;
`;

const PageTitle = () => (
  <Title>
    <Emoji label="app title">⏳&nbsp;🍎&nbsp;⏰</Emoji>
  </Title>
);

const HeaderDivider = styled.hr`
  background-color: slateblue;
  border: none;
  border-radius: 0.1rem;
  width: 100%;
  height: 0.5rem;
  margin-bottom: 1rem;
`;

const DigitalClock = styled.time`
  font-size: 4rem;
  font-family: Orbitron, Arial, sans-serif;
  line-height: 1.25;
`;

const TimeRemaining = ({ minutes, seconds }) => (
  <DigitalClock dateTime={`PT${minutes}M${seconds}S`}>
    {String(minutes).padStart(2, '0')}:
    {String(seconds).padStart(2, '0')}
  </DigitalClock>
);

const TimeAmountDisplay = styled.p`
  font-family: Arial;
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
  margin-left: 0.5rem;
`;

const TimeAmount = styled.span`
  font-family: Arial;
  font-weight: bold;
  font-size: 3.4rem;
`;

const UpDown = ({ onUp, onDown, upTitle, downTitle }) => (
  <Flex col>
    <Button onClick={onUp}>
      <CaretSquareUp size="20" title={upTitle} />
    </Button>
    <Button onClick={onDown}>
      <CaretSquareDown size="20" title={downTitle} />
    </Button>
  </Flex>
);

let Button = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

Button = styled(Button)`
  background-color: white;
  border: none;
`;

let Emoji = ({ label, children, ...props }) => (
  <span {...props} role="img" aria-label={label}>
    {children}
  </span>
);

Emoji = styled(Emoji)`
  cursor: default;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

export {
  GlobalStyle,
  HeaderDivider,
  PageTitle,
  Emoji,
  Button,
  UpDown,
  TimeRemaining,
  TimeAmountDisplay,
  TimeAmount,
  Flex,
};
