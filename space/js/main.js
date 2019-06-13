var canvas = null;
var ctx = null;
var playerImg = null;
var enemyImg = null;
var entities = [];
var player = null;
var score = 0;
var keys = {
  'ArrowUp': {clicked: false, justClicked: false},
  'ArrowDown': {clicked: false, justClicked: false},
  'ArrowLeft': {clicked: false, justClicked: false},
  'ArrowRight': {clicked: false, justClicked: false},
  'Space': {clicked: false, justClicked: false}
}

window.addEventListener('DOMContentLoaded', function() {
  canvas = $('#c');
  ctx = canvas.getContext('2d');
  playerImg = $('#player-img');
  enemyImg = $('#enemy-img');

  document.body.onkeydown = document.body.onkeyup = handleKey;

  //ctx.drawImage(playerImg, 0, 0);
  //ctx.drawImage(enemyImg, 100, 0);
  player = new entity((canvas.width - playerImg.width) / 2, canvas.height - 96);
  player.img = playerImg;
  player.type = "player";
  player.w = playerImg.width;
  player.h = playerImg.height;
  entities.push(player);
  score = 0;

  setInterval(loop, 1000 / 60);
});

function entity(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.img = null;
  this.type = "";
  this.w = 0;
  this.h = 0;
  this.dead = false;
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(keys['ArrowRight'].clicked) {
    player.x += 5;
  }
  if(keys['ArrowLeft'].clicked) {
    player.x -= 5;
  }
  if(keys['ArrowUp'].clicked) {
    player.y -= 5;
  }
  if(keys['ArrowDown'].clicked) {
    player.y += 5;
  }
  if(keys['Space'].justClicked) {
    keys['Space'].justClicked = false;
    var bullet = new entity(player.x + player.img.width / 2 - 3, player.y);
    $('#shoot').play();
    bullet.type = "bullet";
    bullet.dy = -10;
    bullet.w = 6;
    bullet.h = 20;
    entities.push(bullet);
  }
  player.x = clamp(player.x, 0, canvas.width - player.img.width);
  player.y = clamp(player.y, 0, canvas.height - player.img.height);
  entities.forEach(function(e) {
    e.x += e.dx;
    e.y += e.dy;
    if(e.img) {
      ctx.drawImage(e.img, e.x, e.y);
    } else if(e.type == "bullet") {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(e.x, e.y, 6, 20);
    }

    if(Math.floor(Math.random() * 200) == 0) {
      var enemy = new entity(Math.floor(Math.random() * (canvas.width - 64)), -48);;
      enemy.img = enemyImg;
      enemy.dy = 5;
      enemy.type = "enemy";
      enemy.w = enemyImg.width;
      enemy.h = enemyImg.height;
      entities.push(enemy);
    }

    ctx.font = "30px sans-serif";
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("Score: " + score, 10, 30);

    entities = entities.filter(function(e) {
      if(e.type == "bullet" && e.y <= -20) return false;
      if(e.type == "enemy" && e.y > canvas.height) return false;
      if(e.dead) return false;
      return true;
    });

    entities.filter((e) => {return e.type == 'enemy'}).forEach((e) => {
      if(collides(player, e)) {
        $('#explosion').play();
        score = 0;
        entities = [];
        player.x = (canvas.width - playerImg.width) / 2;
        player.y = canvas.height - 96;
        entities.push(player);
      }
    });

    entities.filter((e) => {return e.type == 'enemy';}).forEach((e) => {
      entities.filter((e) => {return e.type == 'bullet';}).forEach((b) => {
        if(collides(e, b) && !e.dead && !b.dead) {
          $('#hit').play();
          e.dead = true;
          b.dead = true;
          score++;
        }
      });
    });
  });
}

function handleKey(e) {
  if(e.code in keys) {
    if(e.type == 'keydown') {
      if(!keys[e.code].clicked)
        keys[e.code].justClicked = true;
      else
        keys[e.code].justClicked = false;
      keys[e.code].clicked = true;
    } else if(e.type == 'keyup') {
      keys[e.code].clicked = false;
      keys[e.code].justClicked = false;
    }
  }

}

function collides(a, b) {
  if(a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y)
    return true;
  else
    return false;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
