import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

const Display = ({ gameOver, text, id }) => (
  <StyledDisplay id={id} gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display;