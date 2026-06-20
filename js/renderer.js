const COLORS = {
    boardBg: '#8B4513',
    boardBorder: '#654321',
    cellLine: '#654321',
    exit: '#DAA520',
    caocaoBg: '#FFD700',
    caocaoText: '#8B0000',
    hengBg: '#8B0000',
    hengText: '#FFFFFF',
    shuBg: '#654321',
    shuText: '#FFFFFF',
    xiaobingBg: '#DEB887',
    xiaobingText: '#3E2723',
    selectedBorder: '#00FF00',
    selectedGlow: 'rgba(0, 255, 0, 0.3)'
};

class Renderer {
    constructor(canvas, cellSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.boardOffsetX = 0;
        this.boardOffsetY = 0;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard() {
        const ctx = this.ctx;
        const boardWidth = BOARD_COLS * this.cellSize;
        const boardHeight = BOARD_ROWS * this.cellSize;

        this.boardOffsetX = (this.canvas.width - boardWidth) / 2;
        this.boardOffsetY = (this.canvas.height - boardHeight) / 2;

        ctx.fillStyle = COLORS.boardBg;
        ctx.fillRect(this.boardOffsetX, this.boardOffsetY, boardWidth, boardHeight);

        ctx.strokeStyle = COLORS.boardBorder;
        ctx.lineWidth = 6;
        ctx.strokeRect(this.boardOffsetX, this.boardOffsetY, boardWidth, boardHeight);

        ctx.strokeStyle = COLORS.cellLine;
        ctx.lineWidth = 1;
        for (let x = 0; x <= BOARD_COLS; x++) {
            ctx.beginPath();
            ctx.moveTo(this.boardOffsetX + x * this.cellSize, this.boardOffsetY);
            ctx.lineTo(this.boardOffsetX + x * this.cellSize, this.boardOffsetY + boardHeight);
            ctx.stroke();
        }
        for (let y = 0; y <= BOARD_ROWS; y++) {
            ctx.beginPath();
            ctx.moveTo(this.boardOffsetX, this.boardOffsetY + y * this.cellSize);
            ctx.lineTo(this.boardOffsetX + boardWidth, this.boardOffsetY + y * this.cellSize);
            ctx.stroke();
        }

        const exitX = this.boardOffsetX + EXIT_X * this.cellSize;
        const exitY = this.boardOffsetY + EXIT_Y * this.cellSize;
        const exitW = 2 * this.cellSize;
        const exitH = 2 * this.cellSize;

        ctx.fillStyle = 'rgba(218, 165, 32, 0.2)';
        ctx.fillRect(exitX, exitY, exitW, exitH);
        ctx.strokeStyle = COLORS.exit;
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(exitX, exitY, exitW, exitH);
        ctx.setLineDash([]);

        ctx.fillStyle = COLORS.exit;
        ctx.font = `${this.cellSize * 0.25}px "Noto Serif SC", serif`;
        ctx.textAlign = 'center';
        ctx.fillText('出口', exitX + exitW / 2, exitY + exitH / 2 + 8);
    }

    drawPiece(piece, isSelected = false) {
        const ctx = this.ctx;
        const x = this.boardOffsetX + piece.x * this.cellSize;
        const y = this.boardOffsetY + piece.y * this.cellSize;
        const w = piece.width * this.cellSize;
        const h = piece.height * this.cellSize;
        const padding = 4;
        const radius = 8;

        if (isSelected) {
            ctx.shadowColor = COLORS.selectedGlow;
            ctx.shadowBlur = 20;
        }

        let bgColor, textColor, text;
        switch (piece.type) {
            case PIECE_TYPES.CAOCAO:
                bgColor = COLORS.caocaoBg;
                textColor = COLORS.caocaoText;
                text = '曹';
                break;
            case PIECE_TYPES.HENG:
                bgColor = COLORS.hengBg;
                textColor = COLORS.hengText;
                text = '将';
                break;
            case PIECE_TYPES.SHU:
                bgColor = COLORS.shuBg;
                textColor = COLORS.shuText;
                text = '兵';
                break;
            case PIECE_TYPES.XIAOBING:
                bgColor = COLORS.xiaobingBg;
                textColor = COLORS.xiaobingText;
                text = '卒';
                break;
            default:
                bgColor = '#999';
                textColor = '#000';
                text = '?';
        }

        ctx.fillStyle = bgColor;
        this.roundRect(ctx, x + padding, y + padding, w - padding * 2, h - padding * 2, radius);
        ctx.fill();

        if (isSelected) {
            ctx.shadowBlur = 0;
            ctx.strokeStyle = COLORS.selectedBorder;
            ctx.lineWidth = 4;
            this.roundRect(ctx, x + padding, y + padding, w - padding * 2, h - padding * 2, radius);
            ctx.stroke();
        }

        ctx.fillStyle = textColor;
        ctx.font = `bold ${this.cellSize * 0.5}px "Noto Serif SC", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + w / 2, y + h / 2);
    }

    drawPieces(pieces, selectedPieceId = null) {
        for (const piece of pieces) {
            this.drawPiece(piece, piece.id === selectedPieceId);
        }
    }

    roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    render(board, selectedPieceId = null) {
        this.clear();
        this.drawBoard();
        this.drawPieces(board.pieces, selectedPieceId);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Renderer, COLORS };
}
