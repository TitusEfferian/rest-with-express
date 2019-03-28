var MongoClient = require('mongodb').MongoClient
var MongoDb = require('mongodb')
var assert = require('assert')


const insertDocuments = function (db, callback) {
    const collection = db.collection('documents')
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    })
}

const removeDocument = function (db, callback) {
    const collection = db.collection('documents');
    collection.deleteOne({ a: 3 }, function (err, result) {
        assert.equal(err, null);
        console.log(result.result)
        assert.equal(1, result.result.n)
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

const indexCollection = function (db, callback) {
    db.collection('documents').createIndex(
        { "a": 1 },
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

MongoClient.connect('mongodb://admin:admin@cluster0-shard-00-00-qmjke.mongodb.net:27017,cluster0-shard-00-01-qmjke.mongodb.net:27017,cluster0-shard-00-02-qmjke.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', function (err, client) {
    assert.equal(null, err)
    console.log('success')

    const db = client.db('myproject')

    db.collection('mahasiswa').insertOne({
        nim:'1901475255',
        nama:'titus efferian',
    },function(err,r){
        assert.equal(null,err)
        assert.equal(1,r.insertedCount)
        client.close()
    })
})
