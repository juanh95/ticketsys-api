import express from "express";
import cors from "cors";
import router from "./routes/userRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

var corOptions = {
  origin: `http://localhost:${PORT}`,
};

// middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers and routes
app.use("/api/users", router);
app.use("/home", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Alive on ${PORT}`));
