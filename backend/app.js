//General Initilization 
require('dotenv').config(); //Define Environments
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)

const redis = require('redis'); // Connect to Redis server
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});

const jwt = require("jwt-simple")
var bcrypt = require('./utils/bcrypt');
var authClass = require('./utils/auth');
const cors = require('cors');
const config = require("./utils/config")

const {app,server,io} = require('./utils/init-app')(redisClient);

//body parsers required to parse form
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const auth = authClass();
app.use(auth.initialize());
app.use(cors());

const fs = require('fs');
const https = require('https');

// const isLoggedIn = require('./utils/guard').isLoggedIn;

//Routers and Services
const { DirectMessageRouter,
        HistoricalTransactionRouter,
        EstateRouter,
        SocialPostRouter,
        SocketIORouter,
        TradingPlatformRouter,
        UserRouter
         } = require('./routers');

const { DirectMessageService,
        HistoricalTransactionService,
        EstateService,
        SocialPostService,
        TradingPlatformService,
        UserService
         } = require('./services');

     
        // let socialPostService = new SocialPostService(knex);
        // let directMessageService = new DirectMessageService(knex);
        let estateService = new EstateService(knex);
        let historicalTransactionService = new HistoricalTransactionService(knex, redisClient);
        let tradingPlatformService = new TradingPlatformService(knex, redisClient);
        let userService = new UserService(knex, redisClient);

        new SocketIORouter(io,userService).router(); //this is where we provide the middlware to check whether or not users are logged in
        app.use('/api/estate', (new EstateRouter(estateService)).router());
        // app.use('/api/direct_message', auth.authenticate(), (new DirectMessageRouter(directMessageService)).router());        
        // app.use('/api/social_post', auth.authenticate(), (new SocialPostRouter(socialPostService)).router());
        app.use('/api/his_trans', (new HistoricalTransactionRouter(historicalTransactionService)).router());
        app.use('/api/trade_plat', auth.authenticate(), (new TradingPlatformRouter(tradingPlatformService)).router());
        app.use('/api/user', auth.authenticate(), (new UserRouter(userService)).router());
         
//Handle Login POST

// app.post('/api/login', async function(req, res) {
    
//     //view posted values
//     console.log(req.body);

//     //get user object
//     if (req.body.email && req.body.password) {

//         let hash = await bcrypt.hashPassword(req.body.password)

//         var email = req.body.email;
//         var password = req.body.password;

        
//         let query = knex
//         .select(
//             'users.name',
//             'users.email',
//             'users.password'
//     )
//     .from('users')

//   return query.then(rows => {
//       return rows.map(row => ({
//           name: row.name,
//           email: row.email,
//           password: row.password
//       }))
//   }).then(console.log(query))

//   if(email === row.email && password === row.password){
//     var payload = {
//         id: user.user_id
//     };

//   } else {
//       console.log('no user here')
//   }

//         var user = users.find((u)=> { // change to a knex selection --> check if query.length is 0 or 1 -- to verify user in database
//             return u.email === email && u.password === password; //change below to knex and how information comes from knex
//         });
//         if (user) {
//             var payload = {
//                 id: user.user_id
//             };
//             var token = jwt.encode(payload, config.jwtSecret);// this part should be okay
//             res.json({
//                 token: token
//             });
//         } else {
//             res.sendStatus(401);
//         }
//     } else {
//         res.sendStatus(401);

//     }
// });

app.post("/api/login", async function (req, res) {
    try {
        let users = await knex('users').where({ email: req.body.email });
        if (users.length == 0) {
            return done(null, false, { message: 'Incorrect credentials' });
        }
        let user = users[0];
        let result = await bcrypt.checkPassword(req.body.password, user.password);
        if (result) {
            var payload = {
                user_id: users[0].id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(401);
    }
});

//Handle Register POST
app.post("/api/register", async (req, res) => {
    if (req.body.email && req.body.password) {
        let hash = await bcrypt.hashPassword(req.body.password)

        let userID = await knex("users").insert({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: Number(req.body.phone),
            // facebook_id: req.body.facebook_id,
            special_user: Boolean(req.body.special_user)
        })
            .returning("user_id")

        var payload = {
            user_id: userID[0]
        };
        var token = jwt.encode(payload, config.jwtSecret);
        res.json({
            token: token
        });
    } else {
        res.sendStatus(401);
    }
})

//verify credentials on protected routes
// app.post('/api/protected', function (req, res) {

//     //view posted values
//     console.log(req.body);

//     var token = verifyToken(req.body.userid, req.body.token);
//     if(token){
//         console.log('Path cleared')
//         console.log(token);
//         res.send(token);
//     }
//     else {
//         console.log('Path unclear, abort abort!')
//         res.status(500).send('Failed Authentication')
//     }
//     res.end();
// });

// function verifyToken(userid, token) {

//     //get user object
//     var user = await knex('users')
//     .select('users.user_id')

   
   
//     // users.find(function(obj) {
//     //     return obj.user_id === userid;
//     // });

//     //verify token
//     if(token && user) {
//         var decoded = jwt.verify(token, user.secondFactor);
//         console.log('decoded token');
//         console.log(decoded);

//         //match token info with user info
//         if(decoded.email === user.email && decoded.id === user.user_id){
//             return {email: decoded.email, userid: decoded.user_id}
//         }
//     }
//     return null;
// }
// adding to test git hook
    const httpsOptions = {
            key: fs.readFileSync('./localhost.key'),
            cert: fs.readFileSync('./localhost.crt')
        }

        https.createServer(httpsOptions, app).listen(8080, () => {
            console.log('Application started at port ' + 8080)
        })