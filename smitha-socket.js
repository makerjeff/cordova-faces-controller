/**
 * Created by jeffersonwu on 5/25/16.
 */


// SOCKET.IO BOILERPLATE
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
// SOCKET.IO BOILERPLATE - END

var colors = require('colors');

// SERIALPORT BOILERPLATE
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = process.argv[2];
var portConfig = {
    baudRate: 9600,
    //calls myPort.on('data') when a newline is received
    parser: serialport.parsers.readline('\n')
};

//open the serial serverPort
var myPort = new SerialPort(portName, portConfig);

// SERIALPORT BOILERPLATE - END

//localhost controller
app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/smitha-socket.html');
});

//for pi2 controller. WuYangNet (localhost:3000)
app.get('/pi2/', function(req, res){
    res.sendFile(__dirname + '/public/smitha-socket-pi2.html');
});

//for pi2 controller, WuYangNet (192.168.1.110:3000)
app.get('/pifi/', function(req, res){
    res.sendFile(__dirname + '/public/smitha-socket-pi2-pifi.html');
});

app.get('/derek/', function(req, res){
    res.sendFile(__dirname + '/public/touch_controller.html');
});

// SOCKET.IO
io.on('connect', function(socket){
    console.log(socket.client.id.toString().blue + ' has connected' );

    socket.on('message', function(messageData){
        console.log(messageData);


        myPort.write(messageData, function(error, bytesWritten){
            if(error) {
                return console.log('error: '.red + error.message);
            } else {
                console.log('number of bytes written: '.green + bytesWritten);
            }
        });
    });

    socket.on('disconnect', function(){
        console.log(socket.client.id.toString().red + ' has disconnected');
    });
});

// SERIAL
myPort.on('open', function(){
    console.log('SerialPort open, BAUD rate: ' + myPort.options.baudRate);
});

//start the server
server.listen(3000);
console.log('smitha-server is starting on port 3000'.rainbow);