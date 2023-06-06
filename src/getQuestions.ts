import { notionKey, databaseId } from "./config.js";
import { Client, isFullPage } from "@notionhq/client";

// Initialize notion client
const client = new Client({ auth: notionKey });

// array to store questions with Status "Done" (completed questions)
const questions: string[] = [];

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
