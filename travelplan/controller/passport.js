var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user.js');
const passport = require('passport');
console.log("passport.js");
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(error,user){
            done(error,user);
        });
    });

    passport.use('login',new LocalStrategy({
        usernameField:'id',
        passwdField:'passwd',
        passReqToCallback:true
    },
    function(req,id,passwd,done){
        console.log(id);
        User.findOne({'id':id},function(error,user){
            if(error) return done(error);
            if(!user) return done(null,false,req.flash('loginMessage','사용자를 찾을 수 없습니다'));
            if(!user.validPasswd(passwd)) return done(null,false,req.flash('loginMessage','비밀번호가 다릅니다.'));
            return done(null,user);
        });
    }));

