var express = require('express');
var app = express();

// set NODE_ENV on heroku: heroku config:set NODE_ENV=production
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env == 'development') {
} else {
}

app.use(express.static(__dirname + ''));

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');