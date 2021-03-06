var express = require('express');
var app = express();
var path = require("path");
var predict = require(path.join(__dirname+'/pi-bus-alert/get_cta_predictions.js'));

var port = 9000;

app.use(express.static('build'));

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);

// Set up a home page / possible place to interface for which buses to watch on what days
app.get('/',function(req,res){
  res.sendFile(path.join('index.html'));
});

app.listen(port, function () {
  console.log('API listening on port: ' + port);
});

app.get('/prediction', function(req,res){
	predict().then(function(minutes) {
		res.header('Access-Control-Allow-Origin', '*');
		res.json(minutes);
	});
});
