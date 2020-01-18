const User = require('../models/user')

exports.login = (req,res) =>{
    res.render('login' , {errors : false})
}

exports.signup = (req,res) => {
    res.render('signup', {errors : false})
}

exports.saveSignup = (req,res) => {
    var newUser = User({
        firstname : req.body.first_name,
        lastname : req.body.last_name,
        email : req.body.email,
        password : req.body.password,
        iconpath : req.file.path
    })

    newUser.save(err => {
        if(err) {
          res.json({success : false , msg :err.msg})
        } else {
          res.json({success : true , msg :"null"})
        }
    })
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
                email : result.email,
                iconpath : result.iconpath
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

exports.logout = (req, res) => {
  res.clearCookie('user_session');
  res.redirect('/');
}
