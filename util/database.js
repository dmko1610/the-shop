const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const db =
  "mongodb+srv://dmko1610:ta4Q6ut7ap3wYUv7@trigger-cluster-arnah.gcp.mongodb.net/test?retryWrites=true&w=majority";
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(db, { useUnifiedTopology: true })
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (!!_db) {
    return _db;
  }
  throw "No Database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
