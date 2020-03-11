const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

const User = require('../models/User');

router.get('/', authenticate.success, (request, response) => response.redirect('/user/profile'));
router.get('/profile', authenticate.success, (request, response) => response.render('user/profile', {user: request.user}));
router.get('/register', authenticate.failed, (request, response) => response.render('user/register', { user: request.user }));
router.get('/login', authenticate.failed, (request, response) => response.render('user/login', { user: request.user }));
router.get('/lost-password', authenticate.failed, (request, response) => response.render('user/lost-password', { user: request.user }));
router.get('/logout', authenticate.success, (request, response) =>
    {
        request.logout();
        response.redirect('/user/login');
    }
);

router.post('/register', async (request, response) =>
    {
        const {first_name, insertion, last_name, email, phone_number, password, confirm_password} = request.body;
        const hashed_password = await bcrypt.hash(password, 10);

        new User(
            {
                first_name: first_name,
                insertion: insertion,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                password: hashed_password
            }
        ).save().then(() =>
            {
                response.redirect('/user/login');
            }
        ).catch(() =>
            {
                response.render('user/register', {user: request.user});
            }
        );
    }
);
router.post('/login', async (request, response, next) =>
    {
        console.log('Authenticate...');
        await passport.authenticate('local', (error, user, info) =>
            {
                if(!user)
                {
                    console.log('Failed!');
                    response.render('user/login', {user: request.user});
                }
                else
                {
                    request.login(user, {}, () =>
                        {
                            console.log('Success!');
                            response.redirect(request.query.redirect || '/user/profile');
                        }
                    );
                }
            }
        )(request, response, next);
    }
);
router.post('/lost-password', (request, response) =>
    {
        response.render('user/lost-password', {user: request.user});
    }
);

module.exports = router;