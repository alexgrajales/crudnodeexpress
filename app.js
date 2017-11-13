var express = require('express'),
    mongoose = require('mongoose'),
    bodyParse = require('body-parser');

mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://localhost:27017/bookAPI';
var db = mongoose.connect(mongoDB, { useMongoClient: true });

var Book = require('./models/bookModel');


var app = express();
var port = process.env.PORT || 3000;



app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('glup is Running my app on Port:' + port);
});

