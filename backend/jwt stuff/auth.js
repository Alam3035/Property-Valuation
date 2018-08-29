var passport = require('passport');
var passportJWT = require('passport-jtw');
var config = require('./config');


const ExtractJwt = passportJWT.ExtractJwt;

export default function () {
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=> {

        const userID = knex.select('user_id').from('users').where('users.user_id' = payload.id) //may need to change to facebook due to coloumn name
        const user= users.find((user)=>{
            return user.user_id == payload.id
        });
        if(user){
            return done(null, {id: user.user_id});
        } else {
            return done(new Error("User Not Found"), null);
        }
    });

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}