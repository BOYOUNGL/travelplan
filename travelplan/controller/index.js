
var User = require('../models/user.js');

/**
 * issue
 *
 * Beginning, Existing
 * @public
 */

module.exports.intro = function(req, res) {
  /**
  * Views Folder File Name
  **/
  res.render('intro');
};

/**
 * login
 */

module.exports.getLogin =  function (req, res) {
  console.log('getlogin');
  res.render('login');
};

module.exports.postLogin =  function (req, res) {
  console.log('setlogin');
  res.redirect('home');
};

/**
 * member join
 */

module.exports.getJoin =  function (req, res) {
  console.log('getJoin');
  res.render('join');
};

module.exports.postJoin =  function (req, res) {
    var user = new User;
    user.id = req.body.id;
    user.passwd = req.body.passwd;
    user.email = req.body.email;
    user.save(function (err) {
        if (err) throw err;
    });
    res.redirect('login');
};

module.exports.getHome =  function (req, res) {
  console.log('home');
  res.render('home');
};
