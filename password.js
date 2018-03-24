var sechash = require('sechash');

var hash = function(password){
  var opts = {
    algorithm: 'sha512',
    iterations: 0000,
    salt: 'XXXXXXXXXXXXXXX'
  };
  var ret = {};
  ret.createHash = function(password){
    return sechash.strongHashSync(password, opts);
  };
  ret.check = function(password, hash){
    return sechash.testHashSync(password, hash, opts);
  }
  return ret;
}

var password = hash();

module.exports = password;
