"use strict";

const express      = require('express');
const bodyParser   = require('body-parser');
const method       = require('method-override');
const multer       = require('multer');
const controller   = require('./controller');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: __dirname + '/public/uploads/' }).any());
app.use(express.static(path.join(__dirname, 'public')));
app.use(method());

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
require('./controller/passport');

app.use(passport.initialize());
app.use(passport.session());//로그인 세션유지

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

app.get('/', controller.intro);
app.get('/login', controller.getLogin);
app.post('/login',passport.authenticate('login',{
    successRedirect:'/home',
    failureRedirect:'/',
    failureFlash:true
}));
app.get('/join',controller.getJoin);
app.post('/join', controller.postJoin);
app.get('/home',controller.getHome);
app.get('/addStroy',controller.getAddStory);
