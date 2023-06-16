const playerService = require('../services/player.service');

class PlayerController {
    async getPlayers() {
        return await playerService.getPlayers();
    }
    async getPlayerById(id) {
        return await playerService.getPlayerById(id);
    }
}

module.exports = new PlayerController();