const {Sequelize, Model, DataTypes} = require('sequelize');

const connect = () => {

    //DEV MANUAL SEQUELIZE WITH PARAMS

    const hostName = process.env.HOST;
    const userName = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const dialect = process.env.DIALECT

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000,
        },
        define: { timestamps: false }
    });

    // PROD SEQUELIZE WITH CONNECTION URI

    // const sequelize = new Sequelize(process.env.DATABASE_URL);

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.players = require("../models/player.model")(sequelize, DataTypes, Model);

    return db;
}
module.exports = {
    connect
}