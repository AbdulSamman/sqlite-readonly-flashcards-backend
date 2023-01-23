import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as model from "./model.js";
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.status(200).send(model.getApiInstructions());
});
app.get("/test", (req, res) => {
    const dateTime = new Date();
    res.status(200).json({
        message: `API test accessed at ${dateTime.toTimeString()}`,
    });
});
app.get("/flashcards", (req, res) => {
    res.status(200).json(model.getFlashCards());
});
app.get("/categories", (req, res) => {
    res.status(200).json(model.getCategories());
});
app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map