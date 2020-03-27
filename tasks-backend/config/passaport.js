const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done)=>{
        app.db('users')
            .where({ id: payload.id})
            .first()
            .then(user =>{
                if (user) {
                    done(null, {id: user.id, email:user.email})
                }else{
                    done(null, false)
                }
            })
            // catch e erro do banco
            .catch(err => done(err,false))
    })
    // chamndo a function
    passport.use(strategy)

    return {
        // muito importante 

        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false}),

    }

}