var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

var routes = require('./routes/users');
var route = require('./routes/route');
var auth = require('./config/auth');
//Passport
var passport = require('passport');
require('./config/passport')(passport); 

var User = require('./models/User');
var app = express();
app.use(fileUpload());

// Initializing database
mongoose.connect(auth.database, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to Database...');
    insertPMUser();

}); // Connect to database

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.use(express.static(path.join(__dirname, './product_images')));
// app.disable/('x-powered-by');
app.use(passport.initialize());
app.use(passport.session());
app.use('/*', function (req, res, next) {
    // CORS headers
    require('./middleware/access-control')(req, res, next);
});


app.use('/api', routes);
app.use('/api', route);

// All remaining requests return the VueJs app, so it can handle routing.
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/dist/client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            status: err.status || 500,
            message: err.message
        })
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    })
});


app.listen(2000, function () {
    console.log('server is listening on 2000');
});

// module.exports = app;

// async function initiateGuest() {
//     const user = await User.findOne({ firstName: config.Guest.name });
//     if (!user) {
//         let collection = new User({
//             firstName: config.Guest.name,
//         })
//         await collection.save();
//     }
// }

async function insertPMUser() {
    const user = await User.findOne({ email: 'shop1@gmail.com' });
    if (!user) {
        let collection = new User({
            email: 'shop1@gmail.com',
            name: 'Akshay dhiman',
            password: 'abc@1234',
            type:"shop"
        })
        await collection.save();
    }
}