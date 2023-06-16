const {STRING, DATE} = require("sequelize");
module.exports = (sequelize, DataTypes, Model) => {

    class Player extends Model {}

    Player.init({
        player_name: {
            type: STRING,
            allowNull: false
        },
        password: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type: STRING,
            allowNull: false,
        },
        created_on: {
            type: DATE,
            allowNull: false
        },
        last_login: {
            type: DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'players'
    })

    return Player

}