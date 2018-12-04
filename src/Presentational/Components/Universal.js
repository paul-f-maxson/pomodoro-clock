import React from 'react';
import styled, {
  createGlobalStyle,
} from 'styled-components';

// GLOBAL STYLE

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron');
`;

// FLEX

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

// EMOJI

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

// BUTTON

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
