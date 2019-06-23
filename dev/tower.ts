class Tower {

    private _bullets        : number = 16;
    private bulletList      : Array<Bullet> = []
    private bulletsDisplay  : HTMLElement;
    private rotation        : number = 0;
    public  game            : Game;
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private height: number = 0;
    private div: HTMLElement;

    //Properties
    public get X(): number { return this.x; }
    public set X(value: number) { this.x = value; }

    public get Y(): number { return this.y; }
    public set Y(value: number) { this.y = value; }

    public get Width(): number { return this.width; }
    public set Width(v: number) { this.width = v; }

    public get Height(): number { return this.height; }
    public set Height(v: number) { this.height = v; }

    public get Div(): HTMLElement { return this.div; }
    public set Div(v: HTMLElement) { this.div = v; }

	public get bullets(): number  {
		return this._bullets;
	}

	public set bullets(value: number ) {
		this._bullets = value;
        this.displayBullets();
	}

    constructor(x:number, y:number, g:Game) {
        this.x = x;
        this.y = y;

        let parent: HTMLElement = <HTMLElement>document.getElementsByTagName("game")[0];

        this.div = document.createElement("tower");
        parent.appendChild(this.div);

        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;

        this.game = g;
        // Alle torens zien eruit als een singleshot-tower
        this.Div.className = "";
        this.Div.classList.add("singleshot-tower");

        // Om aantal kogels weer te geven
        this.bulletsDisplay = document.createElement("div");
        this.Div.appendChild(this.bulletsDisplay);
        this.bulletsDisplay.style.fontSize = "14px";

        this.displayBullets();
        
        setInterval(() => this.fireSingle(), 900);
        setInterval(() => this.fireMulti(), 1900);
    
        this.draw();
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
                                 this.Y + 48, 
                                 this.Y + 60, this.rotation,
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
                                 this.X + 40, 
                                 this.Y + 60, this.rotation,
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

    public draw(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    public hasCollision(obj: Tower): boolean {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    }

    public remove() {
        

    }
}