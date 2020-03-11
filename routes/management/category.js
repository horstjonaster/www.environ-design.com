const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const router = express.Router();

const Project = require('../../models/Project');
const Category = require('../../models/Category');

router.get('/overview/:id', authenticate.success, employee, async (request, response) =>
    {
        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec(async (error, project) =>
            {
                if(project)
                {
                    await Category.find(
                        {
                            project: request.params.id
                        }
                    ).exec((error, categories) =>
                        {
                            response.render('management/category/overview', { user: request.user, project: project, categories: categories });
                        }
                    );
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);
router.get('/create/:id', authenticate.success, employee, async (request, response) =>
    {
        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec(async (error, project) =>
            {
                if(project)
                {
                    response.render('management/category/create', { user: request.user, project: project });
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);
router.get('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        await Category.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').exec(async (error, category) =>
            {
                if(category)
                {
                    response.render('management/category/edit', { user: request.user, category: category });
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
        await Category.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').exec(async (error, category) =>
            {
                if(category)
                {
                    response.render('management/category/delete', { user: request.user, category: category });
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);

router.post('/create/:id', authenticate.success, employee, async (request, response) =>
    {
        const {name} = request.body;

        await Project.findOne(
            {
                _id: request.params.id
            }
        ).exec(async (error, project) =>
            {
                if(project)
                {
                    await new Category(
                        {
                            name: name,
                            project: project._id
                        }
                    ).save().then(() =>
                        {
                            response.redirect('/management/category/overview/' + project._id);
                        }
                    ).catch(() =>
                        {
                            response.render('management/category/create', { user: request.user, project: project });
                        }
                    );
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);

router.post('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        const {name} = request.body;

        await Category.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, category) =>
            {
                if(category)
                {
                    category.name = name;
                    category.updated = Date.now();
                    category.save();
                    response.redirect('/management/product/overview/' + category._id);
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
        await Category.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, category) =>
            {
                if(category)
                {
                    category.delete();
                }

                response.redirect('/management/category/overview/' + category.project);
            }
        );
    }
);


module.exports = router;