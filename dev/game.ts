class Game {

    // Fields
    public  ui              : UI
    private pause           : boolean       = false
    private zombiecounter   : number        = 0
    private towers          : Array<Tower>  = []
    private zombies         : Array<Zombie> = []

    constructor() {
        this.ui = new UI(this)
            
        let basicTower      : Tower = new Tower(200, 200, this)
        let singleShotTower : Tower = new Tower(320, 60, this)        
        let multiShotTower  : Tower = new Tower(600, 240, this)
        this.towers.push(basicTower)
        this.towers.push(singleShotTower)
        this.towers.push(multiShotTower)

        this.gameLoop()
    }

    private gameLoop() : void {

        if(this.ui.life <= 0) {
            this.gameOver()
        }
        
        this.zombiecounter++
        if(this.zombiecounter > 10){
            this.zombiecounter = 0
            this.zombies.push(new Zombie())
        }
        
        for(let tower of this.towers) {
            tower.update()
        }
        for(let zombie of this.zombies) {
            zombie.update()
            zombie.draw()
        }

        if (!this.pause) { 
           // requestAnimationFrame(() => this.gameLoop())
        } 
    }

    private gameOver() : void {

    }
}


window.addEventListener("load", () => new Game())