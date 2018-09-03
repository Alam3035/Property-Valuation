var passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)


const ExtractJwt = passportJWT.ExtractJwt;

//  function jwtLogin() {
//     const strategy = new passportJWT.Strategy({
//         secretOrKey: config.jwtSecret,
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//     }, async (payload,done)=> {
        

//         console.log(payload.user_id)

//         let user = await knex
//         .select('user_id')
//         .from('users')
//         .where('users.user_id' == Number(payload.user_id))
//      // use knex here to authenticate the user.
//         // const user= users.find((user)=>{
//         //     return user.user_id == payload.id
//         // });

//             await knex;
            
//             if(user.length !== 0){
//                 console.log(user)
//             return done(null, {id: user[0].user_id});
//         } else {
//             console.log(user)
//             return done(new Error("User Not Found"), null);
//         }
//     });

//     passport.use(strategy);

//     return {
//         initialize: function() {
//             return passport.initialize();
//         },
//         authenticate: function() {
//             return passport.authenticate("jwt", config.jwtSession);
//         }
//     };
// }

// module.exports = jwtLogin 


module.exports = function () {
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
        const user = await knex.select('user_id')
        .from('users')
        .where('user_id', payload.user_id)
        await user;
        console.log(user)
        console.log(payload.user_id)



        if(user.length !== 0 ) {
            return done(null, {id: user[0].user_id});
        } else {
            return done(new Error("User Not Found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}

