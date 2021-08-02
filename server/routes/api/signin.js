const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.post('/api/signup', (req, res, next) => {
        const {body} = req;

        const {
            firstName,
            lastName,
            password
        } = body;

        let {email} = body;

        if(!firstName) {
            return res.send({
                success: false,
                message: 'Missing First Name'
            });
        }
        if(!lastName) {
            return res.send({
                success: false,
                message: 'Missing Last Name'
            });
        }
        if(!email) {
            return res.send({
                success: false,
                message: 'Missing email'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: 'Missing Password'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, previousUsers) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server Error'
                });
            } else if(previousUsers.length > 0) {
                return res.send({ 
                    success: false,
                    message: 'Someone already uses this email'});
            }
        });

        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        })
    });

    app.post('/api/signin', (req, res, next) => {
        const {body} = req;

        const {password} = body;
        let {email} = body;

        if(!email) {
            return res.send({
                success: false,
                message: 'Missing email'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: 'Missing Password'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }
            if(users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Invalid'
                });
            }

            const user = users[0];

            if(!user.validPassword(password)) {
                res.send({
                    success: false,
                    message: 'Invalid passwrd'
                });
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.email = user.email;
            userSession.firstName = user.firstName;
            userSession.lastName = user.lastName;
            userSession.save((err, doc) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: 'Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id,
                    uid: doc.userId,
                    email: doc.email,
                    firstName: doc.firstName,
                    lastName: doc.lastName
                });
            });
        });
    });

    app.get('/api/verify', (req, res, next) => {
        const {query} = req;
        const token = query;
        UserSession.find({
                _id: token.token,
                isDeleted: false
        }, (err, sessions) => {
            if(err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }
            if(sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'error'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
        });
    });

    app.get('/api/logout', (req, res, next) => {
        const {query} = req;
        const token = query;
        UserSession.findOneAndUpdate({
                _id: token.token,
                isDeleted: false
        },  {
                $set: {
                    isDeleted: true
            }
        }, null, (err, sessions) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            }

            return res.send({
                success: true,
                message: 'Good'
            });
        });
    });
};
