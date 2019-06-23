class GameOver {

    private div: HTMLElement
    private x: number = 0
    private y: number = 0

    constructor() {  
        this.x = window.innerWidth / 2 - 50
        this.y = window.innerHeight / 2 - 25
        
        let parent: HTMLElement = <HTMLElement>document.getElementsByTagName("game")[0]

        this.div = document.createElement("gameover")
        parent.appendChild(this.div)

        this.div.innerHTML = "GAME OVER"
        this.draw()
    }

    public draw(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}