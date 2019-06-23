class Zombie {

    private speed = 2;

    private xspeed:number;
    private yspeed:number;
    private xdist:number;
    private ydist:number;
    private xtarget:number;
    private ytarget:number;

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
        
    constructor() {
        this.x = window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        let parent: HTMLElement = <HTMLElement>document.getElementsByTagName("game")[0];

        this.div = document.createElement("zombie");
        parent.appendChild(this.div);

        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;

        this.draw();
        this.setTarget();
    }

    public update(){
        this.X -= this.xspeed;
        this.Y -= this.yspeed;
        if (this.X + this.Width < 0) {
            this.remove();
        }

        this.xdist = this.X - this.xtarget;
        this.ydist = this.Y - this.ytarget;

        if(Math.sqrt(this.xdist * this.xdist + this.ydist * this.ydist) < 10) {
            this.setTarget();
        }
    }

    private setTarget () {
        // genereer random eindpositie en constante snelheid richting die positie
        this.xtarget = this.X - 200;
        this.ytarget = Math.random() * (window.innerHeight - this.Y);
        // this.ytarget = 100;

        this.setSpeed(this.X - this.xtarget, this.Y - this.ytarget);
    }

    private setSpeed(xdist : number, ydist : number) {
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);

        this.xspeed = (xdist/distance) * this.speed;
        this.yspeed = (ydist/distance) * this.speed;
    }

    public draw(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    public hasCollision(obj: Bullet): boolean {
        return (this.x < obj.X + obj.Width &&
            this.x + this.width > obj.X &&
            this.y < obj.Y + obj.Height &&
            this.y + this.Height > obj.Y);
    }

    public remove() {
        // TODO remove the object

    }
}