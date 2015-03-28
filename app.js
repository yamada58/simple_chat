var express = require('express');
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();

// auth
passport.use(new FacebookStrategy({
		clientID: 353127931543410,
		clientSecret: "669cce871efe69d51d6c0b5e14a563dc",
		callbackURL: "http://ec2-52-68-41-207.ap-northeast-1.compute.amazonaws.com/auth/callback",
		authPath: "/auth/",
		failureRedirect: "login"
	},
	function(accessToken, refreshToken, profile, done) {
  console.log('facebook--->>>>accessToken');
  console.log(profile);
		passport.session.accessToken = accessToken;
		process.nextTick(function(){
			done(null, profile);
		});
	}
));
passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(obj, done){
	done(null, obj);
});

var routes = require('./routes/index');
var chat = require('./routes/chat');
var users = require('./routes/users');
var login = require('./routes/login');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET || 'session secret',
	resave: false,
	saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/chat', chat);
app.use('/login', login);
app.get('/auth/', passport.authenticate('facebook'));
app.get('/auth/callback', passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// MySQL
var pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'study',
  password: process.env.DB_PASS || 'study',
  database: process.env.DB_NAME || 'study'
});
app.set('db', pool);

module.exports = app;
