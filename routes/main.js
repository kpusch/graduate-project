var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var session = require('express-session');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
app.use(bodyParser.urlencoded({extended:false})); //미들웨어 등록부분

var client = mysql.createConnection({
  host: '211.253.24.236',
  port:3306,
  user: 'root',
  password: '1q2w3e4r!',
  database: 'cedu'
});


app.use(session({
  secret : 'dsdfsdfwerwer!!!sdfsdfs', // session id 보안 아무 값이나 넣어도 된다.
  resave: false, //session Id를 접속할 때마다 새로 발급을 하지 말라
  saveUnintialized: true,//session을 사용하기 전까지는 발급을 하지 말라
  //위 사항은 권장 값이다. (여기까지 세션 처리)
  store: new MySQLStore({
  host: '211.253.24.236',
  port: 3306,
  user: 'root',
  password: '1q2w3e4r!',
  database: 'cedu' //db name
    })
  })
);


module.exports = function(app)
{

    app.get('/index',function(req,res){
         res.render('index.ejs')
     });

     app.get('/',function(req,res){
        res.render('index.html')
     });
     
     app.get('/about',function(req,res){
        res.render('about.html');
    });

    //화상 부분
    app.get('/service', function(req, res){
        res.render('gm.html');
    });   

    app.get('/service2', function(req, res){
        res.render('gm2.html');
    });    

    app.get('screen-sharing', function (request, response) {

      fs.readFile('screen-sharing.html', 'utf8', function (error, data) {
        response.send(data);
      });
    });

    //CRUD

    app.get('/login_page',function(req,res){
      res.render('login.html');
    });
    
    app.get('/register_page',function(req,res){
      res.render('register.html');
    });
    


    app.post('/register', function (request, response) {

      var body = request.body;

      client.query('INSERT INTO users (username, password, email, tel, check1, check2) VALUES (?, ?, ?, ?, ?, ?)', [
          body.username, body.password, body.email, body.tel, body.check1, body.check2
            ], function () {

        response.redirect('/');
        console.log(body);
      });
    });


    app.post('/login',function(req,res){
      var body = req.body;

      var id = body.username;
      var pw = body.password;
      var ch = body.check1;
      //client.query('SELECT username,password FROM member WHERE username = ? and password = ?', [body.username, body.password],
        client.query('SELECT username,password, check1 FROM users',
        function(error, data){

            for(var i=0; i<data.length; i++){
              if(data[i].username == id){
                req.session.name = data[i].username;
                req.session.check = data[i].check1;
                console.log(data,data[i].username,data.length, id, pw, ch);
                console.log(req.session.check, '1');

                  res.render('index.ejs',{
          
                    name: req.session.username,
                    check: req.session.check

                  });    

                }

            }

          if(error){
            console.log("error", error);
            res.redirect('/');
          }

      });

      var user ={
        uid : body.username,
        upw : body.password,
        name : body.username
      };
        

    });

     //로그아웃
    app.get('/logout',function(req,res){  //로그아웃처리
        delete req.session.name;
        req.session.save(function(){  //redirect로 인해 db 처리가 안될수도 있다. 콜백함수로 저장을 한뒤 redirect 시켜준다.
          res.redirect('/');
        });
    });


}
