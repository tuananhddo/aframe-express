var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
global.appRoot = path.resolve(__dirname);

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 99 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var modelsRouter = require('./routes/models');
var syncRouter = require('./routes/sync');
var profileRouter = require('./routes/profileController');
var awsRouter = require('./routes/aws');
var testRouter = require('./routes/testController');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();
app.use(cors())
app.listen(1998, function () {
    console.log('Example app listening on port ' + 3000 + '!');
});

// app.set('view engine', 'pug');
// app.use(express.static('public'))

app.use(logger('dev'));
// app.use(express.json());

// app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(bodyParser());
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs'); // chỉ định view engine là ejs

// app.set('view engine', 'html');
app.use(session({secret: 'cat', cookie: {maxAge: 600000}}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.config.js')(passport); //
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))
app.use(flash());

app.use(express.static(path.join(__dirname, '/public')));
console.log(path.join(__dirname, '/public'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/model', modelsRouter);
// app.use('/sync', syncRouter);
app.use('/aws', awsRouter);
app.use('/profile', profileRouter);
app.use('/test', testRouter);

var busboy = require('connect-busboy');

// default options, no immediate parsing
app.use(busboy());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err)
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
