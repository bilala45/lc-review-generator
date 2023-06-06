import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const notionKey = process.env.NOTION_KEY;
const questionDatabaseId = process.env.QUESTION_DATABASE_ID;
const reviewDatabaseId = process.env.REVIEW_DATABASE_ID;

export { notionKey, questionDatabaseId, reviewDatabaseId };
