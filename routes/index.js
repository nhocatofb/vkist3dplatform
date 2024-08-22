var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Show' });
});

router.get('/modelview', function(req, res, next) {
  res.render('modelview', { title: 'Show' });
});

router.get('/loading', function(req, res, next) {
  res.render('loading', { title: 'Show' });
});

router.get('/', function(req, res, next) {
  res.render('upload', { title: 'Show' });
});

module.exports = router;
