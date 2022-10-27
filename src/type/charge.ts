import { Force } from "./force";

class Charge {
    name: string;
    charge: number;
    x: number;
    y: number;
    color: string;
    force: Force;

    constructor(name: string, charge: number, x: number, y: number, color: string, force: Force) {
        this.name = name;
        this.charge = charge;
        this.x = x;
        this.y = y;
        this.color = color;
        this.force = force;
    }

    setForce = (force: Force) => {
        this.force = force;
    }
}

export { Charge };