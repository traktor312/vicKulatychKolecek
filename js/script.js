var stepInterval = setInterval(step, 20);
var spawnTimeOut = 3000;
var spawnInterval;
var levelScore = 0;
var nextLevelScore = 10;

function setSpawnInterval() {
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawn, spawnTimeOut);
    spawnTimeOut -= Math.floor(spawnTimeOut / 10);
    nextLevelScore += 5;
    levelScore = 0;
}
setSpawnInterval();

function spawn() {
    units.push(new unit(rand(canvas.width / 10, canvas.width * 9 / 10), rand(canvas.height / 10, canvas.height * 9 / 10), 5, 40, 10, 100, 0.8));
}

function clearCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 30);
}

function step() {
    if (phase == 0) {
        clearCanvas('white');
        player.move();
        player.fire();
        projectiles.forEach(function (item) {
            item.move();
            item.paint();
        })
        units.forEach(function (item) {
            item.move();
            item.fire();
            item.paint();
        })
        clearProjectiles();
        clearUnit();
        player.paint();
    }
    else {
        clearCanvas('white');
        ctx.font = '70px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('GAME OVER', canvas.width / 2 - 220, canvas.height / 2);
    }
}

document.addEventListener('keydown', function (e) {
    player.setMove(e.code);
})

document.addEventListener('keyup', function (e) {
    player.stopMove(e.code);
})


canvas.addEventListener('mousedown', function (e) {
    player.startFire();
    player.setFire(e.offsetX * canvas.width / $(canvas).width(), e.offsetY * canvas.height / $(canvas).height());
})

canvas.addEventListener('mousemove', function (e) {
    if (player.askFire()) {
        player.setFire(e.offsetX * canvas.width / $(canvas).width(), e.offsetY * canvas.height / $(canvas).height());
    }
})

canvas.addEventListener('mouseup', function () {
    player.stopFire();
})