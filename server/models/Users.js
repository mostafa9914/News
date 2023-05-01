const mongoose = require('mongoose');
const UserSchema =  new mongoose.Schema({
  email:{type:String},
  type:{type:String},
  password:{type:String},
});
const UsersModel = mongoose.model("Users", UserSchema);
module.exports = UsersModel;

