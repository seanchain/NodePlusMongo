var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var fortune = require('./lib/fortune.js');



var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8888);

app.use(express.static(__dirname + '/public')); // handle static files or views

// Use app.get to add the routes, and it doesn't care about the case or the trailing slash
app.get('/', function(req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function(req, res) {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    // res.render('about');
    res.render('about', { fortune:fortune.getFortune() });
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
    res.render('headers', { headers:req });
});

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

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to  terminate');
});