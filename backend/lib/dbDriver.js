const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_COLLECTION;

let driver = {};

const init = (callback) => {
    const client = new MongoClient(url);
    client.connect((err, conn) => {
        driver = conn.db(dbName);
        return callback(err);
    });
};

const get = () => {
    return driver;
};

const findOne = (collName, query, proj, callback) => {
    driver.collection(collName).findOne(query, { fields: proj }, (err, result) => {
        callback(err, result);
    })
};

// Insert a specified document to a collection
const insertOne = (collname, doc, callback) => {
    driver.collection(collname).insertOne(doc, (err, result) => {
        callback(err, result);
    })
};


// Count the docs that match the query. Can be used to confirm if a doc exists in db when limit set to 1.
const count = (collname, query, limit, callback) => {
    driver.collection(collname).countDocuments(query, {limit: limit}, (err, count) => {
        callback(err, count);
    });
};


const find = (collname, query, proj, skip, limit, callback) => {
    driver.collection(collname).find(query, {fields: proj})
    .skip(skip)
    .limit(limit)
    .toArray((err, data) => {
        callback(err, data); // data -> array of docs
    });
};

// Only set document fields
const setOne = (collname, query, doc, callback) => {
    driver.collection(collname).updateOne(query, {$set: doc}, (err, result) => {
        callback(err, result);
    });
};

// Generic update to document fields
const updateOne = (collname, query, doc, callback) => {
    driver.collection(collname).updateOne(query, doc, (err, result) => {
        callback(err, result);
    });
};

const updateMany = (collname, query, doc, callback) => {
    driver.collection(collname).updateMany(query, doc, (err, result) => {
        callback(err, result);
    });
};

const aggregate = (collname, pipeline, callback) => {
    driver.collection(collname).aggregate(pipeline).toArray((err, result) => {
        callback(err, result);
    });
};

const createIndex = (collname, fields, options, callback) => {
    driver.collection(collname).createIndex(fields, options, (err, result) => {
        callback(err, result);
    });
}

const remove = (collname, query, justOne, callback) => {
    driver.collection(collname).remove(query, { justOne }, (err, result) => {
        callback(err, result);
    });
};

const findOneAndUpdate = (collname, query, update, projection, returnOriginal, callback) => {
    driver.collection(collname).findOneAndUpdate(query, update, { projection, returnOriginal }, (err, result) => {
        callback(err, result);
    });
};

// Find an array of distinct values of a field, for a given query
const findDistinct = (collname, fieldName, query, callback) => {
    driver.collection(collname).distinct(fieldName, query, (err, result) => {
        callback(err, result);
    });
};

module.exports = {
    init,
    get,
    findOne,
    insertOne,
    count,
    find,
    setOne,
    updateOne,
    aggregate,
    createIndex,
    remove,
    findOneAndUpdate,
    updateMany,
    findDistinct
}