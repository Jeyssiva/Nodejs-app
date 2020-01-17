const User = require('../models/user')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
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

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

exports.login = (req,res) =>{
    res.render('login' , {errors : false})
}

exports.signup = (req,res) => {
    res.render('signup')
}

exports.saveSignup = (req,res) => {
   
    // uploadFile(req,res ,(err)=>{
    //     console.log("iconUpload" ,req.file)
    //     //res.send({msg:"upload"})
    // });


    var newUser = User({
        firstname : req.body.first_name,
        lastname : req.body.last_name,
        email : req.body.email,
        password : req.body.password
    })

    newUser.save(err => {
        if(err) 
        {
            res.status(400).send({err : err })
        } else {
            res.status.redirect('/')
        }
    })

    // req.db.collection("users").insert(req.body,  (err, result) => {
    //     if (err) throw err;
    //     res.render('login')
    //  });
}

exports.checkLogin = (req,res) => {
    console.log(req.body)
    req.checkBody('email' , "Email is required").notEmpty();
    req.checkBody('password' , "Password is required").notEmpty();

    let errors = req.validationErrors();
    if(!errors){
        User.findOne({email : req.body.email , password : req.body.password} , (err,result)=>{
            if(result){
              console.log("result" , result)
              
               req.session.userdetails =  {
                firstname : result.firstname,
                lastname : result.lastname,
                email : result.email
               }
               console.log("req.session.userdetails" , req.session.userdetails)
               res.redirect('/profile')
            } else {
                req.flash('error' , "Invalid user")
                res.redirect('/');
            }
        })
    } else {
        req.flash('error' , errors[0].msg)
        res.redirect('/');
    }
}

exports.profile = (req,res) => {
  res.render('profile')
}

exports.iconUpload = (req,res)=>{
    console.log("req.body.ffile" , req.body)
    console.log("req.body.ffile" , req.files)
    req.session.selectedIcon = req.body.file
  //  console.log(req.session.selectedIcon)

    // console.log("iconUplod-main" , req.body)
    // uploadFile(req,res ,(err)=>{
    //     console.log("iconUpload" ,req.file)
    //     //res.send({msg:"upload"})
    // });
}

exports.logout = (req, res) => {
  res.clearCookie('user_session');
  res.redirect('/');
}