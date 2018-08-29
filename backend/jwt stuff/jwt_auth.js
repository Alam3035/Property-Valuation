const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var uuid = require('uuid');
var authClass = require('./auth')

//body parsers required to parse form
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const auth = authClass();
app.use(auth.initialize());
app.use(cors());

//allow CORS ==> this all goes into app.js
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-")//find out what goes here
//     next();
// });



//Handle Login POST

app.post('/login', function(req, res) {
    
    //view posted values
    console.log(req.body);

    //get user object
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = users.find((u)=> {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.user_id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);

    }
});

//Handle Register POST
app.post('/register', function(req, res) {

    //view posted values
    console.log(req.body);

    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

        //create user object
        var user = {
            user_id: uuid.v4(), //could change read about uuid
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            special_user: req.body.special_user, //make to have a second factor for auth?
            google_id: req.body.google_id
        };
        users.push(user)

        //create a token then return
        var token = jwt.sign({
            id: user.user_id,
            email: user.email
        }); 

        res.send({userid: user.user_id, token: token});
        res.end();
    });
});

//verify credentials on protected routes
app.post('/protected', function (req, res) {

    //view posted values
    console.log(req.body);

    var token = verifyToken(req.body.userid, req.body.token);
    if(token){
        console.log('Path cleared')
        console.log(token);
        res.send(token);
    }
    else {
        console.log('Path unclear, abort abort!')
        res.status(500).send('Failed Authentication')
    }
    res.end();
});

function verifyToken(userid, token) {

    //get user object
    var user = users.find(function(obj) {
        return obj.user_id === userid;
    });

    //verify token
    if(token && user) {
        var decoded = jwt.verify(token, user.secondFactor);
        console.log('decoded token');
        console.log(decoded);

        //match token info with user info
        if(decoded.email === user.email && decoded.id === user.user_id){
            return {email: decoded.email, userid: decoded.user_id}
        }
    }
    return null;
}

app.listen(8080)