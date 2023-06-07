import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints.js";
import { notionKey } from "./config.js";
import { Client, isFullPage } from "@notionhq/client";

export default class QueryDatabase {
  private client: Client;
  private databaseId: string;
  private filter: any;
  questions: string[];

  constructor(databaseId: string, filter: any) {
    // Initialize fields
    this.client = new Client({ auth: notionKey });
    this.databaseId = databaseId;
    this.filter = filter;
    this.questions = [];
  }

  // initializes questions using contents of database
  // returns a promise that we can wait on to initialize questions array
  async initializeQuestions(): Promise<void> {
    try {
      const database = await this.getDatabaseRows();

      // build questions array from database content
      database?.results.forEach((row) => {
        if (isFullPage(row) && "title" in row.properties.Name) {
          this.questions.push(row.properties.Name.title[0].plain_text);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Queries database and returns a QueryDatabaseResponse object of rows
  private async getDatabaseRows(): Promise<QueryDatabaseResponse> {
    try {
      return await this.client.databases.query({
        database_id: this.databaseId!,
        filter: this.filter,
      });
    } catch (e) {
      throw e;
    }
  }
}
