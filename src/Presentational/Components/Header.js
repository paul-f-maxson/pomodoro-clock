import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-family: Arial, "sans-serif";
  font-size: 2.5rem;
  margin: 0.5rem;
`;

/* disabling because rule is followed by EmojiWrapper component */
/* eslint-disable jsx-a11y/accessible-emoji */

export const PageTitle = () => (
  <Title>
    Pomodoro Clock
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
