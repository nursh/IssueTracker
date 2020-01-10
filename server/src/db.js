import mongodb from 'mongodb';

async function initDb() {
  const MongoClient = mongodb.MongoClient;
  const url = process.env.DB_URL;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    console.log('Connected to DB...');
    const db = client.db();
    return db;
  } catch (err) {
    console.error(err);
  }
}

export default async function setDB() {
  const database = await initDb();
  return database;
}
