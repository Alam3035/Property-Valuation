//General Initalization 
require('dotenv').config(); //Define Enniroments
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)

const redis = require('redis'); // Connect to Redis server
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})

const fs = require('fs');
const https = require('https');

const isLoggedIn = require('./utils/guard').isLoggedIn;

//Routers and Services
const { DirectMessageRouter,
        HistoricalTransactionRouter,
        SocialPostRouter,
        SocketIORouter,
        TradingPlatformRouter,
        UserRouter
         } = require('./routers');

const { DirectMessageService,
        HistoricalTransactionService,
        SocialPostService,
        TradingPlatformService,
        UserService
         } = require('./services');

     
        
        // let directMessageService = new DirectMessageService(knex);
        let historicalTransactionService = new HistoricalTransactionService(knex, redisClient);
        let socialPostService = new SocialPostService(knex);
        let tradingPlatformService = new TradingPlatformService(knex, redisClient);
        let userService = new UserService(knex, redisClient);

        const {app,server,io} = require('./utils/init-app')(redisClient);


        new SocketIORouter(io,userService).router();
        // app.use('/api/direct_message', (new DirectMessageRouter(directMessageService)).router());
        app.use('/api/his_trans', (new HistoricalTransactionRouter(historicalTransactionService)).router());
        app.use('/api/socail_post', (new SocialPostRouter(socialPostService)).router());
        app.use('/api/trade_plat', (new TradingPlatformRouter(tradingPlatformService)).router());
        app.use('/api/user', (new UserRouter(userService)).router());


    const httpsOptions = {
            key: fs.readFileSync('./localhost.key'),
            cert: fs.readFileSync('./localhost.crt')
        }

        https.createServer(httpsOptions, app).listen(8080, () => {
            console.log('Application started at port ' + 8080)
        })
