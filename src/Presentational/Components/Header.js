import React from 'react';
import styled from 'styled-components';
import { EmojiWrapper } from './Universal';

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 0.5rem;
`;

/* disabling because rule is followed by EmojiWrapper component */
/* eslint-disable jsx-a11y/accessible-emoji */

export const PageTitle = () => (
  <Title>
    <EmojiWrapper label="app title">
      ⏳&nbsp;🍎&nbsp;⏰
    </EmojiWrapper>
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
