import { useState, useEffect } from 'react';
import { createStage } from '../helperFunctions/gameHelpers';
import socket from '../middleware/client_socket';

export const useStage = (piece, resetPiece, tetraminoArr, tetraminoArrIndex, setPiece) => {
    const [stage, setStage] = useState(createStage());

    const addRow = (stage, setStage) => {
        for (let i = 1; i < stage.length; i++) stage[i - 1] = [...stage[i]];
        stage[stage.length - 1] = new Array(stage[0].length).fill(["U", ""]);
        setStage(stage);
    };

    useEffect(() => {
        let counter = 1;
        const sweepRows = (newStage) =>
        newStage.reduce((ack, row) => {
            if (row.findIndex((cell) => cell[0] === 0 || cell[0] === "U") === -1) {
                ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
                counter++;
                if (counter > 1) {
                    socket.emit("clearRow");
                }
                return ack;
            }
            ack.push(row);
            return ack;
        }, []);

        const updateStage = (prevStage, piece, resetPiece, sweepRows) => {
            //first flush the stage, clear from previous render
            const newStage = prevStage.map((row) => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            )

            //Then draw the tetromino
            piece.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0){
                        newStage[y + piece.pos.y][x + piece.pos.x] = [
                            value,
                            `${piece.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // then check if collided
            if (piece.collided) {
                resetPiece(tetraminoArr, tetraminoArrIndex, setPiece);
                let temp = sweepRows(newStage);
                socket.emit("setBoard", temp);
                return temp;
            }

            return newStage;
        };

        setStage((prev) => updateStage(prev, piece, resetPiece, sweepRows));

    // eslint-disable-next-line 
    }, [piece, resetPiece, tetraminoArrIndex, tetraminoArr]);

    return[stage, setStage, addRow];
}