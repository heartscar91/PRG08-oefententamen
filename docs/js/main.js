class GameObject {
    constructor(x, y, tag) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._x = x;
        this._y = y;
        let parent = document.getElementsByTagName("game")[0];
        this._div = document.createElement(tag);
        parent.appendChild(this._div);
        this._width = this._div.clientWidth;
        this._height = this._div.clientHeight;
        this.draw();
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get width() { return this._width; }
    set width(v) { this._width = v; }
    get height() { return this._height; }
    set height(v) { this._height = v; }
    get div() { return this._div; }
    set div(v) { this._div = v; }
    update() {
    }
    draw() {
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    hasCollision(obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    }
    remove() {
    }
}
class Bullet extends GameObject {
    constructor(x, y, rotation, tag) {
        super(x, y, tag);
        this.speed = 5;
        this.speedX = 0;
        this.speedY = 0;
        this.speedX = this.speed * Math.cos(rotation / 180 * Math.PI);
        this.speedY = this.speed * Math.sin(rotation / 180 * Math.PI);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.isOutsideWindow()) {
            this.remove();
        }
    }
    isOutsideWindow() {
        return (this.x > window.innerWidth ||
            this.x + this.width < 0 ||
            this.y > window.innerHeight ||
            this.y + this.height < 0);
    }
}
class Game {
    constructor() {
        this.pause = false;
        this.zombiecounter = 0;
        this.towers = new Array();
        this.zombies = new Array();
        this.ui = new UI(this);
        let basicTower = new Tower(200, 200, this);
        this.towers.push(basicTower);
        let singleShotTower = new Tower(320, 60, this);
        this.towers.push(singleShotTower);
        let multiShotTower = new Tower(600, 240, this);
        this.towers.push(multiShotTower);
        requestAnimationFrame(() => this.gameLoop());
    }
    gameLoop() {
        if (this.pause) {
            return;
        }
        if (this.ui.life <= 0) {
            this.gameOver();
        }
        this.zombiecounter++;
        if (this.zombiecounter > 10) {
            this.zombiecounter = 0;
            this.zombies.push(new Zombie());
        }
        for (let tower of this.towers) {
            tower.update();
        }
        for (let zombie of this.zombies) {
            zombie.update();
            zombie.draw();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    gameOver() {
    }
}
class GameOver extends GameObject {
    constructor() {
        super(window.innerWidth / 2 - 50, window.innerHeight / 2 - 25, "gameover");
        this.div.innerHTML = "GAME OVER";
    }
}
window.addEventListener("load", function () {
    new Game();
});
class Tower extends GameObject {
    constructor(x, y, g) {
        super(x, y, "tower");
        this._bullets = 16;
        this.bulletList = new Array();
        this.rotation = 0;
        this.game = g;
        this.div.className = "";
        this.div.classList.add("singleshot-tower");
        this.bulletsDisplay = document.createElement("div");
        this.div.appendChild(this.bulletsDisplay);
        this.bulletsDisplay.style.fontSize = "14px";
        this.displayBullets();
        setInterval(() => this.fireSingle(), 900);
        setInterval(() => this.fireMulti(), 1900);
    }
    get bullets() {
        return this._bullets;
    }
    set bullets(value) {
        this._bullets = value;
        this.displayBullets();
    }
    update() {
        for (let bullet of this.bulletList) {
            bullet.update();
            bullet.draw();
        }
    }
    fireSingle() {
        if (this.bullets > 0) {
            this.bulletList.push(new Bullet(this.x + 48, this.y + 60, this.rotation, "bullet-red"));
            this.bullets--;
            this.turn45Degrees();
        }
    }
    fireMulti() {
        while (this.rotation != 360 && this.bullets > 0) {
            this.bulletList.push(new Bullet(this.x + 40, this.y + 60, this.rotation, "bullet-blue"));
            this.bullets--;
            this.rotation += 45;
        }
        this.rotation = 0;
    }
    turn45Degrees() {
        this.rotation += 45;
        if (this.rotation == 360)
            this.rotation = 0;
    }
    displayBullets() {
        this.bulletsDisplay.innerHTML = this._bullets + "";
    }
}
class UI {
    constructor(game) {
        this.coins = 0;
        this.life = 100;
        this.coindiv = document.getElementsByTagName("counter")[0];
        this.coindiv.innerHTML = this.coins.toString();
        this.lifediv = document.querySelector("lifebar progressbar");
        this.lifediv.style.width = this.life + "%";
        this.lifediv.classList.add("blinking");
        this.btnBullets = new Button("bulletbutton");
        this.btnUpgrade = new TowerButton(game);
    }
    addCoins(amount) {
        this.coins += amount;
        this.coindiv.innerHTML = this.coins.toString();
    }
    decreaseLife(amount) {
        this.life -= amount;
        this.lifediv.style.width = this.life + "%";
    }
}
class Zombie extends GameObject {
    constructor() {
        super(window.innerWidth, Math.random() * window.innerHeight, "zombie");
        this.speed = 2;
        this.setTarget();
    }
    update() {
        this.x -= this.xspeed;
        this.y -= this.yspeed;
        if (this.x + this.width < 0) {
            this.remove();
        }
        this.xdist = this.x - this.xtarget;
        this.ydist = this.y - this.ytarget;
        if (Math.sqrt(this.xdist * this.xdist + this.ydist * this.ydist) < 10) {
            this.setTarget();
        }
    }
    setTarget() {
        this.xtarget = this.x - 200;
        this.ytarget = Math.random() * (window.innerHeight - this.y);
        this.setSpeed(this.x - this.xtarget, this.y - this.ytarget);
    }
    setSpeed(xdist, ydist) {
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = (xdist / distance) * this.speed;
        this.yspeed = (ydist / distance) * this.speed;
    }
}
class Button {
    constructor(tag) {
        this.pause = false;
        this.div = document.getElementsByTagName(tag)[0];
        this.div.addEventListener("click", (e) => this.handleClick(e));
    }
    handleClick(event) {
        alert(this.div.tagName);
    }
}
class TowerButton extends Button {
    constructor(game) {
        super("towerbutton");
        this.progress = 0;
        this.game = game;
        this.bar = document.querySelector("towerbutton progressbar");
        this.bar.style.width = "0%";
    }
    handleClick(event) {
        this.progress += 10;
        this.bar.style.width = this.progress + "%";
        this.game.ui.addCoins(-100);
        if (this.progress > 90) {
            this.progress = 0;
            super.handleClick(event);
            this.game.ui.addCoins(-1000);
            this.upgrade();
        }
    }
    upgrade() {
    }
}
//# sourceMappingURL=main.js.map