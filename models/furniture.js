var mongoose = require('../libs/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    producer: {
        type: String
    }
});

exports.Furniture = mongoose.model('Furniture', schema);