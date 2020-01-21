import mongodb from 'mongodb';

async function initDb() {
  const MongoClient = mongodb.MongoClient;
  const url =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_URL
      : process.env.DB_URL;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch (err) {
    throw new Error(err);
  }
}

export default async function setDB() {
  const database = await initDb();
  return database;
}
