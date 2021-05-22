var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {

    if (err) console.log(err)
    else { console.log('ok') }
    client.close();
})


var lista = {};
/* GET users listing. */
router.get("/", function(req, res, next) {
    client.connect(err => {

            if (err) console.log(err)
            const collection = client.db("memoriadelixo").collection("ranking");
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    res.send(err);
                } else {

                    res.send(JSON.stringify(result));
                }
            })



            //client.close();
        })
        //db = client.getDB("myDatabase");
});

router.post("/", function(req, res, next) {
    client.connect(err => {
        const collection = client.db("memoriadelixo").collection("ranking");
        collection.insertOne(req.body, function(err, resp) {
            if (err) {
                console.log("erro", resp, err);
                throw err;
            }

            console.log("novo");
            res.send("ok");
            client.close();
        });
    });
});

module.exports = router;