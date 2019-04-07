var player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 50,
    paint: function () {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - 45, this.y - this.r - 25, 90, 10);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 45, this.y - this.r - 25, 90 * (this.hp / this.maxHp), 10);
    },
    getXY: function () {
        return { x: this.x, y: this.y, r: this.r };
    },
    speed: 5,
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
    dmg: 10,
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
            projectiles.push(new bullet(0, this.x, this.y, this.fx, this.fy, this.dmg));
        }
    },
    maxHp: 100,
    hp: 100,
    damage: function (dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            phase = 1;
        }
    },
    heal: function () {
        if (this.hp < this.maxHp) {
            this.hp += this.maxHp / 40;
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }
        }
    }
}