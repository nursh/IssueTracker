import mongodb from 'mongodb';

let db;

export async function initDb() {
  const MongoClient = mongodb.MongoClient;
  const url = process.env.DB_URL;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    console.log('Connected to DB...');
    db = client.db();
  } catch (err) {
    console.error(err);
  }
}

export function getDb() {
  return db;
}
