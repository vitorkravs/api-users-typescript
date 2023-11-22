import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(
      `mongodb+srv://${username}:${password}@cluster0.5rhvovz.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb");
  },
};
