const randomTetromino  = require("../../client/helperFunctions/tetrominos");
const Pieces = require("../classes/Pieces");

const genTetraminoArr = () => {
	let Piece = new Pieces();
	let shapes = [];
	let i = 0;
	while (i < 50) {
		shapes.push(Piece.randomTetromino());
		i++;
	}
	return shapes;
};
module.exports = genTetraminoArr;
