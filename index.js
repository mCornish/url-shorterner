const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const Urls = require('./src/Urls');

const MONGO_URL = process.env.MONGOLAB_URI;
console.log(MONGO_URL);
const CSS_PATH = __dirname + '/src/main.css';
const HTML_PATH = __dirname + '/src/index.html';

app.set('port', process.env.PORT || 5000);

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(HTML_PATH));
});

MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) {
        console.log("Unable to connect to Mongo.");
        process.exit(1);
    } else {
        app.get('/:id', Urls.findOne.bind(null, db));
        app.get('/new/*', Urls.addOne.bind(null, db));

        app.listen(app.get('port'), () => {
            console.log('Node app is running on port', app.get('port'));
        });
    }
})
