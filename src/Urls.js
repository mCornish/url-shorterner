const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// const server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
// const db = new mongo.Db('urlsdb', server);
const MONGO_URL = process.env.MONGOLAB_URI;

const populateDb = require('./populate-db');

const BASE_URL = 'http://mc-short.herokuapp.com/';

// db.open((err, db) => {
//     if (!err) {
//         console.log('Connected to "urls" database.');
//         db.collection('urls', {strict: true}, (err, collection) => {
//             if (err) {
//                 console.log('The "urls" collections doesn\'t exist. Creating it with sample data...');
//                 populateDb(db);
//             }
//         });
//     }
// });

exports.findOne = (db, req, res) => {
    const id = req.params.id;
    const url = BASE_URL + id;
    db.collection('urls', (err, collection) => {
        collection.findOne({'short_url': url}, (err, doc) => {
            if (!err && doc) {
                delete doc['_id'];
                res.json(doc);
            } else {
                res.json({'error': 'Unable to retrieve URL'})
            }
        });
    });
}

exports.addOne = (db, req, res) => {
    const url = req.params[0];
    db.collection('urls', (err, collection) => {
        const newUrl = {
            "original_url": url,
            "created_at": new Date() 
        }
        collection.insert(newUrl, {safe:true}, (err, result) => {
            if (!err) {
                console.log('Added doc: ', result);
                const doc = result.ops[0];
                const urlId = doc._id.toString().split('').filter((c, i) => i % 3 === 0).join(''); // Take every third char from _id
                doc['short_url'] = 'http://mc-short.herokuapp.com/' + urlId; 
                collection.update({'_id': doc._id}, doc, {safe:true}, (err, result) => {
                    if (!err) {
                        console.log('Updated doc: ' + result);
                        const response = {
                            "original_url": doc.original_url,
                            "short_url": doc.short_url
                        }
                        res.json(response);
                    } else {
                        console.log('ERROR:', err);
                        res.send({"error": "Unable to add URL"})
                    }
                });
            }
        })
    })
}
