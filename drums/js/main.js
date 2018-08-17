var DATA = {
  'ArrowLeft': {color: '#D686B8', paths: ['btn-left'], audio: 'middletom', clicked: false},
  'ArrowUp': {color: '#8485C0', paths: ['btn-up', 'btn-up2'], audio: 'floortom', clicked: false},
  'ArrowRight': {color: '#93D9F6', paths: ['btn-right'], audio: 'hitom', clicked: false},
  'ArrowDown': {color: '#9DCE76', paths: ['btn-down'], audio: 'kick', clicked: false},
  'Space': {color: '#FDF280', paths: ['btn-space'], audio: 'crash', clicked: false},
  'Click': {color: '#FAB06C', paths: ['btn-click'], audio: 'hihats', clicked: false},
}

document.body.onkeydown = document.body.onkeyup = handleKey;

function handleKey(e) {
  if(e.code in DATA) {
    if(e.type == 'keydown') {
      DATA[e.code].paths.forEach(function(path) {
        $('#' + path).style.fill = DATA[e.code].color;
      });
      if(DATA[e.code].clicked == false) {
        $('#' + DATA[e.code].audio).currentTime = 0;
        $('#' + DATA[e.code].audio).play();
      }
      DATA[e.code].clicked = true;
    } else if(e.type == 'keyup') {
      DATA[e.code].paths.forEach(function(path) {
        $('#' + path).style.fill = '#FFFFFF';
      });
      DATA[e.code].clicked = false;
    }
  }

}

$('svg').onmousedown = function() {
  $('#btn-click').style.fill = DATA['Click'].color;
  $('#' + DATA['Click'].audio).currentTime = 0;
  $('#' + DATA['Click'].audio).play();
};

document.body.onmouseup = function() {
  $('#btn-click').style.fill = '#FFFFFF';
};

function handleClick(e) {

}
