var stepInterval = setInterval(step, 20);

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
        if (units.length == 0) {
            spawn();
        }
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