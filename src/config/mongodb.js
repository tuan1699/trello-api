import { MongoClient } from "mongodb";
import { env } from "*/config/environment";

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // connect tới client server
  await client.connect();

  // gán lại clientDb vào dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// const listDataBase = async (client) => {
//   const databaseList = await client.db().admin().listDatabases();

//   console.log(databaseList);

//   console.log("Your databases:");

//   databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
// };

// Get database instance
export const getDb = () => {
  if (!dbInstance) throw new Error("Must connect to Database first");
  return dbInstance;
};
