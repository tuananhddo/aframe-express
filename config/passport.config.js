// config/passport.js
var LocalStrategy = require('passport-local').Strategy;
// var User            = require('../app/models/user');
var connection = require('../config/dbConnection.js');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, {username: user.username, updateData: user.updateData, createData: user.createData});
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            let sql = "SELECT * FROM user WHERE username = " + '"' + username + '"';

            console.log(sql)
            connection.query(sql, function (err, results) {
                if (err) throw err;
                console.log(results)
                if (!Array.isArray(results) || results.length == 0) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                let user = results[0];
                if (user.password != password) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                }
                return done(null, user);

            });
            //     // if no user is found, return the message
            //     if (!user)
            //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            //
            //     // if the user is found but the password is wrong
            //     if (!user.validPassword(password))
            //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            //
            //     // all is well, return successful user
            //     return done(null, user);
            // });

        }));

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            let sqlFindUser = "SELECT * FROM user WHERE username = ?";
            var createUserSql = "INSERT INTO user (username, password) VALUES ?";

            console.log('findUser' + sqlFindUser)
            console.log('findUser' + createUserSql)

            connection.query(sqlFindUser, [username], function (err, results) {
                if (err) throw err;
                if (results.length != 0) {
                    return done(null, false, req.flash('signUpMessage', 'duplicate user found.')); // req.flash is the way to set flashdata using connect-flash
                }
            });
            connection.query(createUserSql,[[[username,password]]], function (err, result) {
                if (err) throw err;
                console.log("1 user inserted")
                return done(null, result);

            });
        }
    ))
}


