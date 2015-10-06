var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Главная', pageCategory: "sofa" });

});

router.get('/sofas', function(req, res, next) {
  res.render('index', { title: 'Диваны', pageCategory: "sofa" });

});

router.get('/chairs', function(req, res, next) {
  res.render('index', { title: 'Кресла', pageCategory: "chair" });

});

router.get('/corners', function(req, res, next) {
  res.render('index', { title: 'Мягкие уголки', pageCategory: "corner" });

});

router.get('/compacts', function(req, res, next) {
  res.render('index', { title: 'Компактные/детские диваны', pageCategory: "compact" });

});
module.exports = router;
