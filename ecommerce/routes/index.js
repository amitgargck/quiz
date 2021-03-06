var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {
    res.render('member',{title:'Member'});
});

router.get('/login', function(req, res, next) {
    res.render('login',{title:'Login'});
});

router.get('/register', function(req, res, next) {
    res.render('register',{title:'Register'});
});

module.exports = router;