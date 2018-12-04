import React from 'react';
import styled, {
  createGlobalStyle,
} from 'styled-components';

import { CaretSquareUp } from 'styled-icons/fa-regular/CaretSquareUp';
import { CaretSquareDown } from 'styled-icons/fa-regular/CaretSquareDown';

// TODO: Individual components should useContext on their own, without it being passed down by the parent

// TODO: Organize these components somehow, as it is very hard to find just the one you're looking for

/* disabling because rule is followed by EmojiWrapper component */
/* eslint-disable jsx-a11y/accessible-emoji */

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron');
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ col }) => (col ? 'column' : 'row')};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) =>
    justifyContent};

  ${
    '' /* Set the passed value as the padding at the ends of the major axis and as the margin on children in the same direction. */
  }
  padding: ${({ remBetweenKids, row }) => {
    const remBtw = `${remBetweenKids}rem`;
    return row
      ? `0 ${remBtw} 0 ${remBtw}`
      : `${remBtw} 0 ${remBtw} 0`;
  }};

  > * {
    margin: ${({ remBetweenKids, row }) => {
      const remBtw = `${remBetweenKids}rem`;
      return row
        ? `0 ${remBtw} 0 ${remBtw}`
        : `${remBtw} 0 ${remBtw} 0`;
    }};
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 0.5rem;
`;

export const PageTitle = () => (
  <Title>
    <Emoji label="app title">⏳&nbsp;🍎&nbsp;⏰</Emoji>
  </Title>
);

export const HeaderDivider = styled.hr`
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

export const TimeRemaining = ({ minutes, seconds }) => (
  <DigitalClock dateTime={`PT${minutes}M${seconds}S`}>
    {String(minutes).padStart(2, '0')}:
    {String(seconds).padStart(2, '0')}
  </DigitalClock>
);

export const ClockControlsBox = styled.div`
  border: 0.1rem solid darkgray;
  border-radius: 0.1rem;
  padding: 1rem;
`;

const VerticalWords = ({ text, ...restProps }) => {
  const words = String(text)
    .split(' ')
    .map((word, i) => (
      <span key={`${i}-${word}`}>{word}</span>
    ));

  return <Flex col>{words}</Flex>;
};

const TimeAmountLabel = styled.div`
  font-family: Arial;
  font-weight: bold;
  font-size: 1.4rem;
`;

const TimeAmountSpan = styled.span`
  font-family: Arial;
  font-weight: bold;
  font-size: 3.4rem;
`;

export const TimeAmountDisplay = ({
  timeAmount,
  labelText,
}) => (
  <Flex remBetweenKids={0.2} row>
    <TimeAmountSpan>
      {String(timeAmount).padStart(2, '0')}
    </TimeAmountSpan>

    <TimeAmountLabel>
      <VerticalWords text={labelText} />
    </TimeAmountLabel>
  </Flex>
);

const ThickBox = styled.div`
  border: 0.2rem solid palevioletred;
  padding: 0.3rem;
  margin: 0.1rem;
  border-radius: 0.3rem;
`;

export const Button = ({ children, noBox, ...restProps }) =>
  noBox ? (
    <div {...restProps}>{children}</div>
  ) : (
    <ThickBox {...restProps}>{children}</ThickBox>
  );

export const UpDown = ({
  onUp,
  onDown,
  upTitle,
  downTitle,
}) => (
  <Flex col>
    <Button noBox onClick={onUp}>
      <CaretSquareUp size="20" title={upTitle} />
    </Button>
    <Button noBox onClick={onDown}>
      <CaretSquareDown size="20" title={downTitle} />
    </Button>
  </Flex>
);

const Emoji = styled.span`
  cursor: default;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

export const EmojiWrapper = ({ label, children }) => (
  <Emoji role="img" aria-label={label}>
    {children}
  </Emoji>
);
