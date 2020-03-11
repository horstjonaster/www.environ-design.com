const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const router = express.Router();

const User = require('../../models/User');

router.get('/', authenticate.success, (request, response) => response.redirect('/management/user/overview'));
router.get('/overview', authenticate.success, employee, async (request, response) =>
    {
        response.render('management/order/overview', { user: request.user });
    }
);

module.exports = router;