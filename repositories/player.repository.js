const {connect} = require('../db/config');
const {QueryTypes} = require('sequelize');

class PlayerRepository {
    db = {};

    constructor() {
        this.db = connect();
    }

    async getPlayers() {
        try {
            const players = await this.db.players.findAll();
            return players;
        } catch(err) {
            console.log(err);
            return [];
        }
    }

    async getPlayerById(id) {
        try {
            const player = await this.db.players.sequelize.query(
                'SELECT id, player_name, created_on, last_login, class.name AS class_name, starting_hp, starting_mp, starting_max_inventory, region.name AS from_region ' +
                'FROM players ' +
                'JOIN player_class ON ' +
                'id = player_id ' +
                'JOIN class ON ' +
                'player_class.class_id = class.class_id ' +
                'JOIN region ON ' +
                'class.region_id = region.region_id ' +
                'WHERE id = :id', {
                    replacements: { id: parseInt(id) },
                    type: QueryTypes.SELECT,
                },
            )
            return player;
        } catch(err) {
            console.log(err)
            return {};
        }
    }
}

module.exports = new PlayerRepository();