import React, { useState, useEffect, useCallback, useRef } from 'react'; 
import { Redirect } from 'react-router-dom';
import { checkCollision, createStage, movePiece, dropPiece, drop, pieceRotation } from '../helperFunctions/gameHelpers';
import { TETROMINOS } from '../helperFunctions/tetrominos';

// Styled Components
import { StyledTetrisWrapper, StyledTetris, StyledPara } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import socket from '../middleware/client_socket';

//Front end object for game data
let game = {
  users: [],
  usersLeft: [],
}


const Tetris = (props) => {
  const name = props.location.state ? props.location.state.name : "ufxEbCbUpvbYdjISIv1d";
  const room = props.location.state ? props.location.state.room : "kQglWBl8bnDcu3R0wxW1";
  const [start, setStart] = useState(false);
  const [host, setHost] = useState(false);
  const [winner, setWinner] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [tetraminoArr, setTetraminoArr] = useState(null);
  const [tetraminoArrIndex, setTetraminoArrIndex] = useState(0);
  const [solo, setSolo] = useState(false);

  const [piece, setPiece, rotate, pieceFall, pieceRotate, updatePiecePos, resetPiece] = usePlayer(setTetraminoArrIndex, TETROMINOS);
  const [stage, setStage, addRow] = useStage(piece, resetPiece, tetraminoArr, tetraminoArrIndex, setPiece);
  
  const boardRef = useRef(null);
  

  //Socket section
  socket.on("updateUsers", (users) => {
    if (users.length > 1) {
      if (users[0].inGame === false){
        game.users = users;
        if(game.users[0] && game.users[0].id === socket.id){
          setHost(true);
        }
      }
      else if (users[0].inGame === true && users[0].board !== null) {
        let newUsers = users.filter((user) => user.room === room && user.board !== null );
        game.users = newUsers;
        game.usersLeft = newUsers;
        let gameChecker = setTimeout(() => {
          if(game.users[0] && game.users[0].id === socket.id){
            setHost(true);
          }
        }, 1000);
        clearTimeout(gameChecker)
      }
    } else {
      game.users = users;
      if(game.users[0] && game.users[0].id === socket.id){
        setHost(true);
      }
    }
  });

  socket.on('deadUser', (users) => {
    let usersStillPlaying = users.filter((user) => user.room === room && user.inGame === true);
    if (usersStillPlaying.length > 1) {
      game.usersLeft = usersStillPlaying;
      if(game.usersLeft[0] && game.usersLeft[0].id === socket.id){
        setHost(true);
      }
      // eslint-disable-next-line 
    } else if(usersStillPlaying.length == 0){
      setSolo(true);
    } else {
      socket.emit('winner', (usersStillPlaying[0]));
    }
  });

  socket.on("gameStarted", () => {
    setGameOver(false);
    socket.emit("setBoard", (stage));
  });

  socket.on('genTetraminoArr', (tetArr) => {
    setTetraminoArr(tetArr);
  });

  socket.on('pong', () => {
    socket.emit('ping');
  });

  socket.on('winner', (champ) => {
    setDropTime(null);
    setWinner(champ.username);
  });

  const startGame = () => {
    socket.emit("gameStart", room);
    socket.emit('genTetraminoArr', room);
  }

  const keyUp = ({ keyCode }, gameOver, setDropTime) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
      }
    }
  }

  const move = ({ keyCode }, movePiece, dropPiece, setDropTime, drop, piece, stage, updatePiecePos,
    setGameOver, start, setStart, pieceRotation, pieceRotate, gameOver, setPiece) => {
      if (!gameOver) {
      if (keyCode === 32) {
        pieceFall(stage, piece, checkCollision, setPiece);
      }
      if (keyCode === 37) {
        movePiece(-1, updatePiecePos, piece, stage, setPiece);
      } else if (keyCode === 39) {
        movePiece(1, updatePiecePos, piece, stage, setPiece);
      } else if (keyCode === 40) {
        dropPiece(setDropTime, drop, piece, stage, updatePiecePos, setGameOver, start, setStart, setPiece);
      } else if (keyCode === 38) {
        pieceRotation(stage, 1, pieceRotate, checkCollision, rotate, piece, setPiece);
      }
    }
  };

  useInterval((addRow, updatePiecePos) => {
    socket.once("addRow", () => {
      addRow(stage, setStage);
      updatePiecePos({ x: 0, y: 0, collided: false }, setPiece);
    }, addRow, updatePiecePos);

    drop(piece, stage, setDropTime, updatePiecePos, setGameOver, start, setStart, setPiece);
  }, addRow, updatePiecePos, dropTime);

  const setUpGame = useCallback(
    (setWinner, setGameOver, resetPiece, setDropTime, setStage, setStart) => {
      setWinner(null); setGameOver(false); resetPiece(tetraminoArr, tetraminoArrIndex, setPiece);
      setDropTime(1000); setStage(createStage()); setStart(true); 
    },
    // eslint-disable-next-line 
    [tetraminoArr, setStage, resetPiece],
  );

  useEffect(() => {
    if (tetraminoArr) {
      setUpGame(setWinner, setGameOver, resetPiece, setDropTime, setStage, setStart);
      boardRef.current.focus();
    }
    // eslint-disable-next-line 
  }, [tetraminoArr, setUpGame]);

  useEffect(() => {
		if (winner){
      setTetraminoArrIndex(0)
    }
  }, [winner, tetraminoArrIndex,  setTetraminoArrIndex]);

  if (name !== 'ufxEbCbUpvbYdjISIv1d' && room !== 'kQglWBl8bnDcu3R0wxW1') {
    return (
      <StyledTetrisWrapper ref={boardRef} role="button" tabIndex="0" onKeyDown={event => move(event, movePiece, dropPiece, setDropTime, drop,
         piece, stage, updatePiecePos, setGameOver, start, setStart, pieceRotation, pieceRotate, gameOver, setPiece)} 
      onKeyUp={(event) => keyUp(event, gameOver, setDropTime)} >
        <StyledTetris>
          <Stage stage={stage}/>
          <aside>
            {winner ? (
              <Display text={`Winner: ${winner}`} />
              ) :
              ""
            }
            {gameOver ? (
              <div>
                <Display gameOver={gameOver} text="Game Over" />

                {host && !solo ? (
                  <StartButton callback={startGame}/>
                ): ""}

                {solo ? (
                  <StartButton callback={startGame} />
                ) : ("")}
              </div>
            ) : (
              <div>
                <Display text={`User: ${name}`} />
              
                {start ? (
                  ""
                  ) : (  host ? (
                    <StartButton callback={startGame}/>
                    ) : (
                      <StyledPara > Waiting for host to start game. </StyledPara>
                    )
                  )}

                {winner && host ? (
                  <StartButton callback={startGame}/>
                ): ""} 
              </div>
            )}    
          </aside>
          {!gameOver ? (
            <div id="stageContainer">
              {game.usersLeft ?
                game.users.map((value, index) => {
                  if (
                    value.board && value.id !== socket.id &&
                    game.usersLeft.find((user) => user.id === value.id)
                  )
                    return (
                      <div key={index} style={{ padding: "0 10px" }}>
                        <p>{value.username}</p>
                        <Stage type={1} stage={value.board} />
                      </div>
                    );
                  return null;
                }) : ""}
            </div>
          ) : ( "" )}
        </StyledTetris>
      </StyledTetrisWrapper>
    );
  } else {
    return (
      <Redirect
        to={{ pathname: '/' }}
      />
    )
  }
};

export default Tetris;