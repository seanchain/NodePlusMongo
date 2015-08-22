var mongoose = require('mongoose');
var moment = require('moment');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
app.engine('.hbs', exphbs({defaultLayout: 'Single', extname: '.hbs'}));
app.set('view engine', '.hbs');

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


var secondblog = new Blogs({
    title: "中文的测试",
    author: "中国作家",
    body: "大家早上好，我们组做的是一个新闻聚合网站",
    comments: [{ body: "好!", date: Date.now()}, { body : "支持!", date: Date.now() - 42 }],
    hidden : false,
    meta: { votes : 6, favs : 8}
});

var thirdblog = new Blogs({
    title: "中文繁體測試",
    author: "HK作家",
    body: "大家早晨，我地組做嘅是一個新聞聚合類網站",
    comments: [{ body: "好哇！", data: Date.now()}, { body : "識得唔識得", date: Date.now() - 56}],
    hidden: false,
    meta: { votes : 4, favs : 5}
})

console.log(firstblog.author);
firstblog.printout();

mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(err) {
    console.log("There is a fatal error!");
});

db.once('open', function(callback) {
    console.log("There's a connection to the mongodb server!!!");
    // firstblog.save(function(err, fb) {
    //     if (err) return console.log(err);
    // })
    // secondblog.save(function(err, sb) {
    //     if (err) return console.log(err);
    // })
    // thirdblog.save(function(err, tb) {
    //     if (err) return console.log(err);
    // })
});

Blogs.find({'meta.votes':1}, 'meta body comments', function(err, blogs) {
    for (var i = 0; i < blogs.length; i ++) {
        console.log(moment(blogs[i].comments[0].date).format('YYYY-MM-DD HH:mm:ss'));
    }
});

Blogs.remove({'meta.votes':4}, function (err) {
    console.log(err);
});

Blogs.update({'author':"著名中国作家"}, {$set: {'author':"中国作家", 'meta.votes':123}}, function(err, raw) {
    console.log(err + "\n" + raw);
})
