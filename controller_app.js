/**
 * Cordova-Faces-Backend-NodeJS-Server
 * Created by jeffersonwu on 5/25/16.
 */

//TODO: setup standard socket site to control, then wrap into cordova.

// SOCKET.IO BOILERPLATE
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
// SOCKET.IO BOILERPLATE - END

var colors = require('colors');

//serialport related
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = process.argv[3];
var portConfig = {
    baudRate: 9600,
    //calls myPort.on('data') when a newline is received
    parser: serialport.parsers.readline('\n')
};

//open the serial serverPort
var myPort = new SerialPort(portName, portConfig);

// GLOBALS
var allClients = [];
var serverPort = process.argv[2];


// =========== meat and potatoes ===========

// == middleware ==

//enable CORS
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//debug to console
//DEBUG ALL TO CONSOLE
app.use(function(request, response, next){
    console.log('%s %s %s %s', request.method, request.url, request.path, colors.yellow(Date().toString()));
    next();
});

//serve static files
app.use(express.static(__dirname + '/public'));

// ===== EXPRESS ROUTES =====
app.get('/controller/', function(req, res){
    res.type('text/html');
    res.sendFile(__dirname + '/workshop/www/controller.html');
});

app.get('*', function(req,res){
    res.sendFile(__dirname + '/public/404.html');
});

// ===== SOCKET ROUTES =====
var namespaceString = 'controller';
var nsp = io.of('/' + namespaceString);

//namespaced socket wrapper
nsp.on('connection', function(socket){
    console.log(socket.client.id.toString().blue + ' has connected to nsp: ' + namespaceString);

    //listening for data
    socket.on('motorData', function(data){
        console.log('data received: ' + data);
        //myPort.write(data);
    });

    socket.on('disconnect', function(){
        console.log(socket.client.id.toString().red + ' has disconnected');
    });
});


// start server
initServer(serverPort);

// ***** FUNCTIONS *****
function initServer(port){
    var serverPort = port || 3000;  //if no serverPort, default to 3000
    server.listen(serverPort);
    console.log('Starting server on serverPort ' + serverPort.rainbow);
}
