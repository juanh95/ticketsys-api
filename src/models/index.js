import dbConfig from "../../config/dbConfig.js";
import { Sequelize, DataTypes } from "sequelize";
import { initUserModel } from "./userModel.js";

/*
  Entry point for database ititialization, model creation, and sync
*/

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.aquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to the ${dbConfig.DB} Database`);
  })
  .catch((error) => {
    console.error(`Unable to connect to ${dbConfig.DB} due to: `, error);
  });

// Creating the dabase JS object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Feeding the models
db.Users = initUserModel(sequelize, DataTypes);

// Database sync
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Sync Complete");
  })
  .catch((error) => {
    console.error("Unable to Sync Due to: ", error);
  });

export default db;
