var express = require('express');
var router = express.Router();
var {requireSignin , isAuth, isAdmin} = require('../controllers/auth');
var {userById} = require('../controllers/user');
router.get('/secret/:userId',requireSignin,  isAuth, isAdmin,(req,res) => {
    res.json({
        user : req.profile
    });
});
router.param('userId',userById)
module.exports = router;