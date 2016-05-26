

    // sock-its:
    var host = 'localhost:3000';
    var namespaceString = 'controller';

    var socket = io(host + '/' + namespaceString);

//built-in disconnect event
    socket.on('disconnect', function(){
        //set disconnect alert
        console.log('aborted socket mission!');
    });

//built-in connect event
    socket.on('connect', function(socket){
        console.log('socket mission is a go!');

        socket.emit('motorData', 'a message of data');

    });

//custom message event, which won't happen on this implementation
//because we're just sending data to the server.
    socket.on('data', function(data){
        console.log(data);
    });


//******** DON'T USE IN PRODUCTION! POLLUTES GLOBAL SCOPE! *********
    var button = document.getElementById('clickBox');
    var text = document.getElementById('clickText');
    var info = document.getElementById('infoBox');

    var baseValue = 0;
    var motorValue1 = 0;
    var motorDir1 = 1;

    info.innerHTML = 'page-width: ' + screen.width + '<br> page-height: ' + screen.height;

    button.addEventListener('touchstart', function(e){
        console.log('touch started');
        button.style.background = 'rgba(190,255,190,1.0)';
        text.innerHTML = 'touching!';
        baseValue = e.touches[0].pageY;
    });

    button.addEventListener('touchend', function(e){
        console.log('touch ended');
        button.style.background = 'rgba(255,190,190,1.0)';
        text.innerHTML = 'touch ended!' + '<br>'
            + 'values reset to zero.';
        motorValue1 = 0;
        console.log('motorValue1 reset to: ' + motorValue1);
    });

    button.addEventListener('touchcancel', function(e){
        console.log('touch canceled?');
        button.style.background = 'rgba(0,0,0,1.0)';
    });

    button.addEventListener('touchmove', function(e){

        console.log('moving!');
        button.style.background = 'rgba(190,190,255,1.0)';

        motorValue1 = baseValue - e.touches[0].pageY;

        if (motorValue1 > 255) {
            motorValue1 = 255;
        }
        else if (motorValue1 < -255){
            motorValue1 = -255;
        }

        if(motorValue1 >= 0) {
            motorDir1 = 1;
        } else {
            motorDir1 = 0;
        }

        // write to display
        text.innerHTML = 'screen-X: ' + e.touches[0].screenX.toFixed(2) + ', screen-Y: ' + e.touches[0].screenY.toFixed(2) + '<br>'
            + 'page-X: ' + e.touches[0].pageX.toFixed(2) + ' page-Y: ' + e.touches[0].pageY.toFixed(2) + '<br>' + '<br>'
            + 'motor value: ' + Math.abs(motorValue1) + '<br>'
            + 'motor direction: ' + motorDir1;

        var motor1Object = {'motorDir': motorDir1, 'motorValue':motorValue1};

        //emit to socket
        socket.emit('data', JSON.stringify(motor1Object));

    });

