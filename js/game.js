const MAX_HISTORY = 10;
const CELL_SIZE = 80;
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 520;

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.board = new Board();
        this.renderer = new Renderer(this.canvas, CELL_SIZE);

        this.currentLevel = 0;
        this.steps = 0;
        this.selectedPieceId = null;
        this.history = [];
        this.isWin = false;

        this.levelNameEl = document.getElementById('levelName');
        this.stepsEl = document.getElementById('steps');
        this.bestStepsEl = document.getElementById('bestSteps');
        this.winModal = document.getElementById('winModal');
        this.winStepsEl = document.getElementById('winSteps');
        this.newRecordEl = document.getElementById('newRecord');
        this.undoBtn = document.getElementById('undoBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.winNextBtn = document.getElementById('winNextBtn');

        this.bindEvents();
        this.loadLevel(0);
    }

    bindEvents() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextLevel());
        document.getElementById('winNextBtn').addEventListener('click', () => {
            this.hideWinModal();
            this.nextLevel();
        });
        document.getElementById('winReplayBtn').addEventListener('click', () => {
            this.hideWinModal();
            this.reset();
        });
    }

    loadLevel(levelIndex) {
        if (levelIndex < 0 || levelIndex >= LEVELS.length) return;

        this.currentLevel = levelIndex;
        this.board.loadLevel(LEVELS[levelIndex]);
        this.steps = 0;
        this.selectedPieceId = null;
        this.history = [];
        this.isWin = false;

        this.updateUI();
        this.render();
    }

    handleClick(e) {
        if (this.isWin) return;

        const pos = this.board.getGridPosition(
            e.clientX, e.clientY, this.canvas, CELL_SIZE,
            this.renderer.boardOffsetX, this.renderer.boardOffsetY
        );
        const gridX = pos.gridX;
        const gridY = pos.gridY;

        if (gridX < 0 || gridX >= BOARD_COLS || gridY < 0 || gridY >= BOARD_ROWS) {
            this.selectedPieceId = null;
            this.render();
            return;
        }

        const clickedPiece = this.board.getPieceAt(gridX, gridY);

        if (clickedPiece) {
            this.selectedPieceId = clickedPiece.id;
            this.render();
        } else if (this.selectedPieceId !== null) {
            const selectedPiece = this.board.pieces.find(p => p.id === this.selectedPieceId);
            const direction = this.board.getMoveDirection(selectedPiece, gridX, gridY);

            if (direction && this.board.canMove(selectedPiece, direction)) {
                this.saveHistory();
                this.board.movePiece(selectedPiece, direction);
                this.steps++;
                this.selectedPieceId = null;
                this.updateUI();
                this.render();

                if (this.board.isWin()) {
                    this.handleWin();
                }
            }
        }
    }

    saveHistory() {
        const state = {
            pieces: this.board.pieces.map(p => ({ ...p })),
            steps: this.steps
        };
        this.history.push(state);
        if (this.history.length > MAX_HISTORY) {
            this.history.shift();
        }
    }

    undo() {
        if (this.history.length === 0 || this.isWin) return;

        const prevState = this.history.pop();
        this.board.pieces = prevState.pieces;
        this.board.updateGrid();
        this.steps = prevState.steps;
        this.selectedPieceId = null;
        this.updateUI();
        this.render();
    }

    reset() {
        this.loadLevel(this.currentLevel);
    }

    nextLevel() {
        if (this.currentLevel >= LEVELS.length - 1) return;
        const nextIndex = this.currentLevel + 1;
        this.loadLevel(nextIndex);
    }

    handleWin() {
        this.isWin = true;
        const isNewRecord = Storage.setBestSteps(this.currentLevel, this.steps);
        this.winStepsEl.textContent = this.steps;
        this.newRecordEl.style.display = isNewRecord ? 'block' : 'none';

        if (isNewRecord) {
            this.updateUI();
        }

        setTimeout(() => this.showWinModal(), 300);
    }

    showWinModal() {
        const isLastLevel = this.currentLevel === LEVELS.length - 1;
        this.winNextBtn.disabled = isLastLevel;
        this.winNextBtn.textContent = isLastLevel ? '已通关' : '下一关';
        this.winModal.style.display = 'flex';
    }

    hideWinModal() {
        this.winModal.style.display = 'none';
    }

    updateUI() {
        this.levelNameEl.textContent = `第 ${this.currentLevel + 1} 关：${LEVELS[this.currentLevel].name}`;
        this.stepsEl.textContent = this.steps;

        const best = Storage.getBestSteps(this.currentLevel);
        this.bestStepsEl.textContent = best !== null ? best : '—';

        this.undoBtn.disabled = this.history.length === 0 || this.isWin;
        this.nextBtn.disabled = this.currentLevel === LEVELS.length - 1;
        if (this.currentLevel === LEVELS.length - 1) {
            this.nextBtn.textContent = '已通关';
        } else {
            this.nextBtn.textContent = '下一关';
        }
    }

    render() {
        this.renderer.render(this.board, this.selectedPieceId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
