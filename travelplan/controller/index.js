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
  res.render('login');
};
