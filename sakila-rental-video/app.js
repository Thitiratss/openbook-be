var createError = require('http-errors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('express-async-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer-route');
var filmRoute = require('./routes/film-route');
var countryRoute = require('./routes/country-route');
var authRouter = require('./routes/auth-route');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/countries', countryRoute);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customerRouter);
app.use('/films', filmRoute);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const errorCode = err.code || (err.message.toUpperCase().replace(/ /g, '_'));
    res.status(status);
    res.json({
        error: errorCode,
        status: status,
        message: err.message,
        resource: req.originalUrl,
        timestamp: new Date().toLocaleString()
    });
});


module.exports = app;

