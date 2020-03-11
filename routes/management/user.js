const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const router = express.Router();

const User = require('../../models/User');

router.get('/', authenticate.success, (request, response) => response.redirect('/management/user/overview'));
router.get('/overview', authenticate.success, employee, async (request, response) =>
    {
        await User.find().exec((error, users) =>
            {
                response.render('management/user/overview', { user: request.user, users: users });
            }
        );
    }
);
router.get('/create', (request, response) => response.render('management/user/create', { user: request.user }));

module.exports = router;