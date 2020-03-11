const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const employee = require('../../middlewares/access')(2);
const administrator = require('../../middlewares/access')(3);
const router = express.Router();

const storage = multer.diskStorage(
    {
        destination: (request, file, callback) =>
        {
            callback(null, './uploads/');
        },
        filename: (request, file, callback) =>
        {
            callback(null, uuid.v1() + path.extname(file.originalname));
        }
    }
);

const Certificate = require('../../models/Certificate');
const Project = require('../../models/Project');
const Category = require('../../models/Category');
const Product = require('../../models/Product');

router.get('/overview/:id', authenticate.success, employee, async (request, response) =>
    {
        await Category.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').exec(async (error, category) =>
            {
                if(category)
                {
                    await Product.find(
                        {
                            category: category._id
                        }
                    ).exec((error, products) =>
                        {
                            response.render('management/product/overview', { user: request.user, category: category, products: products });
                        }
                    );
                }
                else
                {
                    response.redirect('/management/category/overview/' + category._id);
                }
            }
        );
    }
);
router.get('/view/:id', authenticate.success, employee, async (request, response) =>
    {
        await Product.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').populate('category').exec(async (error, product) =>
            {
                if(product)
                {
                    response.render('management/product/view', { user: request.user, product: product });
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
        await Category.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').exec(async (error, category) =>
            {
                if(category)
                {
                    await Certificate.find().exec((error, certificates) =>
                        {
                            response.render('management/product/create', { user: request.user, category: category, certificates: certificates });
                        }
                    );
                }
                else
                {
                    response.redirect('/management/category/overview/' + category._id);
                }
            }
        );
    }
);
router.get('/edit/:id', authenticate.success, employee, async (request, response) =>
    {
        await Product.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').populate('category').exec(async (error, product) =>
            {
                if(product)
                {
                    await Certificate.find().exec((error, certificates) =>
                        {
                            response.render('management/product/edit', { user: request.user, product: product, certificates: certificates });
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
router.get('/delete/:id', authenticate.success, employee, async (request, response) =>
    {
        await Product.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').populate('category').exec(async (error, product) =>
            {
                if(product)
                {
                    response.render('management/product/delete', { user: request.user, product: product });
                }
                else
                {
                    response.redirect('/management/project/overview');
                }
            }
        );
    }
);

router.post('/create/:id', authenticate.success, employee, multer({ storage: storage }).array('images'), async (request, response) =>
    {
        const { name, rating, price, description, certificates } = request.body;
        let images = request.files.map((image) => { return image.path; });
        const sizes = [];

        request.body.sizes.forEach((size, id) =>
            {
                let quantity = request.body.quantities[id];

                if(size && quantity)
                {
                    sizes.push(
                        {
                            size: size,
                            quantity: quantity,
                        }
                    );
                }
            }
        );

        await Category.findOne(
            {
                _id: request.params.id
            }
        ).populate('project').exec(async (error, category) =>
            {
                if(category)
                {
                    await new Product(
                        {
                            name: name,
                            project: category.project,
                            category: category._id,
                            description: description,
                            price: price,
                            rating: rating,
                            sizes: sizes,
                            images: images,
                            certificates: certificates
                        }
                    ).save().then(() =>
                        {
                            response.redirect('/management/product/overview/' + category._id);
                        }
                    ).catch(() =>
                        {
                            response.render('management/product/create', { user: request.user, category: category });
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

router.post('/edit/:id', authenticate.success, employee, multer({ storage: storage }).array('images'), async (request, response) =>
    {
        const { name, rating, price, description, certificates } = request.body;
        let images = request.files.map((image) => { return image.path; });
        const sizes = [];

        request.body.sizes.forEach((size, id) =>
            {
                let quantity = request.body.quantities[id];

                if(size && quantity)
                {
                    sizes.push(
                        {
                            size: size,
                            quantity: quantity,
                        }
                    );
                }
            }
        );

        await Product.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, product) =>
            {
                if(product)
                {
                    product.name = name;
                    product.description = description;
                    product.price = price;
                    product.rating = rating;
                    product.sizes = sizes;
                    product.certificates = certificates
                    product.updated = Date.now();

                    if(images.length > 0)
                    {
                        product.images = images;
                    }

                    product.save();
                    response.redirect('/management/product/view/' + product._id);
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
        await Product.findOne(
            {
                _id: request.params.id
            }
        ).exec((error, product) =>
            {
                if(product)
                {
                    product.delete();
                }

                response.redirect('/management/product/overview/' + product.category);
            }
        );
    }
);


module.exports = router;