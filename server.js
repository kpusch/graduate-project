// Load required modules

var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module

var path = require('path');
///////////////////메인페이지 170325 추가
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var socketIo = require("socket.io");        // web socket external module

var serveStatic = require('serve-static');  // serve static files

var option = 
{
     key: fs.readFileSync(path.join(__dirname, resolveURL('fake-keys/privatekey.pem'))),
    cert: fs.readFileSync(path.join(__dirname, resolveURL('fake-keys/certificate.pem')))
  };
var http    = require("https");              // http server core module

var app = express();

//mysql 세팅


/////////////////////////////////
//170401
var client = mysql.createConnection({
  host: '211.253.24.236',
  port:3306,
  user: 'root',
  password: '1q2w3e4r!',
  database: 'cedu'
});

var MySQLStore = require('express-mysql-session')(session);
app.use(bodyParser.urlencoded({extended:false}));

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


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.set('routes',__dirname + '/routes');  


app.use(express.static('public'));


var router = require('./routes/main')(app);

var webServer = http.createServer(option, app).listen(3030);




// app.post('/register.html', function (request, response) {

//   var body = request.body;

//   client.query('INSERT INTO member (username, password, email, tel, check1, check2) VALUES (?, ?, ?, ?, ?, ?)', [
//       body.username, body.password, body.email, body.tel, body.check1, body.check2
//         ], function () {

//     response.redirect('/');
//     console.log(body);
//   });
// });

// app.post('/result',function(req,res){
//   if(req.session.name){
//     fs.readFile('main_page.html', 'utf8', function(error, data){
//       //res.send(output);
//       //res.send(req.session.name);
//       res.redirect('/');
//     });
//       //res.send(req.session.name);
//   }else{
//     res.send('login Please');
//   }

// });



// app.post('/login',function(req,res){
//   var body = req.body;

//   var id = body.username;
//   var pw = body.password;
//   var ch = body.check1;
//   //client.query('SELECT username,password FROM member WHERE username = ? and password = ?', [body.username, body.password],
//     client.query('SELECT username,password, check1 FROM member',
//     function(error, data){

//         for(var i=0; i<data.length; i++){
//           if(data[i].username == id){
//             req.session.name = data[i].username;
//             req.session.check = data[i].check1;
//             console.log(data,data[i].username,data.length, id, pw, ch);
//             console.log(req.session.check, '1');
//             res.redirect('/');
//             }

//         }

//         //res.redirect('/login');

//       if(error){
//         console.log("error", error);
//         res.redirect('/');
//       }

//   });

//   var user ={
//     uid : body.username,
//     upw : body.password,
//     name : body.username
//   };
    

// });


// Muaz Khan      - www.MuazKhan.com
// MIT License    - www.WebRTC-Experiment.com/licence
// Documentation  - github.com/muaz-khan/RTCMultiConnection

function resolveURL(url) {
    var isWin = !!process.platform.match(/^win/);
    if (!isWin) return url;
    return url.replace(/\//g, '\\');
}

// Please use HTTPs on non-localhost domains.
var isUseHTTPs = true;

// var port = 443;
var port = process.env.PORT || 9001;

var fs = require('fs');
var path = require('path');

// see how to use a valid certificate:
// https://github.com/muaz-khan/WebRTC-Experiment/issues/62


// force auto reboot on failures
var autoRebootServerOnFailure = false;


// skip/remove this try-catch block if you're NOT using "config.json"

// You don't need to change anything below

var server = require(isUseHTTPs ? 'https' : 'http');
var url = require('url');

function serverHandler(request, response) {
    try {
        var uri = url.parse(request.url).pathname,
            filename = path.join(process.cwd(), uri);

        if (filename && filename.search(/server.js|Scalable-Broadcast.js|Signaling-Server.js/g) !== -1) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write('404 Not Found: ' + path.join('/', uri) + '\n');
            response.end();
            return;
        }

        var stats;

       


        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.write('404 Not Found: ' + path.join('/', uri) + '\n');
                response.end();
                return;
            }

            
            response.write(file, 'binary');
            response.end();
        });
    } catch (e) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('<h1>Unexpected error:</h1><br><br>' + e.stack || e.message || JSON.stringify(e));
        response.end();
    }
}

var app;

if (isUseHTTPs) {
    app = server.createServer(option, serverHandler);
} else {
    app = server.createServer(serverHandler);
}

function runServer() {
    app.on('error', function(e) {
        if (e.code == 'EADDRINUSE') {
            if (e.address === '0.0.0.0') {
                e.address = 'localhost';
            }

            var socketURL = (isUseHTTPs ? 'https' : 'http') + '://' + e.address + ':' + e.port + '/';

           
            foo = new cmd_exec('lsof', ['-n', '-i4TCP:9001'],
                function(me, data) {
                    me.stdout += data.toString();
                },
                function(me) {
                    me.exit = 1;
                }
            );

            setTimeout(log_console, 250);
        }
    });

    app = app.listen(port, process.env.IP || '0.0.0.0', function(error) {
        var addr = app.address();

        if (addr.address === '0.0.0.0') {
            addr.address = 'localhost';
        }

        var domainURL = (isUseHTTPs ? 'https' : 'http') + '://' + addr.address + ':' + addr.port + '/';
    });

    require('./Signaling-Server.js')(app, function(socket) {
        try {
            var params = socket.handshake.query;

            // "socket" object is totally in your own hands!
            // do whatever you want!

            // in your HTML page, you can access socket as following:
            // connection.socketCustomEvent = 'custom-message';
            // var socket = connection.getSocket();
            // socket.emit(connection.socketCustomEvent, { test: true });

            if (!params.socketCustomEvent) {
                params.socketCustomEvent = 'custom-message';
            }

            socket.on(params.socketCustomEvent, function(message) {
                try {
                    socket.broadcast.emit(params.socketCustomEvent, message);
                } catch (e) {}
            });
        } catch (e) {}
    });
}

if (autoRebootServerOnFailure) {
    // auto restart app on failure
    var cluster = require('cluster');
    if (cluster.isMaster) {
        cluster.fork();

        cluster.on('exit', function(worker, code, signal) {
            cluster.fork();
        });
    }

    if (cluster.isWorker) {
        runServer();
    }
} else {
    runServer();
}
