import dbConfig from "../config/dbConfig";
import sequelizeConnection from "./config";
// const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  sequelizeConnection
    // testing the connection
    .authenticate()
    .then(() => {
      console.log(`Connected to the ${dbConfig.DB} Database`);
    })
    .catch((error) => {
      console.error(`Unable to connect to ${dbConfig.DB} due to: `, error);
    });

  sequelizeConnection
    //syncing models
    .sync({ force: false })
    .then(() => {
      console.log("Database Sync Complete");
    })
    .catch((error) => {
      console.log("Unable to sync db due to: ", error);
    });
};

export default dbInit;
