import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints.js";
import { notionKey } from "./config.js";
import { Client, isFullPage } from "@notionhq/client";

class GetQuestions {
  private client: Client;
  private databaseId: string;
  questions: string[];

  constructor(databaseId: string) {
    // Initialize notion client
    this.client = new Client({ auth: notionKey });
    this.databaseId = databaseId;
    this.questions = [];
  }

  // Queries database and returns a QueryDatabaseResponse object of rows
  private async getDatabaseRows(filter: any) {
    try {
      const database = await this.client.databases.query({
        database_id: this.databaseId!,
        filter: filter,
      });
      return database;
    } catch (error) {
      console.log(error);
    }
  }

  // Extracts question name from each row in QueryDatabaseResponse object
  private getQuestionNames(database: QueryDatabaseResponse) {
    // build questions array from database content
    database?.results.forEach((row) => {
      if (isFullPage(row) && "title" in row.properties.Name) {
        this.questions.push(row.properties.Name.title[0].plain_text);
      }
    });
  }
}

// // Query database for rows with Status "Done"
// const database = () => {
//   try {
//     return client.databases.query({
//       database_id: databaseId!,
//       filter: {
//         property: "Status",
//         status: {
//           equals: "Done",
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
