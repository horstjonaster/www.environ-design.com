const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const Certificate = require('../../models/Certificate');
const router = express.Router();

router.get('/', authenticate.success, (request, response) => response.redirect('/management/certificate/overview'));
router.get('/overview', authenticate.success, employee, async (request, response) =>
    {
        await Certificate.find().exec((error, certificates) =>
            {
                response.render('management/certificate/overview', { user: request.user, certificates: certificates });
            }
        );
    }
);
router.get('/view/:id', authenticate.success, employee, async (request, response) =>
    {
        await Certificate.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, certificate) =>
            {
                if(certificate)
                {
                    response.render('management/certificate/view', { user: request.user, certificate: certificate });
                }
                else
                {
                    response.redirect('/management/certificate/overview');
                }
            }
        );
    }
);
router.get('/create', authenticate.success, employee, (request, response) => response.render('management/certificate/create', { user: request.user }));
router.get('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        await Certificate.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, certificate) =>
            {
                if(certificate)
                {
                    response.render('management/certificate/edit', { user: request.user, certificate: certificate });
                }
                else
                {
                    response.redirect('/management/certificate/overview');
                }
            }
        );
    }
);
router.get('/delete/:id', authenticate.success, employee, async (request, response) =>
    {
        await Certificate.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, certificate) =>
            {
                if(certificate)
                {
                    response.render('management/certificate/delete', { user: request.user, certificate: certificate });
                }
                else
                {
                    response.redirect('/management/certificate/overview');
                }
            }
        );
    }
);

router.post('/create', authenticate.success, employee, async (request, response) =>
    {
        const {name, description} = request.body;

        await new Certificate(
            {
                name: name,
                description: description
            }
        ).save().then(() =>
            {
                response.redirect('/management/certificate/overview');
            }
        ).catch(() =>
            {
                response.render('/management/certificate/create', {user: request.user});
            }
        );
    }
);

router.post('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        const {name, description} = request.body;

        await Certificate.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, certificate) =>
            {
                if(certificate)
                {
                    certificate.name = name;
                    certificate.description = description;
                    certificate.updated = Date.now();
                    certificate.save();
                    response.redirect('/management/certificate/view/' + certificate._id);
                }
                else
                {
                    response.redirect('/management/certificate/overview');
                }
            }
        );
    }
);

router.post('/delete/:id', authenticate.success, employee, async (request, response) =>
    {
        await Certificate.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, certificate) =>
            {
                if(certificate)
                {
                    certificate.delete();
                }

                response.redirect('/management/certificate/overview');
            }
        );
    }
);

module.exports = router;