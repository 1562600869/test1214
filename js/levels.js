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
            { type: PIECE_TYPES.HENG, x: 0, y: 2 },
            { type: PIECE_TYPES.SHU, x: 0, y: 3 },
            { type: PIECE_TYPES.SHU, x: 3, y: 2 },
            { type: PIECE_TYPES.HENG, x: 1, y: 2 },
            { type: PIECE_TYPES.XIAOBING, x: 1, y: 3 },
            { type: PIECE_TYPES.XIAOBING, x: 2, y: 3 },
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
            { type: PIECE_TYPES.HENG, x: 0, y: 0 },
            { type: PIECE_TYPES.HENG, x: 2, y: 0 },
            { type: PIECE_TYPES.SHU, x: 0, y: 1 },
            { type: PIECE_TYPES.SHU, x: 3, y: 1 },
            { type: PIECE_TYPES.HENG, x: 0, y: 3 },
            { type: PIECE_TYPES.HENG, x: 2, y: 3 },
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PIECE_TYPES, PIECE_SIZES, LEVELS };
}
