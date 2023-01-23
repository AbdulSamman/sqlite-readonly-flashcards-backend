import Database from "better-sqlite3";
import { ICategories, IFlashcard } from "./interfaces.js";
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

export const getFlashCard = (id: number): IFlashcard => {
  const stmt = db.prepare("SELECT * FROM flashcards WHERE id = ?").get(id);

  if (stmt === undefined) {
    return stmt;
  } else {
    const flashCard: IFlashcard = {
      ...stmt,
    };
    return flashCard;
  }
};

export const getCategories = () => {
  const stmt =
    db.prepare(`SELECT f.category as idCode, c.name as name, f.total FROM (SELECT category, COUNT(*) AS total FROM flashcards GROUP BY category) as f
    INNER JOIN categories AS c ON f.category = c.idCode
    ORDER BY c.name	`);
  const categories: ICategories[] = [];
  for (let category of stmt.iterate()) {
    categories.push(category);
  }

  return categories;
};

export const getFlashcardsWithCategory = (category: string): IFlashcard[] => {
  const rows = db
    .prepare("SELECT * FROM flashcards WHERE category = ?")
    .all(category);
  const flashcards: IFlashcard[] = [];
  for (let row of rows) {
    flashcards.push(row);
  }
  return flashcards;
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
    a {
		background-color: #222;
		color: yellow;
	}

    </style>

    <h1>SQLite Site API</h1>
    <ul>
	<li><a href="flashcards">/flashcards</a> - all flashcards</li>
	<li><a href="flashcards/2798">/flashcards/2798</a> - flashcard with id 2798</li>
	<li><a href="flashcards/categories/git">/flashcards/categories/git</a> - all flashcards in category git</li>
	<li><a href="categories">/categories</a> - all categories with totals</li>
</ul>
    
    `;
};
