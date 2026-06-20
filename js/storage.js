const STORAGE_PREFIX = 'huarongdao_best_level_';

const Storage = {
    getBestSteps(levelIndex) {
        const key = STORAGE_PREFIX + levelIndex;
        const value = localStorage.getItem(key);
        return value ? parseInt(value, 10) : null;
    },

    setBestSteps(levelIndex, steps) {
        const key = STORAGE_PREFIX + levelIndex;
        const currentBest = this.getBestSteps(levelIndex);
        if (currentBest === null || steps < currentBest) {
            localStorage.setItem(key, steps.toString());
            return true;
        }
        return false;
    },

    clearAll() {
        for (let i = 0; i < LEVELS.length; i++) {
            localStorage.removeItem(STORAGE_PREFIX + i);
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
