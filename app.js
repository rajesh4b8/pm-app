var express = require('express');
const path = require('path');
var bunyan = require('bunyan');

var app = express();
var logger = bunyan.createLogger({ name: "pm-app" });

var products = require('./routes/products');

app.all('/*', function(req, resp, next) {
    logger.info('Request from:', req.path, 'params:', req.params);
    next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', products);

app.listen(3000, function() {
    logger.info('PM-app listening on port 3000...')
});