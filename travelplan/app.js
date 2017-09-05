"use strict";

const express      = require('express');
const bodyParser   = require('body-parser');
const method       = require('method-override');
const multer       = require('multer');
const controller   = require('./controller');
const passport = require('./controller/passport');
const path = require('path');
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const session = require('express-session');
const flash = require('connect-flash');
const cookieSession = require('cookie-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: __dirname + '/public/uploads/' }).any());
app.use(express.static(path.join(__dirname, 'public')));
app.use(method());
app.use(flash());

app.listen(3000,function(){
    console.log("start server");
});
//database
mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(callback){
    console.log("mongoDB connected");
});

/*app.use(cookieSession({
  keys: ['test'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}));*/
app.use(passport.initialize());
app.use(passport.session());//로그인 세션유지

app.get('/', controller.intro);

app.get('/login', controller.getLogin);
app.post('/login',passport.authenticate('login',{
    successRedirect:'/home',
    failureRedirect:'/',
    failureFlash:true
}),controller.postLogin);
app.get('/logout',function(req,res){
    req.logout();
    req.redirect('/');
})

app.get('/join',controller.getJoin);
app.post('/join', controller.postJoin);
app.get('/home',controller.getHome);
app.get('/addStroy',controller.getAddStory);

var client_id = 'Q0VGMQp6k95cYD3Qdrn8';
var client_secret = '2OVe_Cn23p';
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/home");
var api_url = "";
app.get('/naverlogin', function (req, res) {
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });
 app.get('/callback', function (req, res) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });
app.get('/me',controller.getHome);
