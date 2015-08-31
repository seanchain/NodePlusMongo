var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meadowlark');
var Infos = mongoose.model('Info', {
  userid: Number,
  fav_color: String
});


exports.insertARecord = function(userid, fav_color) {
  var info = new Infos({
    userid: userid,
    fav_color: fav_color
  });
  info.save(function(err) {
    if (err) {
      console.log('Wrong saving the record');
      return "Something wrong when inserting your record";
    }
  })
  return "we are done";
};
