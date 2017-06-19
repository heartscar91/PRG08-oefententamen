class UI {
    
    private coins       : number        = 0;
    public  life        : number        = 100;

    private coindiv     : HTMLElement;
    private lifediv     : HTMLElement;

    public  btnBullets  : Button;
    public  btnUpgrade  : Button;

    constructor(game : Game) {
        this.coindiv = <HTMLElement> document.getElementsByTagName("counter")[0];
        this.coindiv.innerHTML = this.coins.toString();

        this.lifediv = <HTMLElement> document.querySelector("lifebar progressbar");
        this.lifediv.style.width = this.life + "%";

        this.lifediv.classList.add("blinking");

        this.btnBullets  = new Button("bulletbutton");
        this.btnUpgrade  = new TowerButton(game);
    }

    public addCoins(amount : number) : void {
        this.coins += amount;
        this.coindiv.innerHTML = this.coins.toString();
    }

    public decreaseLife(amount : number) : void {
        this.life -= amount;
        this.lifediv.style.width = this.life + "%";
    }
}