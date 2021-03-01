const { MongoClient } = require('mongodb');

const url =
  process.env.MONGO_URL ||
  'mongodb+srv://user:TS2jqeTox2NpyM61@m220js.bb8po.mongodb.net/';

type Connect = {
  col: string;
  query: any;
  options: any;
};

export const connectFind = ({ col, query, options }: Connect) => {
  const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

  return new Promise((req, rej) => {
    mongoClient.connect(async function (err: any, client: any) {
      if (err) rej(err);

      const db = client.db('zaglushka');
      const collection = db.collection(col);

      const items = (await collection.find(query, options).toArray()) || {
        items: [],
      };

      req({ items, total: items.length });

      client.close();
    });
  });
};

export const connectFindOne = ({ col, query, options }: Connect) => {
  const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

  return new Promise((req, rej) => {
    mongoClient.connect(async function (err: any, client: any) {
      if (err) rej(err);

      const db = client.db('zaglushka');
      const collection = db.collection(col);

      const data = (await collection.findOne(query, options)) || {};

      req(data);

      client.close();
    });
  });
};
