import { MongoClient } from "mongodb";
const Db = process.env.ATLAS_URI;
// @ts-ignore
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db: any;

module.exports = {
  connectToServer: function (callback: any) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("currencydb");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
