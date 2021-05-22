var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
/* GET users listing. */
router.get('/', function(req, res, next) {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("memoriadelixo").collection("ranking");
        res.send(collection)
            //client.close();
    });


});
router.post('/', function(req, res, next) {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("memoriadelixo").collection("ranking");
        collection.insertOne(req.body, function(err, resp) {
            if (err) {
                console.log('erro', resp, err)
                throw err
            }

            console.log("novo usuario inserido");
            res.send('ok')
        })

    })

});

module.exports = router;