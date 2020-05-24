const express = require('express');
const User = require('../core/users');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = new User();


//get index page 
router.get('/', function (req, res) {
    // if(err){
    //     res.json(200, {"message":"Connection Success"});
    // } else {
    res.status(200).json({ "message": "Connection Success" });
    //}
});

//post login data
router.post("/login", (req, res, next) => {

    user.login(req.body.username, req.body.password, function (result) {
        if (result == -1) {
            res.send('Password Incorrect');
            return;
        } else if (result == -2) {
            res.send('Username Incorrect');
            return;
        } else {

            jwt.sign({ user: req.body }, 'secretkey', { expiresIn: '1m' }, (err, token) => {
                res.json({
                    token: token
                })
            });

            //res.send('Logged in as :' + result.username)
        }

    });
});

//post signup data
router.post("/signup", (req, res, next) => {

    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };


    user.create(userInput, function (lastId) {
        if (lastId) {
            res.send('Welcome  ' + userInput.username);
        } else {
            console.log('error creating a new user ...');
        }
    });

});

//post signup data
router.post("/login_via_access_token", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, user) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Logged in via access token ',
                user: user
            })
        }
    });

});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // getting token
        const token = bearer[1];
        // set the token
        req.token = token;
        //call next
        next();

    } else {
        // Forbidden
        res.sendStatus(403);
    }


}


module.exports = router;