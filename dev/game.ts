class Game {

    // Fields
    public  ui              : UI;
    private pause           : boolean = false;
    private zombiecounter   : number = 0;
    private towers          : Array<Tower> = new Array();
    private zombies         : Array<Zombie> = new Array();

    constructor() {
        this.ui = new UI(this);
            
        let basicTower : Tower = new Tower(200, 200, this);
        this.towers.push(basicTower);
        let singleShotTower : Tower = new Tower(320, 60, this);        
        this.towers.push(singleShotTower);
        let multiShotTower : Tower = new Tower(600, 240, this);
        this.towers.push(multiShotTower);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() : void {
        if(this.pause) { return; } 

        if(this.ui.life <= 0) {
            this.gameOver();
        }
        
        this.zombiecounter++;
        if(this.zombiecounter > 10){
            this.zombiecounter = 0;
            this.zombies.push(new Zombie());
        }
        
        for(let tower of this.towers) {
            tower.update();
        }
        for(let zombie of this.zombies) {
            zombie.update();
            zombie.draw();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameOver() : void {
        // TODO handle game over

    }
}