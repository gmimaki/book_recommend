//set_image.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var multer = require('multer');
var easyimg = require('easyimage');
var upload = multer({dest: './public/images/uploads'});
var minified = multer({dest: './public/images/uploads'});
var cloudinary = require('cloudinary');
var fs = require('fs');
cloudinary.config({
  cloud_name: 'dkposxhep',
  api_key: '796393254666366',
  api_secret: 'X5q8QldvhqiEeyDRSQ1JEIzSOhc'
});
var anti = require('../anti');


router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var confirmQuery = 'SELECT image FROM users WHERE user_id = "' + my_id + '"';
    connection.query(confirmQuery, function(err, image){
      if(typeof image[0].image != 'undefined'){
        res.render('set_image', {
          title: 'プロフィール画像設定',
          image: image[0].image
        });
      } else {
        res.render('set_image', {
          title: 'プロフィール画像設定',
          image: ''
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', upload.single('image_file'), function(req, res, next){
  var tmpPath = req.file.path;
  var targetPath = './public/images/minified/' + req.file.filename;
  var settingObj = {
    format: 'jpg',
    src: tmpPath,
    dst: targetPath,
    width: 150,
    height: 150,
    fill: true
  };
  var encode = function(filename, callback){
    var file = fs.readFile(filename, function(err, data){
      callback(err, new Buffer(data).toString('base64'));
    });
  }
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    if(req.file.originalname.match(/[jpg|gif|png|JPG|GIF|PNG]$/) && req.file.mimetype.match(/image/)){
      easyimg.resize(settingObj)
             .then(function(image){
               encode(image.path, function(err, string){
                 if(err){
                   throw err;
                 }
                 fs.unlink(tmpPath, function(err){
                   cloudinary.uploader.upload(targetPath, function(result){
                     var imagePath = result.url;
                     imagePath = imagePath.replace(/http:/, "");
                     var query = 'UPDATE users SET image = "' + imagePath + '" WHERE user_id = "'
                               + my_id + '";';
                     connection.query(query, function(err, rows){
                       res.redirect('/settings');
                     })
                   });
                 });
               });
             })
             .then(function(err){
               throw err;
             });
    } else {
      res.render('set_image', {
        title: 'プロフィール画像登録',
        message: '画像ファイルをアップロードしてください。',
        image: ''
      });
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
