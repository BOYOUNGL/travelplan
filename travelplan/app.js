"use strict";

const express      = require('express');
const bodyParser   = require('body-parser');
const method       = require('method-override');
const multer       = require('multer');
const controller   = require('./controller');
const passport = require('passport');
const mongoose = require('mongoose');
//const mongojs = require('mongojs');
const session = require('express-session');
var router = express.Router();

const app = express();
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: __dirname + '/public/uploads/' }).any());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(method());

app.get('/', controller.intro);
app.get('/login', controller.getlogin);
app.post('/login',function(request, response){

});
app.listen(3000,function(){
    console.log("server");
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

router.get('/',controller.intro);
router.post('/login',passport.authenticate('login',{
    successRedirect:'/',
    failureRedirect:'/',
    failureFlash:true
}));
router.get('/login',controller.getlogin);
router.post('/login',controller.setlogin);
router.get('/join',controller.getmember);
router.post('/join',controller.setmember);
