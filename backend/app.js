require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/Users');
const connectDB = require('./config/db');
const cors = require('cors');
// // Seed the admin user
// const seedAdmin = require('./routes/admin');
// seedAdmin();
connectDB();

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const subscriberRouter = require('./routes/subscriber');
const postRouter = require('./routes/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'zombie',
  })
);

app.use('/uploads', express.static('uploads'));
app.use(cors({origin: true, credentials: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/public', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/subscriber', subscriberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // const port = process.env.PORT || 4000;
  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
