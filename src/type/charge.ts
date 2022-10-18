class Charge {
    name: string;
    charge: number;
    x: number;
    y: number;
    color: string;

    constructor(name: string, charge: number, x: number, y: number, color: string) {
        this.name = name;
        this.charge = charge;
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

export { Charge };