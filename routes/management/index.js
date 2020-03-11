const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const router = express.Router();

router.get('/', authenticate.success, (request, response) => response.redirect('/management/overview'));
router.get('/overview', authenticate.success, employee, (request, response) => response.render('management/overview', { user: request.user }));

module.exports = router;