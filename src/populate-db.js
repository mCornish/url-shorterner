const urls = [
{
    "original_url": "http://google.com",
    "short_url": "http://mc-short.herokuapp.com/123"
},
{
    "original_url": "http://youtube.com",
    "short_url": "http://mc-short.herokuapp.com/456"
}
]

module.exports = db => {
    db.collection('urls', (err, collection) => {
        collection.insert(urls, {safe: true});
    });
}
