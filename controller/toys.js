var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://RbCrow:gch18120@cluster0-snylr.mongodb.net/test';

module.exports = {
    library: async (req, res) => {
        let client = await MongoClient.connect(url);
        let dbo = client.db("Library");
        let results = await dbo.collection("Toys").find({}).toArray();
        res.render('toys/library', { toys: results });
    },
    detail: async (req, res) => {
        let id = req.query.id;
        var ObjectID = require('mongodb').ObjectID;

        let client = await MongoClient.connect(url);
        let dbo = client.db("Library");

        let result = await dbo.collection("Toys").findOne({ "_id": ObjectID(id) });
        
        res.render('toys/detail', { toy: result });
    },
    doUpdate: async (req, res) => {
        let id = req.body.id;
        let toyid = req.body.toyid;
        let toy = req.body.toy;
        let image = req.body.image;
        let price = req.body.price;
        let amount = req.body.amount;

        let newValues = { $set: {toyid : toyid, image: image, toy: toy, price: price, amount: amount } };
        
        var ObjectID = require('mongodb').ObjectID;

        let condition = { "_id": ObjectID(id) };

        let client = await MongoClient.connect(url);
        let dbo = client.db("Library");
        await dbo.collection("Toys").updateOne(condition, newValues);

        res.redirect('/');
    },
    delete: async (req, res) => {
        let id = req.body.id;
        var ObjectID = require('mongodb').ObjectID;
        
        let condition = { "_id": ObjectID(id) };

        let client = await MongoClient.connect(url);
        let dbo = client.db("Library");
        await dbo.collection("Toys").deleteOne(condition);

        res.redirect('/');
    },
    insert: function (req, res) {
        res.render('toys/insert');
    },
    doInsert: async (req, res) => {
        let toyid = req.body.toyid;
        let toy = req.body.toy;
        let image = req.body.image;
        let price = req.body.price;
        let amount = req.body.amount;
        let newToy = { toyid : toyid, toy: toy, image: image, price: price, amount: amount };
        
        let client = await MongoClient.connect(url);
        let dbo = client.db("Library");
        await dbo.collection("Toys").insertOne(newToy);

        res.redirect('/');
    }
};
