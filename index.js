const express = require('express');
const app = express();
const path = require('path');
const timestamp = require('unix-timestamp');

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:stamp', (req, res) => {
    const stamp = req.params.stamp;
    const result = {
        "unix": null,
        "natural": null
    };

    if (_isNatural(stamp)) {
        const natural = new Date(stamp);
        result.natural = _formatDate(natural);
        result.unix = _getUnix(natural);
    } else if (_isUnix(stamp)) {
        const unix = +stamp;
        result.unix = unix;
        result.natural = _formatDate(_getNatural(unix));
    }

    res.json(result);
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

function _isNatural(stamp) {
    const date = new Date(stamp);
    return !isNaN(date.getMonth());
}

function _isUnix(stamp) {
    const date = timestamp.toDate(+stamp);
    return !isNaN(date.getMonth());
}

function _getNatural(unix) {
    return timestamp.toDate(unix);
}

function _getUnix(natural) {
    return timestamp.fromDate(natural);
}

function _formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
