class bullet {
    constructor(source, x, y, mx, my, dmg) {
        var a = mx - x;
        var b = my - y;
        var c = Math.sqrt(a * a + b * b);
        this.x = x;
        this.y = y;
        this.speed = 13;
        this.mx = a / c;
        this.my = b / c;
        this.r = 5;
        this.dmg = dmg;
        this.s = source;
    }

    move() {
        var move = 0;
        while (move < this.speed) {
            this.x += this.mx;
            this.y += this.my;
            move++;
            this.crashWith();
        }
        if (this.speed - move != 0) {
            this.x += this.mx * (move - this.speed);
            this.y += this.my * (move - this.speed);
            this.crashWith();
        }
    }

    paint() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    crashWith() {
        var x = this.x;
        var y = this.y;
        var rad = this.r;
        var dmg = this.dmg;
        var hit = false;
        if (this.s == 0) {
            units.forEach(function (item, idx) {
                var a = Math.abs(x - item.x);
                var b = Math.abs(y - item.y);
                var c = Math.sqrt(a * a + b * b);
                var r = rad + item.r;
                if (c < r) {
                    units[idx].damage(dmg);
                    hit = true;
                }
            })
            if (hit) {
                this.x = -100;
            }
        }
        else {
            var a = Math.abs(x - player.getXY().x);
            var b = Math.abs(y - player.getXY().y);
            var c = Math.sqrt(a * a + b * b);
            var r = rad + player.getXY().r;
            if (c < r) {
                player.damage(dmg);
                this.x = -100;
            }
        }
    }
}

function clearProjectiles() {
    projectiles.forEach(function (item, idx) {
        if (item.x > canvas.width || item.x < 0 || item.y > canvas.height || item.y < 0) {
            projectiles.splice(idx, 1);
        }
    })
}