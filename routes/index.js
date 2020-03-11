const express = require('express');
const router = express.Router();

router.get('/', (request, response) => response.render('index', { user: request.user }));
router.get('/back-to-nature', (request, response) => response.render('back-to-nature', { user: request.user }));
router.get('/clean-the-world', (request, response) => response.render('clean-the-world', { user: request.user }));
router.get('/social-compliance', (request, response) => response.render('social-compliance', { user: request.user }));
router.get('/contact', (request, response) => response.render('contact', { user: request.user }));

router.get('/hemp', (request, response) => response.render('hemp', { user: request.user }));

router.post('/contact', (request, response) =>
    {
        console.log(request.body);
        response.render('contact', { user: request.user });
    }
);

module.exports = router;