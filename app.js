var express = require('express'),
    mongoose = require('mongoose'),
    bodyParse = require('body-parser');

mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://localhost:27017/bookAPI';
var db = mongoose.connect(mongoDB, { useMongoClient: true });


var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());


bookRouter.route('/Books')
    .post(function (req, res) {
        var book = new Book(req.body);
        console.log(book);
        res.send(book);
    })

bookRouter.route('/Books')
        .get(function (req, res) {                
        var query = {};        
        if (req.query.genre) {
            query.genre = req.query.genre;            
        }        
        Book.find({}, function (err, books) {
            if (err) {
                res.status(500).send(err);                
            }
            else {
                res.json(books);                
            }
        });                
    });

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {


        Book.findById(req.param.BookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else
                res.json(book);
        });
    });


app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('glup is Running my app on Port:' + port);
});

