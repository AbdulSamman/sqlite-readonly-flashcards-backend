import express from "express";
import dotenv from "dotenv";
import * as model from "./model.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(model.getApiInstructions());
});

app.listen(port, () => {
  console.log(`server listining on http://localhost:${port}`);
});
