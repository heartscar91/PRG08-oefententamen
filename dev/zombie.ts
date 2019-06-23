/// <reference path="gameobject.ts" />

class Zombie extends GameObject {

    private speed = 2;

    private xspeed:number;
    private yspeed:number;
    private xdist:number;
    private ydist:number;
    private xtarget:number;
    private ytarget:number;
        
    constructor() {
        super(window.innerWidth, Math.random() * window.innerHeight, "zombie");

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
}