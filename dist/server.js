import express from "express";
import dotenv from "dotenv";
import * as model from "./model.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.status(200).send(model.getApiInstructions());
});
app.listen(port, () => {
    console.log(`server listining on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map