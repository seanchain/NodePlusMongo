var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title : String,
    author : String,
    body : String,
    comments : [{ body : String, date : Date }],
    date : { type : Date, default : Date.now },
    hidden : Boolean,
    meta: { votes: Number, favs: Number }
});
// Mongo 的 Blog Schema

BlogSchema.methods.printout = function() {
    console.log(this.title + "***" + this.author);
}

var Blogs = mongoose.model('Blogs', BlogSchema);
var firstblog = new Blogs({
    title: "Hola, mundo",
    author: "Famous Author",
    body: "This is the hola mundo passage",
    comments: [{ body: "good!", date: Date.now()}, { body : "excited!", date: Date.now() - 42 }],
    hidden : false,
    meta: { votes : 1, favs : 4}
});

console.log(firstblog.author);
firstblog.printout();

mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(err) {
    console.log("There is a fatal error!");
});

db.once('open', function(callback) {
    console.log("There's a connection to the mongodb server!!!");
    firstblog.save(function(err, fb) {
        if (err) return console.log(err);
        // console.log(fb);
    })
});

Blogs.find({'meta.votes':1}, 'meta body comments', function(err, blogs) {
    for (var i = 0; i < blogs.length; i ++) {
        console.log(moment(blogs[i].comments[0].date).format('YYYY-MM-DD HH:mm:ss'));
    }
});
