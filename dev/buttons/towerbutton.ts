class TowerButton extends Button {
    
    private progress:number = 0;
    private bar:HTMLElement;
    private game:Game;
    constructor(game) {
        super("towerbutton");
        this.game = game;

        this.bar = <HTMLElement> document.querySelector("towerbutton progressbar");
        this.bar.style.width = "0%";
    }

    protected handleClick(event: MouseEvent) : void {
        
        this.progress+=10;
        this.bar.style.width = this.progress+"%";
        this.game.ui.addCoins(-100);

        if(this.progress > 90){
            this.progress = 0;
            super.handleClick(event);
            this.game.ui.addCoins(-1000);
            this.upgrade();
        }
    }

    private upgrade() {
        
    }
}