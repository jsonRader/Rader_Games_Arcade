$(document).ready(function () {
    const createBoard = () => {
        return Array.from(new Array(3), () => new Array(3).fill(null));
    };

    let board = createBoard();
    const $grid = $("#grid");
    const winner = () => {
        return threeInARow() || threeDown() || threeDiagonal();
    };

    const threeInARow = () => {
        return board.some((row) => {
            return row.every((cell) => cell === currentPlayer);
        });
    };

    const threeDown = () => {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (board[y][x] !== currentPlayer) {
                break;
                }
                if (y === 2) {
                return true;
                }
            }
        }
        return false;
    };

    const threeDiagonal = () => {
        return threeDiagonalLeftToRight() || threeDiagonalRightToLeft();
    };

    const threeDiagonalLeftToRight = () => {
        let y = 0;
        let x = 0;

        while (y < 3 && x < 3) {
            if (x === 2 && board[y][x] === currentPlayer) {
                return true;
            }
            if (board[y][x] === currentPlayer) {
                x++;
                y++;
            }
            if (board[y][x] !== currentPlayer) {
                return false;
            }
        }
    };

    const threeDiagonalRightToLeft = () => {
        let y = 0;
        let x = 2;

        while (y < 3 && x >= 0) {
            if (y === 2 && board[y][x] === currentPlayer) {
                return true;
            }
            if (board[y][x] === currentPlayer) {
                y++;
                x--;
            }
            if (board[y][x] !== currentPlayer) {
                return false;
            }
        }
    };

    const resetGrid = () => {
        $grid.html("");
        makeBoard();
    };

    const player1 = "X";
    const player2 = "O";

    let currentPlayer = player1;

    const switchPlayers = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };

    const restartGame = () => {
        $(".winner").css("visibility", "hidden");
        board = createBoard();
        resetGrid();
        currentPlayer = "X";
    };

    const catsGame = () => {
        return board.every((row) => row.every((cell) => cell !== null));
    };

    const handleTurn = (event) => {
        if ($(event.target).text() !== "" || winner()) {
            return;
        }
        $(event.target).text(currentPlayer);
        const { yCoordinate, xCoordinate } = $(event.target).data();
        board[yCoordinate][xCoordinate] = currentPlayer;

        if (winner()) {
            $(".winner").css("visibility", "visible");
            $(".player").text(`${currentPlayer} WINS!`);
            $(".restart").click(restartGame);
            return;
        }

        if (catsGame()) {
            $(".winner").css("visibility", "visible");
            $(".player").text("CAT'S GAME!!");
            $(".restart").click(restartGame);
        }
        switchPlayers();
    };

    const makeBoard = () => {
        board.forEach((row, yIndex) => {
            const $row = $('<div class="row"></div>');
            $grid.append($row);
            row.forEach((_, xIndex) => {
                const $cell = $(
                `<div class="cell" data-y-coordinate="${yIndex}" data-x-coordinate="${xIndex}"></div>`
                );
                $row.append($cell);
                $cell.click(handleTurn);
            });
        });
    };
    makeBoard();
});