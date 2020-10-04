import { useState, useCallback } from 'react';

import { STAGE_WIDTH } from '../helperFunctions/gameHelpers';

export const usePlayer = (setTetraminoArrIndex, TETROMINOS) => {
    const [piece, setPiece] = useState({
        pos: {x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePiecePos = ({ x, y, collided }) => {
        setPiece(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y : (prev.pos.y += y) },
            collided,
        }))
    }

    const rotate = (matrix, dir) => {
		// make rows become cols (transpose)
		const rotatedTetromino = matrix.map((_, index) =>
			matrix.map((col) => col[index])
		);

		// reverse each row to get rotated matrix
		if (dir > 0) return rotatedTetromino.map((row) => row.reverse());
		return rotatedTetromino.reverse();
    };
    
    const resetPiece = useCallback((tetraminoArr, tetraminoArrIndex, setPiece) => {
			setPiece({
				pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
				tetromino: tetraminoArr[tetraminoArrIndex].shape,
				collided: false,
			});
			if (tetraminoArrIndex + 1 > tetraminoArr.length - 1) {
				setTetraminoArrIndex(0);
			} else {
				setTetraminoArrIndex(tetraminoArrIndex + 1);
			}
		},
		[setTetraminoArrIndex]
    );
    
    const pieceRotate = (stage, dir, checkCollision, rotate, piece, setPiece) => {
        
        const clonedPiece = JSON.parse(JSON.stringify(piece));
		clonedPiece.tetromino = rotate(clonedPiece.tetromino, dir);

		const pos = clonedPiece.pos.x;
		let offset = 1;
		while (checkCollision(clonedPiece, stage, { x: 0, y: 0 })) {
			clonedPiece.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > clonedPiece.tetromino[0].length) {
				rotate(clonedPiece.tetromino, -dir);
				clonedPiece.pos.x = pos;
				return;
			}
		}
		setPiece(clonedPiece);
	};

	const pieceFall = (stage, piece, checkCollision, setPiece) => {
		const clonedPiece = JSON.parse(JSON.stringify(piece));
		while (!checkCollision(clonedPiece, stage, { x: 0, y: 0 })) {
			clonedPiece.pos.y++;
		}
		clonedPiece.pos.y--;
		setPiece(clonedPiece);
	};

    return [piece, setPiece, rotate, pieceFall, pieceRotate, updatePiecePos, resetPiece];
}