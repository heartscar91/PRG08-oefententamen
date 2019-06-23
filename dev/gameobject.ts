/**
 * GameObject
 */
class GameObject {
    //Fields
    private x      : number = 0;
    private y      : number = 0;
    private width  : number = 0;
    private height : number = 0;
    private div    : HTMLElement;
    
    //Properties
    public get X(): number          { return this.x;       }
    public set X(value: number)     { this.x = value;      }

    public get Y(): number          { return this.y;       }
    public set Y(value: number)     { this.y = value;      }

    public get Width() : number     { return this.width;   }
    public set Width(v : number)    { this.width = v;      }
    
    public get Height() : number    { return this.height;  }
    public set Height(v : number)   { this.height = v;     }

    public get Div() : HTMLElement  { return this.div;     }
    public set Div(v : HTMLElement) { this.div = v;        }

    /**
     * Basic game object
     * @param x X position
     * @param y Y position
     * @param tag Html semantic tag name
     * @param parent parent object to append to
     */
    constructor(x: number, y: number, tag: string) {
        this.x      = x;
        this.y      = y;

        let parent:HTMLElement = <HTMLElement> document.getElementsByTagName("game")[0];

        this.div    = document.createElement(tag);
        parent.appendChild(this.div);

        this.width  = this.div.clientWidth;
        this.height = this.div.clientHeight;

        this.draw();
    }
    
    /**
     * Update function to override by child
     */
    public update() : void {
        
    }
    
    /**
     * Draw function to override by child
     */
    public draw() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    public hasCollision(obj : GameObject) : boolean {
        return (this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y);
    }

    public remove() {
        // TODO remove the object
        
    }
}