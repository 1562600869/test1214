const STORAGE_PREFIX = 'huarongdao_best_';

const Storage = {
    _getKey(levelIndex) {
        const level = LEVELS[levelIndex];
        return STORAGE_PREFIX + (levelIndex + 1) + '_' + level.name;
    },

    getBestSteps(levelIndex) {
        const key = this._getKey(levelIndex);
        const value = localStorage.getItem(key);
        return value ? parseInt(value, 10) : null;
    },

    setBestSteps(levelIndex, steps) {
        const key = this._getKey(levelIndex);
        const currentBest = this.getBestSteps(levelIndex);
        if (currentBest === null || steps < currentBest) {
            localStorage.setItem(key, steps.toString());
            return true;
        }
        return false;
    },

    clearAll() {
        for (let i = 0; i < LEVELS.length; i++) {
            localStorage.removeItem(this._getKey(i));
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
