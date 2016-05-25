
//******** DON'T USE IN PRODUCTION! POLLUTES GLOBAL SCOPE! *********
var button = document.getElementById('clickBox');
var text = document.getElementById('clickText');
var info = document.getElementById('infoBox');

var baseValue = 0;
var motorValue1 = 0;

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
    text.innerHTML = 'touch ended!';
});

button.addEventListener('touchcancel', function(e){
    console.log('touch canceled?');
    button.style.background = 'rgba(0,0,0,1.0)';
});

button.addEventListener('touchmove', function(e){
    console.log('moving!');
    button.style.background = 'rgba(190,190,255,1.0)';

    motorValue1 = baseValue - e.touches[0].pageY;

    text.innerHTML = 'screen-X: ' + e.touches[0].screenX.toFixed(2) + ', screen-Y: ' + e.touches[0].screenY.toFixed(2) + '<br>' 
        + 'page-X: ' + e.touches[0].pageX.toFixed(2) + ' page-Y: ' + e.touches[0].pageY.toFixed(2) + '<br>' 
        + 'motor value: ' + motorValue1;
});

