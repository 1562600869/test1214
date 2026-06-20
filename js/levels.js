const PIECE_TYPES = {
    CAOCAO: 'caocao',
    HENG: 'heng',
    SHU: 'shu',
    XIAOBING: 'xiaobing'
};

const PIECE_SIZES = {
    caocao: { width: 2, height: 2 },
    heng: { width: 2, height: 1 },
    shu: { width: 1, height: 2 },
    xiaobing: { width: 1, height: 1 }
};

const LEVELS = [
    {
        name: "横刀立马",
        pieces: [
            { type: PIECE_TYPES.CAOCAO, x: 1, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 0 },
            { type: PIECE_TYPES.SHU, x: 3, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 2 },
            { type: PIECE_TYPES.HENG, x: 1, y: 2 },
            { type: PIECE_TYPES.SHU, x: 3, y: 2 },
            { type: PIECE_TYPES.XIAOBING, x: 0, y: 4 },
            { type: PIECE_TYPES.XIAOBING, x: 1, y: 4 },
            { type: PIECE_TYPES.XIAOBING, x: 2, y: 4 },
            { type: PIECE_TYPES.XIAOBING, x: 3, y: 4 }
        ]
    },
    {
        name: "指挥若定",
        pieces: [
            { type: PIECE_TYPES.CAOCAO, x: 1, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 0 },
            { type: PIECE_TYPES.SHU, x: 3, y: 0 },
            { type: PIECE_TYPES.HENG, x: 0, y: 2 },
            { type: PIECE_TYPES.HENG, x: 2, y: 2 },
            { type: PIECE_TYPES.XIAOBING, x: 0, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 1, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 2, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 3, y: 3 }
        ]
    },
    {
        name: "将拥曹营",
        pieces: [
            { type: PIECE_TYPES.CAOCAO, x: 1, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 1 },
            { type: PIECE_TYPES.SHU, x: 3, y: 1 },
            { type: PIECE_TYPES.HENG, x: 0, y: 3 },
            { type: PIECE_TYPES.HENG, x: 2, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 0, y: 0 },
            { type: PIECE_TYPES.XIAOBING, x: 3, y: 0 },
            { type: PIECE_TYPES.XIAOBING, x: 0, y: 4 },
            { type: PIECE_TYPES.XIAOBING, x: 3, y: 4 }
        ]
    },
    {
        name: "齐头并进",
        pieces: [
            { type: PIECE_TYPES.CAOCAO, x: 1, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 0 },
            { type: PIECE_TYPES.SHU, x: 3, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 2 },
            { type: PIECE_TYPES.SHU, x: 3, y: 2 },
            { type: PIECE_TYPES.HENG, x: 1, y: 2 },
            { type: PIECE_TYPES.XIAOBING, x: 1, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 2, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 0, y: 4 },
            { type: PIECE_TYPES.XIAOBING, x: 3, y: 4 }
        ]
    },
    {
        name: "兵分三路",
        pieces: [
            { type: PIECE_TYPES.CAOCAO, x: 0, y: 0 },
            { type: PIECE_TYPES.SHU, x: 2, y: 0 },
            { type: PIECE_TYPES.SHU, x: 3, y: 0 },
            { type: PIECE_TYPES.HENG, x: 2, y: 2 },
            { type: PIECE_TYPES.SHU, x: 0, y: 2 },
            { type: PIECE_TYPES.XIAOBING, x: 1, y: 2 },
            { type: PIECE_TYPES.XIAOBING, x: 1, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 2, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 3, y: 3 }
        ]
    }
];

function validateLevel(level) {
    const grid = Array(5).fill(null).map(() => Array(4).fill(false));
    for (const piece of level.pieces) {
        const size = PIECE_SIZES[piece.type];
        for (let dy = 0; dy < size.height; dy++) {
            for (let dx = 0; dx < size.width; dx++) {
                const gx = piece.x + dx;
                const gy = piece.y + dy;
                if (gx < 0 || gx >= 4 || gy < 0 || gy >= 5) {
                    console.error(`Level "${level.name}": piece ${piece.type} at (${piece.x},${piece.y}) out of bounds`);
                    return false;
                }
                if (grid[gy][gx]) {
                    console.error(`Level "${level.name}": overlap at (${gx},${gy})`);
                    return false;
                }
                grid[gy][gx] = true;
            }
        }
    }
    return true;
}

for (let i = 0; i < LEVELS.length; i++) {
    if (!validateLevel(LEVELS[i])) {
        console.error(`Level ${i + 1} "${LEVELS[i].name}" validation failed!`);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PIECE_TYPES, PIECE_SIZES, LEVELS };
}
