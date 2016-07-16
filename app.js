const app = require('express')();
const express = require('express');
const http = require('http').Server(app).listen(8080);
const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbname','dbuser','dbpassword');
const bodyParser = require('body-parser');






app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public/'));
var User = sequelize.define('user',{
  username:{
    allowNull:false,
    unique:true,
    type:Sequelize.STRING
  },
  password:{
    allowNull:false,
    type:Sequelize.STRING
  }
});

sequelize.sync();

app.post('/',function(req,res){
  var username = req.body.userName;
  var password = req.body.userPassword;

  User.findOne({where:{username:username}}).then(function(user){

    if(password == user.password ){

      res.sendFile(__dirname+'/public/success.html');



    }
    else{
      console.log('an error occured');

      res.redirect("localhost:8080");
    }
  });

});

  app.post('/signup',function(req,res){
    var visitorName = req.body.visitorName;
    var visitorPassword = req.body.visitorPassword;

    User.create({
      username:visitorName,
      password:visitorPassword
    }).then(function(success){
      res.redirect(__dirname+'/public/index.html');
    });


  });


  app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
  });



    });

  });
