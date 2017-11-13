var express = require('express');

var validaciones = function(price, page){
    console.log(price+' '+page);
    return (((price>0)||(price<=100000))&&((page>1)||(page<=1000)))
}

var routes = function (Book) {    
    var bookRouter = express.Router();
    bookRouter.route('/Books')
        .post(function (req, res) {
            var book = new Book(req.body);
            
            if(validaciones())
            {
                console.log('entro 2');
                book.save();
                res.status(201).send(book);
            }
            else{
                console.log('error');
                res.status(500).send('error el precio debe de estar entre 0 - 100.00 y las paginas entre 1 a 1000');
            }
            
        });

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
            console.log(req.params.bookId);
            Book.findById(req.params.bookId, function (err, book) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        })
        bookRouter.route('/Books/:bookId').put(function(req,res){
            console.log(req);
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.page = req.body.page;
            req.book.price = req.body.price;
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        })
        bookRouter.route('/Books/:bookId').patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }

            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        })
        bookRouter.route('/Books/:bookId').delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return bookRouter;
};

module.exports = routes;