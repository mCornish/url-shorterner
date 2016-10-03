const express = require('express');
const app = express();
const path = require('path');

const CSS_PATH = __dirname + '/src/main.css';
const HTML_PATH = __dirname + '/src/index.html';
app.set('port', process.env.PORT || 5000);

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(HTML_PATH));
});

app.get('/api/whoami', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Recommended by http://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
    const userLang = req.headers['accept-language'].split(',')[0]; // Recommended by https://help.localizejs.com/docs/detecting-language-of-a-visitor?lang=en
    const userSoft = req.headers['user-agent'].split('(')[1].split(')')[0];
    const result = {
        "ipaddress": userIp,
        "language": userLang,
        "software": userSoft
    };

    res.json(result);
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
