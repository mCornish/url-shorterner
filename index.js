const express = require('express');
const app = express();
const path = require('path');
const Urls = require('./src/Urls');

const CSS_PATH = __dirname + '/src/main.css';
const HTML_PATH = __dirname + '/src/index.html';
const DB_URL = 'mongodb://localhost:27017'

app.set('port', process.env.PORT || 5000);

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(HTML_PATH));
});
app.get('/:id', Urls.findOne);
app.get('/new/:url', Urls.addOne);

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
