var express = require('express');
var router = express.Router();
var fs = require("fs");
var multiparty = require('multiparty');
var async = require('async');
var mongoose = require('../libs/mongoose');
mongoose.set('debug',true);
var Furniture = require('../models/furniture').Furniture;
var config = require('../config');

function generate(str) {
    return str.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        return (c == 'x' ? r : (r & 0x3 | 0x8 )).toString(16);
    });
}



function saveToDB(furniture){
        furniture.save();
}

router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Админка' });

});

router.get('/login', function(req, res, next) {
    res.render('adminLogin', { title: 'Админка' });

});

router.post('/login', function(req, res, next) {
    // создаем форму
    var form = new multiparty.Form();
    var errors = [];
    var pass;

    form.on('field', function(name,value) {
        if(name=='adminPass'){
            pass = value;
        }
    });

    //если произошла ошибка
    form.on('error', function(err){
            console.log('error');
    });

    form.on('close', function() {
        //если нет ошибок и все хорошо
        if(errors.length == 0) {
            res.send(  );
        }
        else {
            //сообщаем что все плохо и какие произошли ошибки
            res.send({status: 'bad', errors: errors});
        }
    });

    // парсим форму
    form.parse(req);
});


router.post('/', function(req, res, next) {
    // создаем форму
    var form = new multiparty.Form();
    //здесь будет храниться путь с загружаемому файлу, его тип и размер
    var uploadFile = {path: '', type: '', size: 0};
    var uploadFields = {name:'', description:'', category:'' };
    //максимальный размер файла
    var maxSize = 2 * 1024 * 1024; //2MB
    //поддерживаемые типы(в данном случае это картинки формата jpeg,jpg и png)
    var supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    //массив с ошибками произошедшими в ходе загрузки файла
    var errors = [];

    form.on('part', function(part) {
        // при поступление файла
        if (part.filename) {
            //читаем его размер в байтах
            uploadFile.size = part.byteCount;
            //читаем его тип
            uploadFile.type = part.headers['content-type'];
            //путь для сохранения файла
            uploadFile.path = './public/img/upload/'+generate('file_xxxxxxxxx'+'.'+uploadFile.type.substr(uploadFile.type.indexOf('/')+1));
            //проверяем размер файла, он не должен быть больше максимального размера
            if (uploadFile.size > maxSize) {
                errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
            }

            //проверяем является ли тип поддерживаемым
            if (supportMimeTypes.indexOf(uploadFile.type) == -1) {
                errors.push('Unsupported mimetype ' + uploadFile.type);
            }

            //если нет ошибок то создаем поток для записи файла
            if (errors.length == 0) {
                var out = fs.createWriteStream(uploadFile.path);
                part.pipe(out);
            }
            else {
                part.resume();
            }
        }
        //при считывании полей
        else{
            part.resume();
        }
    });

    form.on('field', function(name,value) {
        if(name=='title'){
            uploadFields.name = value;
        }
        if(name=='description'){
            uploadFields.description = value;
        }
        if(name=='category'){
            uploadFields.category = value;
        }
    });

    //если произошла ошибка
    form.on('error', function(err){
        if(fs.existsSync(uploadFile.path)) {
            //если загружаемый файл существует удаляем его
            fs.unlinkSync(uploadFile.path);
            console.log('error');
        }
    });

    form.on('close', function() {
        //если нет ошибок и все хорошо
        if(errors.length == 0) {
            //сообщаем что все хорошо и создаем элемент
            var furnitureToAdd = new Furniture( {name: uploadFields.name, description: uploadFields.description, category: uploadFields.category, imgPath: uploadFile.path} );
            saveToDB(furnitureToAdd);
            res.send({status: 'ok', text: 'Success'});
        }
        else {
            if(fs.existsSync(uploadFile.path)) {
                //если загружаемый файл существует удаляем его
                fs.unlinkSync(uploadFile.path);
            }
            //сообщаем что все плохо и какие произошли ошибки
            res.send({status: 'bad', errors: errors});
        }
    });

    // парсим форму
    form.parse(req);
});


module.exports = router;