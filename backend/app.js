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


//Routers and Services
const { DirectMessageRouter,
        HistoricalTransactionRouter,
        EstateRouter,
        SocialPostRouter,
        SocketIORouter,
        TradingPlatformRouter,
        UserRouter,
        UserFavRouter
         } = require('./routers');

const { DirectMessageService,
        HistoricalTransactionService,
        EstateService,
        SocialPostService,
        TradingPlatformService,
        UserService,
        UserFavService
         } = require('./services');

     
        let socialPostService = new SocialPostService(knex);
        // let directMessageService = new DirectMessageService(knex);
        let estateService = new EstateService(knex);
        let historicalTransactionService = new HistoricalTransactionService(knex, redisClient);
        let tradingPlatformService = new TradingPlatformService(knex, redisClient);
        let userService = new UserService(knex, redisClient);
        let userFavService = new UserFavService(knex);
        

        new SocketIORouter(io,userService).router(); //this is where we provide the middlware to check whether or not users are logged in
        app.use('/api/estate', (new EstateRouter(estateService)).router());
        // app.use('/api/direct_message', auth.authenticate(), (new DirectMessageRouter(directMessageService)).router());        
        app.use('/api/social_post', auth.authenticate(), (new SocialPostRouter(socialPostService)).router());
        app.use('/api/his_trans', (new HistoricalTransactionRouter(historicalTransactionService)).router());
        app.use('/api/trade_plat', auth.authenticate(), (new TradingPlatformRouter(tradingPlatformService)).router());
        app.use('/api/user', auth.authenticate(), (new UserRouter(userService)).router());
        app.use('/api/fav', auth.authenticate(), (new UserFavRouter(userFavService)).router());

//Handle Login POST

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
                user_id: users[0].user_id
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

    const httpsOptions = {
            key: fs.readFileSync('./localhost.key'),
            cert: fs.readFileSync('./localhost.crt')
        }

        https.createServer(httpsOptions, app).listen(8080, () => {
            console.log('Application started at port ' + 8080)
        })