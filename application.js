const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config');
const application = express();
const port = process.env.PORT || 4000;

require('./middlewares/passport')(passport);

mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

application.use('/assets', express.static('./assets'));
application.use('/uploads', express.static('./uploads'));

application.use(layouts);
application.set('view engine', 'ejs');
application.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
application.use(bodyParser.json());
application.use(session(
    {
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    }
));
application.use(passport.initialize());
application.use(passport.session());

application.use('/', require('./routes/index'));
application.use('/policy', require('./routes/policy'));
application.use('/user', require('./routes/user'));
application.use('/management', require('./routes/management/index'));
application.use('/management/user', require('./routes/management/user'));
application.use('/management/order', require('./routes/management/order'));
application.use('/management/certificate', require('./routes/management/certificate'));
application.use('/management/project', require('./routes/management/project'));
application.use('/management/category', require('./routes/management/category'));
application.use('/management/product', require('./routes/management/product'));

application.use((request, response, next) =>
    {
        let error = new Error();

        error.message = "The page you're looking for is unavailable";
        error.status = 404;

        throw error;
    }
);

application.use((error, request, response, next) =>
    {
        response.status(error.status || 500);

        response.render('error',
            {
                error: error,
                user: request.user
            }
        );
    }
);

application.listen(port);