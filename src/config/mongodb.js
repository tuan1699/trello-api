import { MongoClient } from "mongodb";
import { env } from "*/config/environment";

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    // connect tới client server
    await client.connect();
    console.log("connect successfully");

    await listDataBase(client);
  } finally {
    // Đảm bảo đóng client khi kết thúc
    await client.close();
  }
};

const listDataBase = async (client) => {
  const databaseList = await client.db().admin().listDatabases();

  console.log(databaseList);

  console.log("Your databases:");

  databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
};
