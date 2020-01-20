
const express = require('express')
const routes = express.Router()
const BaseController = require('../controllers/baseController')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const uploadFile = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileFormat(file, cb);
    }
  }).single('profileIcon');


  function checkFileFormat(file,cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    console.log ("file.size" , file)
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb({msg :"Image file accepted only!"} , false);
    }
  }

const uploadIcon = (req,res,next) => {
    uploadFile (req,res , (err) => {
        if(err){
            if(err.code == "LIMIT_FILE_SIZE"){
                res.json({success : false , msg : "File size is too Large"})
            } else {
                res.json({success :false , msg : err.msg})
            }
        } else if(req.file == undefined){
            res.json({success : false , msg :"Please choose the file"})
        } else {
            next();
        }     
    });
}

routes.get('/' , BaseController.login)

routes.get('/signup' , BaseController.signup)

routes.post('/saveSignup' , uploadIcon , BaseController.saveSignup)

routes.post('/checkLogin' , BaseController.checkLogin)

routes.get('/profile' , BaseController.profile)

routes.get('/logout' , BaseController.logout)
module.exports = routes
