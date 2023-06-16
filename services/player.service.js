const playerRepository = require('../repositories/player.repository');

class PlayerService {
    constructor() {}

    async getPlayers() {
        return await playerRepository.getPlayers();
    }
    async getPlayerById(id) {
        return await playerRepository.getPlayerById(id);
    }
}

module.exports = new PlayerService();