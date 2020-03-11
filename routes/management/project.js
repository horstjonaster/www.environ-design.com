const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const router = express.Router();

const Project = require('../../models/Project');

router.get('/', authenticate.success, (request, response) => response.redirect('/management/project/overview'));
router.get('/overview', authenticate.success, employee, async (request, response) =>
    {
        await Project.find().exec((error, projects) =>
            {
                response.render('management/project/overview', { user: request.user, projects: projects });
            }
        );
    }
);
router.get('/create', authenticate.success, employee, (request, response) => response.render('management/project/create', { user: request.user }));
router.get('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, project) =>
            {
                if(project)
                {
                    response.render('management/project/edit', { user: request.user, project: project });
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);
router.get('/delete/:id', authenticate.success, employee, async (request, response) =>
    {
        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, project) =>
            {
                if(project)
                {
                    response.render('management/project/delete', { user: request.user, project: project });
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);

router.post('/create', authenticate.success, employee, async (request, response) =>
    {
        const {name} = request.body;

        await new Project(
            {
                name: name
            }
        ).save().then(() =>
            {
                response.redirect('/management/project/overview');
            }
        ).catch(() =>
            {
                response.render('/management/project/create', {user: request.user});
            }
        );
    }
);

router.post('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        const {name} = request.body;

        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, project) =>
            {
                if(project)
                {
                    project.name = name;
                    project.updated = Date.now();
                    project.save();
                    response.redirect('/management/category/overview/' + project._id);
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);

router.post('/delete/:id', authenticate.success, employee, async (request, response) =>
    {
        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, project) =>
            {
                if(project)
                {
                    project.delete();
                }

                response.redirect('/management/project/overview');
            }
        );
    }
);

module.exports = router;