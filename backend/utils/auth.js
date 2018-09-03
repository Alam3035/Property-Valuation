var passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');


const ExtractJwt = passportJWT.ExtractJwt;

function jwtLogin() {
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=> {

        const user = await knex.select('user_id').from('users').where('users.user_id' == payload.id) //may need to change to facebook due to coloumn name
     // use knex here to authenticate the user.
        // const user= users.find((user)=>{
        //     return user.user_id == payload.id
        // });


        if(user.length !== 0){
            return done(null, {id: users.user_id});
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

module.exports = jwtLogin 