class TowerButton {
    
    private progress:number = 0;
    private bar:HTMLElement;
    private game:Game;
    private pause: boolean = false;
    private div: HTMLElement;
    private callback:EventListener

    constructor(game:Game) {
        this.div = <HTMLElement>document.getElementsByTagName("towerbutton")[0];
        this.callback = (e: Event) => this.handleClick(e)
        this.div.addEventListener("click", this.callback);
        this.game = game;

        this.bar = <HTMLElement> document.querySelector("towerbutton progressbar");
        this.bar.style.width = "0%";
    }

    private handleClick(event: Event) : void {
        
        this.progress+=10;
        this.bar.style.width = this.progress+"%";

        if(this.progress > 90){
            this.progress = 0;
            console.log("progress!");
            this.upgrade();
        }
    }

    private upgrade() {
        
    }
}