var player = {
    x: 100,
    y: 100,
    r: 50,
    paint: function () {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    },
    getXY: function () {
        return { x: this.x, y: this.y };
    },
    speed: 4,
    up: false,
    down: false,
    right: false,
    left: false,
    stopMove: function (arrow) {
        switch (arrow) {
            case 'KeyW':
                this.up = false;
                break;
            case 'KeyS':
                this.down = false;
                break;
            case 'KeyD':
                this.right = false;
                break;
            case 'KeyA':
                this.left = false;
                break;
        }
    },
    setMove: function (arrow) {
        switch (arrow) {
            case 'KeyW':
                this.down = false;
                this.up = true;
                break;
            case 'KeyS':
                this.up = false;
                this.down = true;
                break;
            case 'KeyD':
                this.left = false;
                this.right = true;
                break;
            case 'KeyA':
                this.right = false;
                this.left = true;
                break;
        }
    },
    move: function () {
        var pressed = 0;
        if (this.up) {
            pressed++;
        }
        else if (this.down) {
            pressed++;
        }
        if (this.right) {
            pressed++;
        }
        else if (this.left) {
            pressed++;
        }
        if (pressed == 1) {
            if (this.up) {
                this.y -= this.speed;
            }
            if (this.down) {
                this.y += this.speed;
            }
            if (this.right) {
                this.x += this.speed;
            }
            if (this.left) {
                this.x -= this.speed;
            }
        }
        else {
            var speed = this.speed * Math.sqrt(2) / 2;
            if (this.up) {
                this.y -= speed;
            }
            if (this.down) {
                this.y += speed;
            }
            if (this.right) {
                this.x += speed;
            }
            if (this.left) {
                this.x -= speed;
            }
        }
    },
    fx: 0,
    fy: 0,
    angry: false,
    setFire: function (x, y) {
        this.fx = x;
        this.fy = y;
    },
    startFire: function () {
        this.angry = true;
    },
    stopFire: function () {
        this.angry = false;
    },
    askFire: function () {
        return this.angry;
    },
    fire: function () {
        if (this.angry) {
            projectiles.push(new bullet(0, this.x, this.y, this.fx, this.fy, 10, 5, 10));
        }
    },
}