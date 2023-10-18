import express, { Application, Express, Request, Response } from "express";
import cors from "cors";
import router from "./api/routes/index";
import dbInit from "./database/init";
import passport from "passport";
import strategy from "./config/passportConfig";
import { errorHandler } from "./lib/errorHandler";

const app: Application = express();
const PORT = process.env.PORT || 8080;

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
passport.use(strategy);
app.use(passport.initialize());

if (process.env.NODE_ENV_M != "True") {
   dbInit()
      .then(() => {
         console.log("Connected and synced to database...");
      })
      .catch((error) => {
         // console.error("Error initializing the database:", error);

         // TODO: separate and note the initialization and the connection
         console.error("Error initializing and connecting to the database");
      });
}

//routers and routes

app.use("/api", router);

app.use("/home", (req, res) => {
   return res.status(200).json("Welcome to the Ticketing System API");
});

// Catch all unspecified routes
app.all("*", (req, res) => {
   return res.status(404).json("Page not found");
});

app.use(errorHandler);

module.exports = app.listen(PORT, () =>
   console.log(`Listening to requests on Port ${PORT}`)
);

// var corOptions = {
//   origin: `http://localhost:${PORT}`,
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
