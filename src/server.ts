import express, { Application, Express, Request, Response } from "express";
import cors from "cors";
import router from "./api/routes/index";
import dbInit from "./database/init";
import passport from "passport";
import strategy from "./config/passportConfig";
import { errorHandler } from "./lib/errorHandler";

const app: Application = express();
const PORT = process.env.PORT || 8080;

dbInit();

// var corOptions = {
//   origin: `http://localhost:${PORT}`,
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// middleware
// app.use(cors(corOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(strategy);
app.use(passport.initialize());

//routers and routes

app.use("/api", router);

app.use("/home", (req, res) => {
   res.send("Hello World");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Alive on ${PORT}`));
