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

module.exports.getlogin =  function (req, res) {
  console.log('getlogin');
  res.render('login');
};

module.exports.setlogin =  function (req, res) {
  console.log('setlogin');
  res.redirect('home');
};

/**
 * member join
 */

module.exports.getmember =  function (req, res) {
  console.log('getmember');
  res.render('join');
};

module.exports.setmember =  function (req, res) {
  console.log('setmember');
  res.redirect('login');
};
