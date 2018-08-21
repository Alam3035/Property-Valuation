//General Initalization 
require('dotenv').config(); //Define Enniroments
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)

const ViewRouter = require('./ViewRouter');

const fs = require('fs');
const https = require('https');

const { DirectMessageRouter,
        HistoricalTransactionRouter,
        RealEstateRouter,
        SocialPostRouter,
        UserRouter
         } = require('./routers');

const { DirectMessageService,
        HistoricalTransactionService,
        RealEstateService,
        SocialPostService,
        UserService
         } = require('./services');

         const httpsOptions = {
            key: fs.readFileSync('./localhost.key'),
            cert: fs.readFileSync('./localhost.crt')
        }
        
        https.createServer(httpsOptions, app).listen(8080, () => {
            console.log('Application started at port ' + 8080)
        })