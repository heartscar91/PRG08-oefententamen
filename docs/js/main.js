class GameObject {
    constructor(x, y, tag) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        let parent = document.getElementsByTagName("game")[0];
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.draw();
    }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    get Width() { return this.width; }
    set Width(v) { this.width = v; }
    get Height() { return this.height; }
    set Height(v) { this.height = v; }
    get Div() { return this.div; }
    set Div(v) { this.div = v; }
    update() {
    }
    draw() {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
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
        this.X += this.speedX;
        this.Y += this.speedY;
        if (this.isOutsideWindow()) {
            this.remove();
        }
    }
    isOutsideWindow() {
        return (this.X > window.innerWidth ||
            this.X + this.Width < 0 ||
            this.Y > window.innerHeight ||
            this.Y + this.Height < 0);
    }
}
class Game {
    constructor() {
        this.pause = false;
        this.zombiecounter = 0;
        this.towers = [];
        this.zombies = [];
        this.ui = new UI(this);
        let basicTower = new Tower(200, 200, this);
        let singleShotTower = new Tower(320, 60, this);
        let multiShotTower = new Tower(600, 240, this);
        this.towers.push(basicTower);
        this.towers.push(singleShotTower);
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
        this.Div.innerHTML = "GAME OVER";
    }
}
window.addEventListener("load", function () {
    new Game();
});
class Tower extends GameObject {
    constructor(x, y, g) {
        super(x, y, "tower");
        this._bullets = 16;
        this.bulletList = [];
        this.rotation = 0;
        this.game = g;
        this.Div.className = "";
        this.Div.classList.add("singleshot-tower");
        this.bulletsDisplay = document.createElement("div");
        this.Div.appendChild(this.bulletsDisplay);
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
            this.bulletList.push(new Bullet(this.Y + 48, this.Y + 60, this.rotation, "bullet-red"));
            this.bullets--;
            this.turn45Degrees();
        }
    }
    fireMulti() {
        while (this.rotation != 360 && this.bullets > 0) {
            this.bulletList.push(new Bullet(this.X + 40, this.Y + 60, this.rotation, "bullet-blue"));
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
        this.life = 100;
        this.coindiv = document.getElementsByTagName("counter")[0];
        this.coindiv.innerHTML = "100";
        this.lifediv = document.querySelector("lifebar progressbar");
        this.lifediv.style.width = this.life + "%";
        this.lifediv.classList.add("blinking");
        this.btnBullets = new Button("bulletbutton");
        this.btnUpgrade = new TowerButton(game);
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
        this.X -= this.xspeed;
        this.Y -= this.yspeed;
        if (this.X + this.Width < 0) {
            this.remove();
        }
        this.xdist = this.X - this.xtarget;
        this.ydist = this.Y - this.ytarget;
        if (Math.sqrt(this.xdist * this.xdist + this.ydist * this.ydist) < 10) {
            this.setTarget();
        }
    }
    setTarget() {
        this.xtarget = this.X - 200;
        this.ytarget = Math.random() * (window.innerHeight - this.Y);
        this.setSpeed(this.X - this.xtarget, this.Y - this.ytarget);
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
        if (this.progress > 90) {
            this.progress = 0;
            super.handleClick(event);
            this.upgrade();
        }
    }
    upgrade() {
    }
}
//# sourceMappingURL=main.js.map