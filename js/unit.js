class unit {
    constructor(x, y, speed, r, dmg, hp) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.r = r;
        this.dmg = dmg;
        this.mx = 0;
        this.my = 0;
        this.hp = hp;
        this.setMove();
    }

    move() {
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.mx = player.getXY().x;
            this.my = player.getXY().y;
        }
        if (this.mx != this.x) {
            var a = this.mx - this.x;
            var b = this.my - this.y;
            var c = Math.sqrt(a * a + b * b);
            if (c < this.speed) {
                this.x = this.mx;
                this.y = this.my;
            }
            else {
                this.x += a / c * this.speed;
                this.y += b / c * this.speed;
            }
        }
        else {
            this.setMove();
        }
    }

    setMove() {
        this.mx = this.x + rand(-300, 300);
        this.my = this.y + rand(-300, 300);
    }

    damage(dmg) {
        this.hp -= dmg;
    }

    paint() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

function clearUnit() {
    units.forEach(function (item, idx) {
        if (item.hp <= 0) {
            units.splice(idx, 1);
            score++;
        }
    })
}