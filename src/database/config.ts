import dbConfig from "../config/dbConfig";

import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Token } from "./models/Token";
import { Ticket } from "./models/Ticket";
import { UserTicket } from "./models/UserTicket";
import { Comment } from "./models/Comment";

/*
  Configure database connection details here. Also include the models you will be working with 
*/

const sequelizeConnection = new Sequelize({
   database: dbConfig.DB,
   username: dbConfig.USER,
   password: dbConfig.PASSWORD,
   dialect: "mysql",
   //  dialectOptions: {
   //     socketPath: "/tmp/mysql.sock",
   //     supportBigNumbers: true,
   //     bigNumberStrings: true,
   //  },
   host: dbConfig.HOST,
   pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.aquire,
      idle: dbConfig.pool.idle,
   },
   // models: [User, Token],
   models: [User, Ticket, UserTicket, Comment],
});

export default sequelizeConnection;
