import express from "express";
import dotenv from "dotenv";

import * as model from "./model.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(model.getApiInstructions());
});

app.get("/test", (req: express.Request, res: express.Response) => {
  const dateTime = new Date();
  res.status(200).json({
    message: `API test accessed at ${dateTime.toTimeString()}`,
  });
});

app.listen(port, () => {
  console.log(`server listining on http://localhost:${port}`);
});
