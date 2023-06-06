import { notionKey, databaseId } from "./config.js";
import { Client, isFullPage } from "@notionhq/client";

// Initialize notion client
const client = new Client({ auth: notionKey });

console.log(">>> Getting questions from database\n");

// Query database for rows with Status "Done"
const database = await (() => {
  try {
    return client.databases.query({
      database_id: databaseId!,
      filter: {
        property: "Status",
        status: {
          equals: "Done",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
})();

// array to store questions with Status "Done" (completed questions)
const questions: string[] = [];

// build questions array from database content
database?.results.forEach((row) => {
  if (isFullPage(row) && "title" in row.properties.Name) {
    questions.push(row.properties.Name.title[0].plain_text);
  }
});

export default questions;
