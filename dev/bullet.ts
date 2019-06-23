class Bullet {
    
    private speed : number = 5;
    private speedX : number = 0;
    private speedY : number = 0;
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private height: number = 0;
    private div: HTMLElement;

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

    constructor(x:number, y:number, rotation : number, tag:string) {

        this.speedX = this.speed * Math.cos(rotation / 180 * Math.PI);
        this.speedY = this.speed * Math.sin(rotation / 180 * Math.PI);
   
        this.x = x;
        this.y = y;

        let parent: HTMLElement = <HTMLElement>document.getElementsByTagName("game")[0];

        this.div = document.createElement(tag);
        parent.appendChild(this.div);

        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;

        this.draw();
    }

    public update() : void {
        this.X += this.speedX;
        this.Y += this.speedY;

        if (this.isOutsideWindow()) {
            this.remove();
        }
    }

    private isOutsideWindow() : boolean {
        return(this.X > window.innerWidth ||
               this.X + this.Width < 0 ||
               this.Y > window.innerHeight ||
               this.Y + this.Height < 0);
    }

    public draw(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    public hasCollision(obj: Zombie): boolean {
        return (this.x < obj.X + obj.Width &&
            this.x + this.width > obj.X &&
            this.y < obj.Y + obj.Height &&
            this.y + this.Height > obj.Y);
    }

    public remove() {
        // TODO remove the object

    }
}