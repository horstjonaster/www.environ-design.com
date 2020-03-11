const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) =>
{
    passport.use('local', new LocalStrategy(
        {
            usernameField: 'email'
        },
        (email, password, done) =>
        {
            User.findOne(
                {
                    email: email
                }
            ).then(async (user) =>
                {
                    if(user && await bcrypt.compare(password, user.password))
                    {
                        return done(null, user);
                    }
                    else
                    {
                        return done(null, false);
                    }
                }
            );
        },
    ));

    passport.serializeUser((user, done) =>
        {
            done(null, user._id)
        }
    );

    passport.deserializeUser((id, done) =>
        {
            User.findById(id, (error, user) =>
                {
                    done(error, user);
                }
            );
        }
    );
};