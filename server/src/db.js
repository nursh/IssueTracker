import mongodb from 'mongodb';

export default async function initDb() {
  const MongoClient = mongodb.MongoClient;
  const url = `${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds045511.mlab.com:45511/issues-tracker`;
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch(err) {
    console.error
  }
}

