import dbConfig from "../config/dbConfig";

import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Token } from "./models/Token";

/*
  Configure database connection details here. Also include the models you will be working with 
*/

const sequelizeConnection = new Sequelize({
  database: dbConfig.DB,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  dialect: "mysql",
  host: dbConfig.HOST,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.aquire,
    idle: dbConfig.pool.idle,
  },
  // models: [User, Token],
  models: [User],
});

export default sequelizeConnection;
