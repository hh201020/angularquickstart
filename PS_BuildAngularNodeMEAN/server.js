var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// set NODE_ENV on heroku: heroku config:set NODE_ENV=production
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

if (env == 'development') {
  mongoose.connect('mongodb://localhost:27017/multivision');
} else {
  mongoose.connect('mongodb://jeames:multivision@ds123370.mlab.com:23370/multivision');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});

var messageSchema = new mongoose.Schema({ message: String });
var Message = mongoose.model('Message', messageSchema);

// var inputMessage = new Message({
//   message: 'testing mongoose'
// });

// inputMessage.save(function(err, inputMessage) {
//   if (err) return console.error(err);
//   console.dir(inputMessage);
// });

var mongoMessage;
Message.findOne().exec(function (err, messageDoc) {
  if (messageDoc != undefined && messageDoc.message != undefined) {
    mongoMessage = messageDoc.message;
    console.log('get mongoose testing message: ' + mongoMessage);
  } else {
    console.log('Message database is empty.');
  }
});

app.get('/partials/:partialPath', function (req, res) {
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
  res.render('index', {
    mongoMessage: mongoMessage
  });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');