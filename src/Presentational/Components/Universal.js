import React from 'react';
import styled, {
  createGlobalStyle,
} from 'styled-components';

// GLOBAL STYLE

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron');

  @import url('https://fonts.googleapis.com/css?family=Roboto');
`;

// FLEX

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ col }) => (col ? 'column' : 'row')};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) =>
    justifyContent};

  ${
    '' /* Set the passed value as the padding at the ends of the major axis and as the margin (along the same) on children. */
  }
  padding: ${({ spaceBetweenKids, col }) =>
    col
      ? `${spaceBetweenKids} 0 ${spaceBetweenKids} 0`
      : `0 ${spaceBetweenKids} 0 ${spaceBetweenKids}`};

  > * {
    margin: ${({ spaceBetweenKids, col }) =>
      col
        ? `${spaceBetweenKids} 0 ${spaceBetweenKids} 0`
        : `0 ${spaceBetweenKids} 0 ${spaceBetweenKids}`};
  }
`;

// THIN BOX

export const ThinBox = styled.div`
  border: 0.1rem solid darkgray;
  border-radius: 0.1rem;
  padding: 0.5rem;
  width: ${({ width }) => width};
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
