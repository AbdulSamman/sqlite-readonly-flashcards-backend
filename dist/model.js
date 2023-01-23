import Database from "better-sqlite3";
import * as tools from "./tools.js";
const dbAbsolutePathAndFileName = tools.absolutifyPathAndFileName("src/data/db.sqlite");
const db = new Database(dbAbsolutePathAndFileName);
db.pragma(`journal_mode = WAL`);
export const getFlashCards = () => {
    const stmt = db.prepare("SELECT * FROM flashcards");
    const flashCards = [];
    for (const flashcard of stmt.iterate()) {
        flashCards.push(flashcard);
    }
    console.log(flashCards);
    return flashCards;
};
export const getFlashCard = (id) => {
    const stmt = db.prepare("SELECT * FROM flashcards WHERE id = ?").get(id);
    if (stmt === undefined) {
        return stmt;
    }
    else {
        const flashCard = {
            ...stmt,
        };
        return flashCard;
    }
};
export const getCategories = () => {
    const stmt = db.prepare(`SELECT f.category as categoryIdCode, c.name as categoryName, f.total FROM (SELECT category, COUNT(*) AS total FROM flashcards GROUP BY category) as f
    INNER JOIN categories AS c ON f.category = c.idCode
    ORDER BY c.name	`);
    const categories = [];
    for (let category of stmt.iterate()) {
        categories.push(category);
    }
    return categories;
};
export const getFlashcardsWithCategory = (category) => {
    const rows = db
        .prepare("SELECT * FROM flashcards WHERE category = ?")
        .all(category);
    const flashcards = [];
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
//# sourceMappingURL=model.js.map