const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(morgan('dev'));

app.use(routes);

app.listen(3000, function() {
  console.log('App running on localhost:3000');
});
