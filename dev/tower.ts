/// <reference path="gameobject.ts" />

class Tower extends GameObject {

    private _bullets        : number = 16;
    private bulletList      : Array<Bullet> = new Array();
    private bulletsDisplay  : HTMLElement;
    private rotation        : number = 0;
    public  game            : Game;

	public get bullets(): number  {
		return this._bullets;
	}

	public set bullets(value: number ) {
		this._bullets = value;
        this.displayBullets();
	}

    constructor(x:number, y:number, g:Game) {
        super(x, y, "tower");

        this.game = g;
        // Alle torens zien eruit als een singleshot-tower
        this.div.className = "";
        this.div.classList.add("singleshot-tower");

        // Om aantal kogels weer te geven
        this.bulletsDisplay = document.createElement("div");
        this.div.appendChild(this.bulletsDisplay);
        this.bulletsDisplay.style.fontSize = "14px";

        this.displayBullets();
        
        setInterval(() => this.fireSingle(), 900);
        setInterval(() => this.fireMulti(), 1900);
    }

    public update() {
        for(let bullet of this.bulletList) {
            bullet.update();
            bullet.draw();
        }
    }

    /**
     * Fire a single bullet, then turn 45 degrees.
     */
    public fireSingle(): void {
        if (this.bullets > 0) {
            this.bulletList.push(new Bullet(
                                 this.x + 48, 
                                 this.y + 60, this.rotation,
                                 "bullet-red"));
            this.bullets--;
            this.turn45Degrees();
        }
    }

    /**
     * Fire 8 bullets at a time
     */
    public fireMulti(): void {
        while(this.rotation != 360 && this.bullets > 0) {
            this.bulletList.push(new Bullet(
                                 this.x + 40, 
                                 this.y + 60, this.rotation,
                                 "bullet-blue"));
            this.bullets--;
            this.rotation += 45;
        }

        this.rotation = 0;
    }

    private turn45Degrees() : void {
        this.rotation += 45;
        if (this.rotation == 360) this.rotation = 0;
    }

    private displayBullets() : void {
        this.bulletsDisplay.innerHTML = this._bullets + "";
    }
}