const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const socketIOSession = require("socket.io.session");

module.exports = (app,io,redisClient)=>{
    const sessionStore = new RedisStore({
        client: redisClient,
        unset: "destroy"
    });
    const settings = {
        store: sessionStore,
        secret: "supersecret",
        cookie: { "path": '/', "httpOnly": true, "secure": false,  "maxAge": null },
        resave:false,
        saveUninitialized:false
    }
    app.use(expressSession(settings));
    io.use(socketIOSession(settings).parser);
}