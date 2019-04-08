var unitSpeed = 5;
var unitR = 40;
var unitDmg = 3;
var unitHp = 20;
var unitReload = 1.2;

class unit {
    constructor(x, y, speed, r, dmg, hp, reload) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.r = r;
        this.dmg = dmg;
        this.mx = 0;
        this.my = 0;
        this.hp = hp;
        this.maxHp = hp;
        this.reload = reload;
        this.reloadTime = reload;
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
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - 45, this.y - this.r - 25, 90, 10);
        if (this.hp > 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x - 45, this.y - this.r - 25, 90 * (this.hp / this.maxHp), 10);
        }
    }

    fire() {
        if (this.reaload > 0) {
            this.reaload -= 0.02;
        }
        else {
            this.reaload = this.reloadTime;
            var fx = player.getXY().x;
            var fy = player.getXY().y;
            projectiles.push(new bullet(1, this.x, this.y, fx, fy, this.dmg));
        }
    }
}

function clearUnit() {
    units.forEach(function (item, idx) {
        if (item.hp <= 0) {
            units.splice(idx, 1);
            score++;
            player.heal();
        }
    })
}

function spawn() {
    unitDmg += 0.3;
    unitHp += 4;
    unitReload -= 0.01;
    lvl++;
    player.levelUp();
    for (var i = 0; i < Math.sqrt(score / 2) + 1; i++) {
        var x = rand(canvas.width / 10, canvas.width * 9 / 10);
        var y = rand(canvas.height / 10, canvas.height * 9 / 10);
        units.push(new unit(x, y, unitSpeed, unitR, unitDmg, unitHp, unitReload));
    }
}
