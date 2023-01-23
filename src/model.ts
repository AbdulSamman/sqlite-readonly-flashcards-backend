import Database from "better-sqlite3";
import { IFlashcard } from "./interfaces.js";
import * as tools from "./tools.js";

const dbAbsolutePathAndFileName =
  tools.absolutifyPathAndFileName("src/data/db.sqlite");
const db = new Database(dbAbsolutePathAndFileName);
db.pragma(`journal_mode = WAL`);

export const getFlashCards = (): IFlashcard[] => {
  const stmt = db.prepare("SELECT * FROM flashcards");
  const flashCards: IFlashcard[] = [];
  for (const flashcard of stmt.iterate()) {
    flashCards.push(flashcard);
  }
  console.log(flashCards);

  return flashCards;
};

export const getCategories = () => {
  const stmt = db.prepare("SELECT * FROM categories");
  const categories = [];
  for (let category of stmt.iterate()) {
    categories.push(category);
  }

  return categories;
};

export const getApiInstructions = () => {
  return `
    
    <style>
    body{
        background-color: #333;
        color:#eee;
        padding: 1rem;
        font-family: courier;
    }
    h1{
        color: gold
    }

    </style>

    <h1>SQLite Site API</h1>
    
    `;
};
