const express = require('express');
const User = require('../core/users');
const router = express.Router();

const user = new User();


//get index page 
router.get('/', function(req,res) {
    // if(err){
    //     res.json(200, {"message":"Connection Success"});
    // } else {
    res.status(200).json({"message":"Connection Success"});
    //}
});

//post login data
router.post("/login", (req, res, next) => {

    user.login(req.body.username, req.body.password, function(result){
        if(result) {
            res.send('Logged in as :' + result.username);
        } else {
            res.send('Username/Password Incorrect');
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


    user.create(userInput, function(lastId) {
        if(lastId) {
            res.send('Welcome  ' + userInput.username);
        }else{
            console.log('error creating a new user ...');
        }
    });
    
});

module.exports = router;
