import dbConfig from "../config/dbConfig";

import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Token } from "./models/Token";
import { Ticket } from "./models/Ticket";
import { UserTicket } from "./models/UserTicket";
import { Comment } from "./models/Comment";
import { UserGroup } from "./models/UserGroup";
import { Group } from "./models/Group";

/*
  Configure database connection details here. Also include the models you will be working with 
*/

// const sequelizeConnection = new Sequelize({
//    database: dbConfig.DB,
//    username: dbConfig.USER,
//    password: dbConfig.PASSWORD,
//    dialect: dbConfig.DIALECT,
//    //  dialectOptions: {
//    //     socketPath: "/tmp/mysql.sock",
//    //     supportBigNumbers: true,
//    //     bigNumberStrings: true,
//    //  },
//    host: dbConfig.HOST,
//    pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle,
//    },
//    // models: [User, Token],
//    models: [User, Ticket, UserTicket, Comment, UserGroup, Group],
// });

const sequelizeConnection = new Sequelize(
   dbConfig.DB, // connection uri
   dbConfig.USER,
   dbConfig.PASSWORD,
   {
      dialect: "mysql",
      host: dbConfig.HOST,
      pool: {
         max: +dbConfig.pool.max,
         min: +dbConfig.pool.min,
         acquire: +dbConfig.pool.acquire,
         idle: +dbConfig.pool.idle,
      },
      models: [User, Ticket, UserTicket, Comment, UserGroup, Group],
   }
);

export default sequelizeConnection;
