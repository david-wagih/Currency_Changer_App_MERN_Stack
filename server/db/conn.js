"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Db = process.env.ATLAS_URI;
// @ts-ignore
const client = new mongodb_1.MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var _db;
module.exports = {
    connectToServer: function (callback) {
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
