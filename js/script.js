var interval = setInterval(step, 20);
var spawnInterval = setInterval(function () {
    units.push(new unit(rand(canvas.width / 10, canvas.width * 9 / 10), rand(canvas.height / 10, canvas.height * 9 / 10), 4, 40, 10, 100));
}, 1000)

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 30);
}

function step() {
    clearCanvas();
    player.move();
    player.fire();
    projectiles.forEach(function (item) {
        item.move();
        item.paint();
    })
    units.forEach(function (item) {
        item.move();
        item.paint();
    })
    clearProjectiles();
    clearUnit();
    player.paint();
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

canvas.addEventListener('mouseup', function (e) {
    player.stopFire();
})