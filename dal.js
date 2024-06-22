const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv").config();
const { ServerApiVersion } = require('mongodb');
const urlMongoDB  = process.env.MONGODB_URI;
let db = null;

const client = new MongoClient(urlMongoDB, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useUnifiedTopology: true
    }
  });
  
  client.connect( (err, connectedClient) => {
      if (err) {
          console.error('Failed to connect to the database:', err);
          return;
      }
      console.log("Successfully connected to the db server");
      db = connectedClient.db('fullstackbank');
  });

  function create(name, email, uid) {
      return new Promise((resolve, reject) => {
          if (!db) {
              reject(new Error('Database connection not established'));
              return;
          }
          const collection = db.collection('users');
          const doc = { name, email, uid, balance: 0 };
          collection.insertOne(doc, { w: 1 }, function (err, result) {
              err ? reject(err) : resolve(doc);
          });
      });
  }
  
  function find(email) {
      return new Promise((resolve, reject) => {
          if (!db) {
              reject(new Error('Database connection not established'));
              return;
          }
          const customers = db
              .collection('users')
              .find({ email: email })
              .toArray(function (err, docs) {
                  err ? reject(err) : resolve(docs);
              });
      });
  }
  
  function findOne(email) {
      return new Promise((resolve, reject) => {
          if (!db) {
              reject(new Error('Database connection not established'));
              return;
          }
          const customers = db
              .collection('users')
              .findOne({ email: email })
              .then((doc) => resolve(doc))
              .catch((err) => reject(err));
      });
  }
  
  function update(email, amount) {
      return new Promise((resolve, reject) => {
          if (!db) {
              reject(new Error('Database connection not established'));
              return;
          }
          const customers = db
              .collection('users')
              .findOneAndUpdate(
                  { email: email },
                  { $inc: { balance: amount } },
                  { returnOriginal: false },
                  function (err, documents) {
                      err ? reject(err) : resolve(documents);
                  }
              );
      });
  }
  
  function all() {
      return new Promise((resolve, reject) => {
          if (!db) {
              reject(new Error('Database connection not established'));
              return;
          }
          const customers = db
              .collection('users')
              .find({})
              .toArray(function (err, docs) {
                  err ? reject(err) : resolve(docs);
              });
      });
  }
  
  module.exports = { create, findOne, find, update, all };