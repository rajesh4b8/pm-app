var express = require('express');
const fs = require('fs');
var bunyan = require('bunyan');

var router = express.Router();
var logger = bunyan.createLogger({ name: "pm-app-products" });

router.get('/', function(req, res) {

    fs.readFile('./app-data.json', "utf-8", function(err, data) {
        if (err) {
            logger.error(err);
        }
        res.json(JSON.parse(data));
    });
})

router.get('/:id', function(req, res) {
    fs.readFile('./app-data.json', "utf-8", function(err, data) {
        if (err) {
            logger.error(err);
        }
        var items = JSON.parse(data);
        var item = items.filter(
            function(prd) { return prd.id == req.params.id }
        );
        if (item.length > 0) {
            res.json(item)
        } else {
            logger.info('Priduct not found with id:' + req.params.id);
            res.sendStatus('404')
        }
    });
});


module.exports = router;