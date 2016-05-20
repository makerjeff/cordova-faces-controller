/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


var button = document.getElementById('clickBox');
var text = document.getElementById('clickText');

var redState = true;

// button.addEventListener('click', function(event){
//     if(redState == true){
//         button.style.background = 'rgba(0,255,0,1.0)';
//         console.log('turning green');
//     } else {
//         button.style.background = 'rgba(255,0,0,1.0)';
//     }
//
//     redState = !redState;
// });

button.addEventListener('touchstart', function(e){
    console.log('touch started');
    button.style.background = 'rgba(0,255,0,1.0)';

    text.innerHTML = 'touching!';
});

button.addEventListener('touchend', function(e){
    console.log('touch ended');
    button.style.background = 'rgba(255,0,0,1.0)';

    text.innerHTML = 'touch ended!';
});

button.addEventListener('touchcancel', function(e){
    console.log('touch canceled?');
    button.style.background = 'rgba(0,0,0,1.0)';
});

button.addEventListener('touchmove', function(e){
    console.log('moving!');
    button.style.background = 'rgba(0,0,255,1.0)';

    text.innerHTML = 'x: ' + e.touches[0].screenX.toFixed(2) + ', y: ' + e.touches[0].screenY.toFixed(2) + '<br>' + 'xPage: ' + e.touches[0].pageX.toFixed(2) + 'yPage: ' + e.touches[0].pageY.toFixed(2);
});

