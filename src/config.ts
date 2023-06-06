import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const notionKey = process.env.NOTION_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

export { notionKey, databaseId };
