import express, { Application, Express, Request, Response } from "express";
import cors from "cors";
import router from "./api/routes/index";
import dbInit from "./db/init";
import passport from "passport";
import strategy from "./api/services/authService";

const app: Application = express();
const PORT = process.env.PORT || 8080;

dbInit();

var corOptions = {
  origin: `http://localhost:${PORT}`,
};

// middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(strategy);
app.use(passport.initialize());

//routers and routes

app.use("/api", router);

app.use("/home", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Alive on ${PORT}`));
