const BOARD_COLS = 4;
const BOARD_ROWS = 5;
const EXIT_X = 1;
const EXIT_Y = 3;

class Board {
    constructor() {
        this.pieces = [];
        this.grid = [];
    }

    loadLevel(levelData) {
        this.pieces = levelData.pieces.map((p, idx) => ({
            id: idx,
            type: p.type,
            x: p.x,
            y: p.y,
            width: PIECE_SIZES[p.type].width,
            height: PIECE_SIZES[p.type].height
        }));
        this.updateGrid();
    }

    updateGrid() {
        this.grid = Array(BOARD_ROWS).fill(null).map(() => Array(BOARD_COLS).fill(null));
        for (const piece of this.pieces) {
            for (let dy = 0; dy < piece.height; dy++) {
                for (let dx = 0; dx < piece.width; dx++) {
                    const gx = piece.x + dx;
                    const gy = piece.y + dy;
                    if (gx >= 0 && gx < BOARD_COLS && gy >= 0 && gy < BOARD_ROWS) {
                        this.grid[gy][gx] = piece.id;
                    }
                }
            }
        }
    }

    getPieceAt(gridX, gridY) {
        if (gridX < 0 || gridX >= BOARD_COLS || gridY < 0 || gridY >= BOARD_ROWS) {
            return null;
        }
        const pieceId = this.grid[gridY][gridX];
        if (pieceId === null) return null;
        return this.pieces.find(p => p.id === pieceId);
    }

    getPieceByClientXy(clientX, clientY, canvas, cellSize, boardOffsetX, boardOffsetY) {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left - boardOffsetX;
        const y = clientY - rect.top - boardOffsetY;
        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(y / cellSize);
        return this.getPieceAt(gridX, gridY);
    }

    canMove(piece, direction) {
        if (!piece) return false;

        let newX = piece.x;
        let newY = piece.y;

        switch (direction) {
            case 'up': newY -= 1; break;
            case 'down': newY += 1; break;
            case 'left': newX -= 1; break;
            case 'right': newX += 1; break;
            default: return false;
        }

        if (newX < 0 || newX + piece.width > BOARD_COLS ||
            newY < 0 || newY + piece.height > BOARD_ROWS) {
            return false;
        }

        for (let dy = 0; dy < piece.height; dy++) {
            for (let dx = 0; dx < piece.width; dx++) {
                const gx = newX + dx;
                const gy = newY + dy;
                if (this.grid[gy][gx] !== null && this.grid[gy][gx] !== piece.id) {
                    return false;
                }
            }
        }

        return true;
    }

    getMoveDirection(piece, targetGridX, targetGridY) {
        if (!piece) return null;

        const px = piece.x;
        const py = piece.y;
        const pw = piece.width;
        const ph = piece.height;

        if (targetGridX >= px && targetGridX < px + pw && targetGridY === py - 1) {
            return 'up';
        }
        if (targetGridX >= px && targetGridX < px + pw && targetGridY === py + ph) {
            return 'down';
        }
        if (targetGridY >= py && targetGridY < py + ph && targetGridX === px - 1) {
            return 'left';
        }
        if (targetGridY >= py && targetGridY < py + ph && targetGridX === px + pw) {
            return 'right';
        }

        return null;
    }

    movePiece(piece, direction) {
        if (!this.canMove(piece, direction)) return false;

        switch (direction) {
            case 'up': piece.y -= 1; break;
            case 'down': piece.y += 1; break;
            case 'left': piece.x -= 1; break;
            case 'right': piece.x += 1; break;
        }

        this.updateGrid();
        return true;
    }

    isWin() {
        const caocao = this.pieces.find(p => p.type === PIECE_TYPES.CAOCAO);
        if (!caocao) return false;
        return caocao.x === EXIT_X && caocao.y === EXIT_Y;
    }

    clone() {
        const newBoard = new Board();
        newBoard.pieces = this.pieces.map(p => ({ ...p }));
        newBoard.updateGrid();
        return newBoard;
    }

    restoreFrom(other) {
        this.pieces = other.pieces.map(p => ({ ...p }));
        this.updateGrid();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Board, BOARD_COLS, BOARD_ROWS, EXIT_X, EXIT_Y };
}
