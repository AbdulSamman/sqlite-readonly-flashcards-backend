import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as model from "./model.js";
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(model.getApiInstructions());
});

// app.get("/test", (req: express.Request, res: express.Response) => {
//   const dateTime = new Date();
//   res.status(200).json({
//     message: `API test accessed at ${dateTime.toTimeString()}`,
//   });
// });

app.get("/flashcards", (req: express.Request, res: express.Response) => {
  res.status(200).json(model.getFlashCards());
});

app.get("/flashcards/:id", (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({
      error: true,
      message: "sent string, should be number",
    });
  } else {
    const flashCard = model.getFlashCard(id);
    if (flashCard === undefined) {
      res.status(404).send({
        error: true,
        message: "id did not correspond to an existing item",
      });
    } else {
      res.json(flashCard);
    }
  }
});

app.get(
  "/flashCards/categories/:category",
  (req: express.Request, res: express.Response) => {
    const category = req.params.category;
    res.json(model.getFlashcardsWithCategory(category));
  }
);

app.get("/categories", (req: express.Request, res: express.Response) => {
  res.status(200).json(model.getCategories());
});

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
