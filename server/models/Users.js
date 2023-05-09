const mongoose = require('mongoose');
const UserSchema =  new mongoose.Schema({
  email:{type:String , require:true},
  type:{type:String , require:true},
  password:{type:String},   
});
const UsersModel = mongoose.model("users", UserSchema);
module.exports = UsersModel;

