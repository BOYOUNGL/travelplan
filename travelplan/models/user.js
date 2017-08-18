var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var user = mongoose.Schema({
    id:String,
    email:String,
    passwd:String,
    userNum:String,
    date:String
});

/*user.methods.generateHash = function(passwd){
    return bcrypt.hashSync(passwd,bcrypt.genSaltSync(8),null);
};
*/
user.methods.validPasswd = function(passwd){
    return true;
    // return bcrypt.compareSync(passwd,this.passwd);
};
module.exports = mongoose.model('User',user);
