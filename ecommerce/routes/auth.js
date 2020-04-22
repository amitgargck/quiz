var express = require('express');
var router = express.Router();
var Users = require('../controllers/auth');
const {userSignupValidator} =  require("../validator");
router.post('/signup',userSignupValidator,Users.signup);
router.post('/signin',Users.signin);
router.get('/signout',Users.signout);
router.get('/hello',Users.requireSignin, (req,res) => {
    res.send('hello there');
});
module.exports = router;