import React from 'react';
import { StyledStage, StyledOpponent } from './styles/StyledStage';

import Cell from './Cell';

const Stage = ({ stage, type = 0 }) => {
  if (type === 0)
    return (
      <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
      </StyledStage>
    );
  else
      return (
        <StyledOpponent width={stage[0].length} height={stage.length}>
          {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
        </StyledOpponent>
      );
};

export default Stage;
