const express = require('express');
const router = express.Router();

router.get('/privacy', (request, response) => response.render('policy/privacy', { user: request.user }));
router.get('/cookie', (request, response) => response.render('policy/cookie', { user: request.user }));
router.get('/disclaimer', (request, response) => response.render('policy/disclaimer', { user: request.user }));
router.get('/shipping-and-return', (request, response) => response.render('policy/shipping-and-return', { user: request.user }));

module.exports = router;