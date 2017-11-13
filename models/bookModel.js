var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var bookModel = new Schema({
        title:{type: String},
        author: {type:String},
        page: {type:Number, min:1, max:1000},        
        price: {type:Number, min:0, max:100000}
    });

    var Genre = module.exports = mongoose.model('Book', bookModel);