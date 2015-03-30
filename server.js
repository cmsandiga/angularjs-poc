// set up ========================
var express    = require('express');
var app        = express();
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var path       = require('path');

// configuration =================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var port = process.env.PORT || 8080;

require(path.join(__dirname, '/app/login/routes'))(app);
require(path.join(__dirname, '/app/campaign/routes'))(app);
require(path.join(__dirname, '/app/routes'))(app);


process.on('uncaughtException', function(err) {
	console.log(err);
});

// listen (start app with node server.js) ======================================
app.listen(port, function() {
	console.log("App listening on port " + port);
});
