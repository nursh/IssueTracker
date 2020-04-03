import mongodb from 'mongodb';

export default () => {
  const MongoClient = mongodb.MongoClient;
  const url = process.env.TEST_DB_URL;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.close();
};
