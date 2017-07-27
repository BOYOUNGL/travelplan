var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    id:String,
    email:String,
    passwd:String,
    userNum:String,
    date:String
});

userSchema.methods.generateHash = function(passwd){
    return bcrypt.hashSync(passwd,bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPasswd = function(password){
    return bcrypt.compareSync(passwd,this.local.passwd);
};
module.exports = mongoose.model('User',userSchema);
