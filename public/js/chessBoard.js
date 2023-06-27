document.getElementById("chess-board").addEventListener("contextmenu", (event) => event.preventDefault());

const chessBoard = [];

const engine = new Engine(20);

var previousI = null;
var previousJ = null;

var currentI = null;
var currentJ = null;

var dragI = null;
var dragJ = null;

var clickI = dragI;
var clickJ = dragJ;

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
	var canvas = createCanvas(600, 600);
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
	if (mouseButton == LEFT) {
		let arr = checkHover();
		if (
			(clickI == null ||
				engine
					.findPossibleMoves(
						chessBoard,
						chessBoard[clickI][clickJ][0].slice(6),
						chessBoard[clickI][clickJ][0].slice(0, 5),
						clickI,
						clickJ,
					)
					.indexOf([clickI, clickJ]) == -1) &&
			chessBoard[arr[1]][arr[2]][0] != ""
		) {
			dragI = arr[1];
			dragJ = arr[2];
			clickI = dragI;
			clickJ = dragJ;
			if (arr[1] != null) {
				document.getElementById("chess-board").style.cursor = "grabbing";
			}
		}
	} else if (mouseButton == RIGHT) {
	}
}

function mouseReleased() {
	let arr = checkHover();
	let mouseI = arr[1];
    let mouseJ = arr[2];

    console.log("engine legality",
        engine.checkMoveLegality(
            chessBoard,
            chessBoard[clickI][clickJ][0].slice(6),
            chessBoard[clickI][clickJ][0].slice(0, 5),
            clickI,
            clickJ,
            mouseI,
            mouseJ,
        ),
    );;

	if (
		mouseI > -1 &&
		mouseJ > -1 &&
		mouseI < chessBoard.length &&
		mouseJ < chessBoard[0].length &&
		clickI != null &&
		clickJ != null &&
		engine.checkMoveLegality(
			chessBoard,
			chessBoard[clickI][clickJ][0].slice(6),
			chessBoard[clickI][clickJ][0].slice(0, 5),
			clickI,
			clickJ,
			mouseI,
			mouseJ,
		)
	) {
		let temp = chessBoard[clickI][clickJ];
		chessBoard[clickI][clickJ] = ["", null];
		chessBoard[arr[1]][arr[2]] = temp;
		clickI = null;
		clickJ = null;
	} else if (dragI == null) {
		clickI = null;
		clickJ = null;
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

	if (clickI != null) {
		let possibleMoves = engine.findPossibleMoves(
			chessBoard,
			chessBoard[clickI][clickJ][0].slice(6),
			chessBoard[clickI][clickJ][0].slice(0, 5),
			clickI,
			clickJ,
		);

		if (possibleMoves != null) {
			showMoves(possibleMoves);
		}
	}

	if (
		dragI != null &&
		dragJ != null &&
		dragI < chessBoard.length &&
		dragJ < chessBoard[0].length &&
		dragI > -1 &&
		dragJ > -1 &&
		chessBoard[dragI][dragJ][1] != null
	) {
		image(
			chessBoard[dragI][dragJ][1],
			mouseX - width / 16,
			mouseY - height / 16,
			width / 8,
			height / 8,
		);
	}
}

function showMoves(possibleMoves) {
	for (var i = 0; i < possibleMoves.length; i++) {
		let possibleI = possibleMoves[i][0];
		let possibleJ = possibleMoves[i][1];
		if (chessBoard[possibleI][possibleJ][0] == "") {
			strokeWeight(5);
			stroke(0, 0, 0, 100);
			fill(0, 0, 0, 100);
			circle(
				(possibleI * height) / 8 + height / 16,
				(possibleJ * width) / 8 + width / 16,
				height / 24,
				width / 24,
			);
		} else {
			strokeWeight(5);
			stroke(0, 0, 0, 100);
			fill(0, 0, 0, 0);
			circle(
				(possibleI * height) / 8 + height / 16,
				(possibleJ * width) / 8 + width / 16,
				height / 8,
				width / 8,
			);
		}
	}
}
