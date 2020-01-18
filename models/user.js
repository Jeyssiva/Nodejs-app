// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
var userSchema =  Schema({
  firstname: String,
  lastname: String,
  password: { type: String, required: true },
  email: { type: String, required: true },
  iconpath : {type : String , required : true}
});

var User = mongoose.model('User', userSchema);
module.exports = User;
