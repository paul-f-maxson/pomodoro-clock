import React from 'react';
import styled, {
  createGlobalStyle,
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron');
`;

const Box = styled.div`
  border: 0.3rem solid palevioletred;
  border-radius: 3px;
  margin: 0.1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 0.5rem;
`;

const Emoji = ({ label, children }) => (
  <span role="img" aria-label={label}>
    {children}
  </span>
);

const Button = styled.button`
  background: white;
  color: green;
  border: 0.2rem solid slateblue;
  border-radius: 3px;
`;

let DigitalClock = ({ minutes, seconds, className }) => (
  <time
    className={className}
    dateTime={`PT${minutes}M${seconds}S`}
  >
    {String(minutes).padStart(2, '0')}:
    {String(seconds).padStart(2, '0')}
  </time>
);

DigitalClock = styled(DigitalClock)`
  font-size: 4rem;
  font-family: Orbitron;
  line-height: 1.6;
`;

const TimeAmountDisplay = styled.p`
  font-family: Arial;
  font-weight: bold;
  font-size: large;
  margin: 0;
`;

export {
  GlobalStyle,
  Box,
  PageTitle,
  Emoji,
  Button,
  DigitalClock,
  TimeAmountDisplay,
};
