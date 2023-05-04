const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.FEATURE_FLAG_MONGODB_URL;
const dbName = process.env.MONGODB_FEATURE_COLLECTION;
let driver = {};

const client = new MongoClient(url);
client.connect((err, conn) => {
    driver = conn.db(dbName);
});

const getFeatureList = async () => {
    let proj = {
        _id: 1,
        client: 1,
        instance: 1,
        product: 1,
        project: 1,
        features: 1
    };
    let query = {
        // $and: []
    };
    let data = await driver.collection('clientfeatures').find(query, {fields: proj}).toArray();
    return data;
};

const updateFeatureList = async (clientFeatureData) => {
    let query = {
        client: clientFeatureData.client,
        instance: clientFeatureData.instance,
        product: clientFeatureData.product,
        project: clientFeatureData.project
    }
    let updateDataResponse = await driver.collection('clientfeatures').updateOne(query, { $set: { read: true, features: clientFeatureData.features } })
    return updateDataResponse;
}

const getClientFeatures = async (query) => {
    let proj = {
        features: 1
    };
    let featureList = await driver.collection('clientfeatures').findOne(query, { fields: proj });
    return featureList;
}

module.exports = {
    getFeatureList,
    updateFeatureList,
    getClientFeatures
};