/// <reference path="gameobject.ts" />


class Bullet extends GameObject{
    
    private speed : number = 5;
    private speedX : number = 0;
    private speedY : number = 0;

    constructor(x:number, y:number, rotation : number, tag:string) {
        super(x, y, tag);

        this.speedX = this.speed * Math.cos(rotation / 180 * Math.PI);
        this.speedY = this.speed * Math.sin(rotation / 180 * Math.PI);
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
}