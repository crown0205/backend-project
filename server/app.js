import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./router/auth.js";
import tweetsRouter from "./router/tweets.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/tweets", tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
