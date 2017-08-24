var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var user = mongoose.Schema({
    id:{type:String, unique:true},
    email:String,
    passwd:String,
    userNum:String,
    date:{type:Date, default:Date.now}
});

// user.methods.generateHash = function(passwd){
//     return bcrypt.hashSync(passwd,bcrypt.genSaltSync(8),null);
// };

user.methods.validPasswd = function(passwd){
    // return true;
    // return bcrypt.compareSync(passwd,this.passwd);
    if (passwd == this.passwd) {
        return true;
    } else {
        return false;
    }
};
module.exports = mongoose.model('User',user);
