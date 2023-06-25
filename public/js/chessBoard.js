const chessBoard = [];

var previousI = null;
var previousJ = null;

var currentI = null;
var currentJ = null;

var dragI = null;
var dragJ = null;

let blackKing;
let blackQueen;
let blackRook;
let blackBishop;
let blackKnight;
let blackPawn;

let whiteKing;
let whiteQueen;
let whiteRook;
let whiteBishop;
let whiteKnight;
let whitePawn;

const isWhite = true;

function setup() {
	var canvas = createCanvas(400, 400);
	canvas.parent("chess-board");

	for (var i = 0; i < 8; i++) {
		chessBoard.push([]);
		for (var j = 0; j < 8; j++) {
			chessBoard[i].push(["", null]);
		}
	}

	blackKing = loadImage("./assets/pieces/black-king.png");
	blackQueen = loadImage("./assets/pieces/black-queen.png");
	blackRook = loadImage("./assets/pieces/black-rook.png");
	blackBishop = loadImage("./assets/pieces/black-bishop.png");
	blackKnight = loadImage("./assets/pieces/black-knight.png");
	blackPawn = loadImage("./assets/pieces/black-pawn.png");

	whiteKing = loadImage("./assets/pieces/white-king.png");
	whiteQueen = loadImage("./assets/pieces/white-queen.png");
	whiteRook = loadImage("./assets/pieces/white-rook.png");
	whiteBishop = loadImage("./assets/pieces/white-bishop.png");
	whiteKnight = loadImage("./assets/pieces/white-knight.png");
	whitePawn = loadImage("./assets/pieces/white-pawn.png");

	chessBoard[0][0] = ["black-rook", blackRook];
	chessBoard[1][0] = ["black-knight", blackKnight];
	chessBoard[2][0] = ["black-bishop", blackBishop];
	chessBoard[3][0] = ["black-queen", blackQueen];
	chessBoard[4][0] = ["black-king", blackKing];
	chessBoard[5][0] = ["black-bishop", blackBishop];
	chessBoard[6][0] = ["black-knight", blackKnight];
	chessBoard[7][0] = ["black-rook", blackRook];
	chessBoard[0][1] = ["black-pawn", blackPawn];
	chessBoard[1][1] = ["black-pawn", blackPawn];
	chessBoard[2][1] = ["black-pawn", blackPawn];
	chessBoard[3][1] = ["black-pawn", blackPawn];
	chessBoard[4][1] = ["black-pawn", blackPawn];
	chessBoard[5][1] = ["black-pawn", blackPawn];
	chessBoard[6][1] = ["black-pawn", blackPawn];
	chessBoard[7][1] = ["black-pawn", blackPawn];

	chessBoard[0][7] = ["white-rook", whiteRook];
	chessBoard[1][7] = ["white-knight", whiteKnight];
	chessBoard[2][7] = ["white-bishop", whiteBishop];
	chessBoard[3][7] = ["white-queen", whiteQueen];
	chessBoard[4][7] = ["white-king", whiteKing];
	chessBoard[5][7] = ["white-bishop", whiteBishop];
	chessBoard[6][7] = ["white-knight", whiteKnight];
	chessBoard[7][7] = ["white-rook", whiteRook];
	chessBoard[0][6] = ["white-pawn", whitePawn];
	chessBoard[1][6] = ["white-pawn", whitePawn];
	chessBoard[2][6] = ["white-pawn", whitePawn];
	chessBoard[3][6] = ["white-pawn", whitePawn];
	chessBoard[4][6] = ["white-pawn", whitePawn];
	chessBoard[5][6] = ["white-pawn", whitePawn];
	chessBoard[6][6] = ["white-pawn", whitePawn];
	chessBoard[7][6] = ["white-pawn", whitePawn];
}

function draw() {
	background(75, 115, 153);

	fill(234, 233, 210);
	noStroke();

	drawBoard(isWhite);
	drawPieces();

	checkHover();
}

function mousePressed() {
	let arr = checkHover();
	dragI = arr[1];
	dragJ = arr[2];
	if (arr[1] != null) {
		document.getElementById("chess-board").style.cursor = "grabbing";
	}
}

function mouseReleased() {
	let arr = checkHover();
	let mouseI = arr[1];
	let mouseJ = arr[2];
    console.log(
        
    )
    if (
			mouseI > -1 &&
			mouseJ > -1 &&
			mouseI < chessBoard.length &&
			mouseJ < chessBoard[0].length &&
			(chessBoard[mouseI][mouseJ][0] == "" ||
				chessBoard[mouseI][mouseJ][0].slice(0, 4) !=
					chessBoard[dragI][dragJ][0].slice(0, 4))
		) {
			let temp = chessBoard[dragI][dragJ];
			chessBoard[dragI][dragJ] = ["", null];
			chessBoard[arr[1]][arr[2]] = temp;
		}
	dragI = null;
	dragJ = null;
}

function checkHover() {
	var mouseI = floor(mouseX / (width / 8));
	var mouseJ = floor(mouseY / (height / 8));

	if (
		mouseI > -1 &&
		mouseJ > -1 &&
		mouseI < chessBoard.length &&
		mouseJ < chessBoard[0].length &&
		chessBoard[mouseI][mouseJ][0] != ""
	) {
		if (dragI == null) {
			document.getElementById("chess-board").style.cursor = "grab";
		}
		return [true, mouseI, mouseJ];
	} else {
		if (dragI == null) {
			document.getElementById("chess-board").style.cursor = "auto";
		}
		return [false, mouseI, mouseJ];
	}
}

function drawBoard(isCorner) {
	let corner = 0;
	for (var i = 0; i < chessBoard.length; i++) {
		for (var j = 0; j < chessBoard[i].length; j++) {
			if ((corner % 2 == 0) == isCorner) {
				rect((i * height) / 8, (j * width) / 8, height / 8, width / 8);
			}

			corner++;
		}
		corner++;
	}
}

function drawPieces() {
	for (var i = 0; i < chessBoard.length; i++) {
		for (var j = 0; j < chessBoard[i].length; j++) {
			if (!(i == dragI && j == dragJ) && chessBoard[i][j][1] != null) {
				image(
					chessBoard[i][j][1],
					(i * height) / 8,
					(j * width) / 8,
					height / 8,
					width / 8,
				);
			}
		}
	}

    if (dragI != null && dragJ != null && dragI < chessBoard.length && dragJ < chessBoard[0].length && dragI > -1 && dragJ > -1) {
		image(
			chessBoard[dragI][dragJ][1],
			mouseX - width / 16,
			mouseY - height / 16,
			width / 8,
			height / 8,
		);
	}
}
