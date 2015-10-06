var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('service', { title: 'Доставка и услуги'});

});

module.exports = router;