var crypt = require('crypto-js');

exports.MD5 = function(str) {
  return crypt.MD5(str).toString();
}

exports.SHA1 = function (str) {
  return crypt.SHA1(str).toString();
}
