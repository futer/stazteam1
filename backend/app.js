const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('express').Router();
const config = require('./enviromental/enviroments')
const jwt = require('./helpers/jwt');

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
//GRAPHQL
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');

//CORS
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./controllers/user.controller');

const app = express();
//CORS
app.use(cors());
const corsOptions = {
  origin: config.CORS_ADDRESS,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.options(corsOptions, cors());

//GRAPHQL
app.use('/graphql',jwt(),/*cors(),*/ graphqlHTTP(req => ({
  schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }),
  context: (() => {
    req.headers.authorization = (req.headers.authorization) ? req.headers.authorization : 'token';
    return req;
  })()
})))

//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
