var Engine = class {
	constructor(depth) {
		this.depth = depth;
		this.check = [false, false]; // white, black
		this.castle = [true, true, true, true]; // white-king, white-queen, black-king, black-queen
	}

    checkMoveLegality(chessboard, piece, col, startI, startJ, endI, endJ) {
        if (piece != "" && col != "") {
            let possibleMoves = this.findPossibleMoves(
                chessboard,
                piece,
                col,
                startI,
                startJ,
            );
        
            console.log(chessboard, piece, col, startI, startJ, endI, endJ);

            for (var i = 0; i < possibleMoves.length; i++) {
                let possibleI = possibleMoves[i][0];
                let possibleJ = possibleMoves[i][1];

                let willBeCheck = false;

                let tempChessboard = chessboard.slice();

                let temp = tempChessboard[startI][startJ];
                tempChessboard[startI][startJ] = ["", null];
                tempChessboard[endI][endJ] = temp;

                willBeCheck = false;
                console.log(willBeCheck);

                if ((endI == possibleI && endJ == possibleJ) && !willBeCheck) {
                    return true;
                }
            }
        }
		return false;
	}

	findPossibleMoves(chessboard, piece, col, posI, posJ) {
		if (piece == "pawn") {
			return this.findPawnMoves(chessboard, col, posI, posJ);
		} else if (piece == "knight") {
			return this.findKnightMoves(chessboard, col, posI, posJ);
		} else if (piece == "bishop") {
			return this.findBishopMoves(chessboard, col, posI, posJ);
		} else if (piece == "rook") {
			return this.findRookMoves(chessboard, col, posI, posJ);
		} else if (piece == "queen") {
			return this.findQueenMoves(chessboard, col, posI, posJ);
		} else if (piece == "king") {
			return this.findKingMoves(chessboard, col, posI, posJ);
		}
	}

	findPawnMoves(chessboard, col, posI, posJ) {
		let possibleMoves = [];

		if (col == "black") {
			if (
				posJ == 1 &&
				chessboard[posI][posJ + 2][0] == "" &&
				chessboard[posI][posJ + 1][0] == ""
			) {
				possibleMoves.push([posI, posJ + 2]);
			}
			if (posJ + 1 < 8 && chessboard[posI][posJ + 1][0] == "") {
				possibleMoves.push([posI, posJ + 1]);
			}
			if (
				posI + 1 < 8 &&
				posJ + 1 < 8 &&
				chessboard[posI + 1][posJ + 1][0].slice(0, 5) == "white"
			) {
				possibleMoves.push([posI + 1, posJ + 1]);
			}
			if (
				posI - 1 > -1 &&
				posJ + 1 < 8 &&
				chessboard[posI - 1][posJ + 1][0].slice(0, 5) == "white"
			) {
				possibleMoves.push([posI - 1, posJ + 1]);
			}
		} else {
			if (
				posJ == 6 &&
				chessboard[posI][posJ - 2][0] == "" &&
				chessboard[posI][posJ - 1][0] == ""
			) {
				possibleMoves.push([posI, posJ - 2]);
			}
			if (posJ - 1 > -1 && chessboard[posI][posJ - 1][0] == "") {
				possibleMoves.push([posI, posJ - 1]);
			}
			if (
				posI + 1 < 8 &&
				posJ - 1 > -1 &&
				chessboard[posI + 1][posJ - 1][0].slice(0, 5) == "black"
			) {
				possibleMoves.push([posI + 1, posJ - 1]);
			}
			if (
				posI - 1 > -1 &&
				posJ - 1 > -1 &&
				chessboard[posI - 1][posJ - 1][0].slice(0, 5) == "black"
			) {
				possibleMoves.push([posI - 1, posJ - 1]);
			}
		}

		return possibleMoves;
	}

	findKnightMoves(chessboard, col, posI, posJ) {
		let possibleMoves = [];

		if (
			posI + 2 < 8 &&
			posJ + 1 < 8 &&
			(chessboard[posI + 2][posJ + 1][0] == "" ||
				chessboard[posI + 2][posJ + 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 2, posJ + 1]);
		}
		if (
			posI + 2 < 8 &&
			posJ - 1 > -1 &&
			(chessboard[posI + 2][posJ - 1][0] == "" ||
				chessboard[posI + 2][posJ - 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 2, posJ - 1]);
		}
		if (
			posI - 2 > -1 &&
			posJ + 1 < 8 &&
			(chessboard[posI - 2][posJ + 1][0] == "" ||
				chessboard[posI - 2][posJ + 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 2, posJ + 1]);
		}
		if (
			posI - 2 > -1 &&
			posJ - 1 > -1 &&
			(chessboard[posI - 2][posJ - 1][0] == "" ||
				chessboard[posI - 2][posJ - 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 2, posJ - 1]);
		}
		if (
			posI - 1 > -1 &&
			posJ - 2 > -1 &&
			(chessboard[posI - 1][posJ - 2][0] == "" ||
				chessboard[posI - 1][posJ - 2][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 1, posJ - 2]);
		}
		if (
			posI + 1 < 8 &&
			posJ - 2 > -1 &&
			(chessboard[posI + 1][posJ - 2][0] == "" ||
				chessboard[posI + 1][posJ - 2][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 1, posJ - 2]);
		}
		if (
			posI + 1 < 8 &&
			posJ + 2 < 8 &&
			(chessboard[posI + 1][posJ + 2][0] == "" ||
				chessboard[posI + 1][posJ + 2][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 1, posJ + 2]);
		}
		if (
			posI - 1 > -1 &&
			posJ + 2 < 8 &&
			(chessboard[posI - 1][posJ + 2][0] == "" ||
				chessboard[posI - 1][posJ + 2][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 1, posJ + 2]);
		}

		return possibleMoves;
	}

	findBishopMoves(chessboard, col, posI, posJ) {
		let possibleMoves = [];

		let map = [
			[1, 1],
			[-1, 1],
			[-1, -1],
			[1, -1],
		];

		for (var i = 0; i < 4; i++) {
			let currentI = posI;
			let currentJ = posJ;
			let br = false;
			while (true) {
				currentI += map[i][0];
				currentJ += map[i][1];
				if (br) {
					break;
				}
				if (
					currentI > -1 &&
					currentJ > -1 &&
					currentI < 8 &&
					currentJ < 8 &&
					(chessboard[currentI][currentJ][0] == "" ||
						chessboard[currentI][currentJ][0].slice(0, 5) != col)
				) {
					possibleMoves.push([currentI, currentJ]);
					if (chessboard[currentI][currentJ][0] != "") {
						break;
					}
				} else {
					break;
				}
			}
		}

		return possibleMoves;
	}

	findRookMoves(chessboard, col, posI, posJ) {
		let possibleMoves = [];

		let map = [
			[1, 0],
			[-1, 0],
			[0, -1],
			[0, 1],
		];

		for (var i = 0; i < 4; i++) {
			let currentI = posI;
			let currentJ = posJ;
			while (true) {
				currentI += map[i][0];
				currentJ += map[i][1];
				if (
					currentI > -1 &&
					currentJ > -1 &&
					currentI < 8 &&
					currentJ < 8 &&
					(chessboard[currentI][currentJ][0] == "" ||
						chessboard[currentI][currentJ][0].slice(0, 5) != col)
				) {
					possibleMoves.push([currentI, currentJ]);
					if (chessboard[currentI][currentJ][0] != "") {
						break;
					}
				} else {
					break;
				}
			}
		}

		return possibleMoves;
	}

	findQueenMoves(chessboard, col, posI, posJ) {
		let possibleMoves = this.findBishopMoves(chessboard, col, posI, posJ);
		let rookPosMoves = this.findRookMoves(chessboard, col, posI, posJ);

		for (var i = 0; i < rookPosMoves.length; i++) {
			possibleMoves.push(rookPosMoves[i]);
		}

		return possibleMoves;
	}

	findKingMoves(chessboard, col, posI, posJ) {
		let possibleMoves = [];

		if (
			posI - 1 > -1 &&
			posJ - 1 > -1 &&
			(chessboard[posI - 1][posJ - 1][0] == "" ||
				chessboard[posI - 1][posJ - 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 1, posJ - 1]);
		}
		if (
			posI - 1 > -1 &&
			posJ + 1 < 8 &&
			(chessboard[posI - 1][posJ + 1][0] == "" ||
				chessboard[posI - 1][posJ + 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 1, posJ + 1]);
		}
		if (
			posI + 1 < 8 &&
			posJ + 1 < 8 &&
			(chessboard[posI + 1][posJ + 1][0] == "" ||
				chessboard[posI + 1][posJ + 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 1, posJ + 1]);
		}
		if (
			posI + 1 < 8 &&
			posJ - 1 > -1 &&
			(chessboard[posI + 1][posJ - 1][0] == "" ||
				chessboard[posI + 1][posJ - 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 1, posJ - 1]);
		}
		if (
			posI - 1 > -1 &&
			(chessboard[posI - 1][posJ][0] == "" ||
				chessboard[posI - 1][posJ][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI - 1, posJ]);
		}
		if (
			posI + 1 < 8 &&
			(chessboard[posI + 1][posJ][0] == "" ||
				chessboard[posI + 1][posJ][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI + 1, posJ]);
		}
		if (
			posJ - 1 > -1 &&
			(chessboard[posI][posJ - 1][0] == "" ||
				chessboard[posI][posJ - 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI, posJ - 1]);
		}
		if (
			posJ + 1 < 8 &&
			(chessboard[posI][posJ + 1][0] == "" ||
				chessboard[posI][posJ + 1][0].slice(0, 5) != col)
		) {
			possibleMoves.push([posI, posJ + 1]);
		}
		return possibleMoves;
	}

	checkCheck(chessboard, col) {
		let kingi;
		let kingj;

		for (var i = 0; i < chessboard.length; i++) {
			if (kingi == null) {
				for (var j = 0; j < chessboard[i].length; j++) {
					if (chessboard[i][j][0] == col + "-king") {
						kingi = i;
						kingj = j;
					}
				}
			}
		}

		let possMoves = this.findPossibleMoves(
			chessboard,
			"rook",
			col,
			kingi,
			kingj,
		);

		for (var i = 0; i < possMoves.length; i++) {
			if (
				chessboard[possMoves[i][0]][possMoves[i][1]][0] != "" &&
				chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(0, 5) != col &&
				(chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(6) == "queen" ||
					chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(6) == "rook")
			) {
				return true;
			}
		}

		possMoves = this.findPossibleMoves(chessboard, "bishop", col, kingi, kingj);

		for (var i = 0; i < possMoves.length; i++) {
			if (
				chessboard[possMoves[i][0]][possMoves[i][1]][0] != "" &&
				chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(0, 5) != col &&
				(chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(6) == "queen" ||
					chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(6) == "bishop")
			) {
				return true;
			}
		}

		possMoves = this.findPossibleMoves(chessboard, "knight", col, kingi, kingj);

		for (var i = 0; i < possMoves.length; i++) {
			if (
				chessboard[possMoves[i][0]][possMoves[i][1]][0] != "" &&
				chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(0, 5) != col &&
				chessboard[possMoves[i][0]][possMoves[i][1]][0].slice(6) == "knight"
			) {
				return true;
			}
		}

		if (col == "white") {
			if (
				kingi > 0 &&
				kingj > 0 &&
				chessboard[kingi - 1][kingj - 1][0] == "black-pawn"
			) {
				return true;
			} else if (
				kingi > 0 &&
				kingj < 7 &&
				chessboard[kingi - 1][kingj + 1][0] == "black-pawn"
			) {
				return true;
			}
		} else {
			if (
				kingi < 7 &&
				kingj > 0 &&
				chessboard[kingi + 1][kingj - 1][0] == "white-pawn"
			) {
				return true;
			} else if (
				kingi < 7 &&
				kingj < 7 &&
				chessboard[kingi + 1][kingj + 1][0] == "white-pawn"
			) {
				return true;
			}
		}
		return false;
	}
};
