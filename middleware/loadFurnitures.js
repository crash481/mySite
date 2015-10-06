var Furniture = require("../models/furniture").Furniture;
var mongoose = require('../libs/mongoose');
mongoose.set('debug',true);
var config = require('../config');

module.exports = function(req,res,next){

        Furniture.find({},function(err, furniture){
            if(err) console.log('error');
            req.furniture = res.locals.furniture= furniture;
            next();


    });

};