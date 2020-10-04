import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;

export const StyledOpponent = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(8vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 0.8fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 10vw;
  min-width: 100px;
  min-height: 100px;
  background: #111;
`;