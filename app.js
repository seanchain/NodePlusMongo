var express = require('express');
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});
var crypt = require('./lib/crypt.js');
var fortune = require('./lib/fortune.js');
var weather = require('./lib/weather.js');
var db = require('./lib/db.js');


var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8888);

app.use(express.static(__dirname + '/public')); // handle static files or views
app.use(express.static(__dirname + '/bower_components')); // handle bower files
app.use(require('body-parser')());

// Use app.get to add the routes, and it doesn't care about the case or the trailing slash
app.get('/', function(req, res) {
  // res.type('text/plain');
  // res.send('Meadowlark Travel');
  res.render('home');
});

app.post('/process', function(req, res) {
  console.log(req.body.color);
  res.send("<h1>Hola, Mundo</h1>");
  var ret = db.insertARecord(1245, req.body.color);
  console.log(ret);
});

app.post('/registrationProcess', function (req, res) {
  db.addANewUser(req.body.userid, req.body.email, req.body.passwd);
  res.send('Registration Successfully');
});

app.post('/checkValidation', function(req, res) {
  if (req.body.userid == "123")
    res.end("success");
  else res.end("wrong")
});

app.post('/loginProcess', function (req, res) {
  if(req.body.useridoremail == '123' && req.body.passwd == '456') {
    console.log("Authentication successfully!");
    res.redirect('/');
  }
  else
    console.log("Authentication failed");
});

app.get('/about', function(req, res) {
  // res.type('text/plain');
  // res.send('About Meadowlark Travel');
  // res.render('about');
  res.render('about', {
    fortune: fortune.getFortune()
  });
});

app.get('/login', function(req, res) {
  res.render('login');
});

// Test the crypto-js modules
app.get('/crypt', function (req, res) {
  var str = 'Another Stuff';
  res.send(crypt.MD5(str) + "<br />" + crypt.SHA1(str));
});

app.get('/headers', function(req, res) {
  res.set('Content-Type:text/plain');
  var header = {
    host: req.headers['host'],
    connection: req.headers['connection'],
    cache_control: req.headers['cache-control'],
    accept: req.headers['accept'],
    user_agent: req.headers['user-agent'],
    accept_encoding: req.headers['accept-encoding'],
    accept_language: req.headers['accept-language']
  }
  console.log(header['host']);
  res.render('headers', {
    headers: req
  });
});

app.get('/register', function(req, res) {
  res.render('register');
})

app.get('/form', function(req, res) {
  res.render('form');
})

// Use app.use method to add the middleware, it can be a catch-all handler for anything that didn't get matched by a route, and if we put the 404 handler above the routes, the routes won't work and the result will eventually be 404
// custom 404 page
app.use(function(req, res) {
  // res.type('html/plain');
  // res.status(404);
  // res.send('404 - Not Found');
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(req, res) {
  // res.type('html/plain');
  // res.status(500);
  // res.send('500 - Server Error');
  res.status(500);
  res.send('500'); // No longer need to specify the status code or the content type
});

app.use(function(req, res, next) {
  if (!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weather = weather.getWeatherData();
  console.log(weather.getWeatherData());
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to  terminate');
});
