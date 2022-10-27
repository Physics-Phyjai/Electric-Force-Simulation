import { Charge } from "./charge";

class Force {
  magnitude: number;
  i: number;
  j: number;

  constructor(magnitude: number, i: number, j: number) {
    this.magnitude = magnitude;
    this.i = i;
    this.j = j;
  }

  static of(c1: Charge, c2: Charge): Force {
    const dx = (c2.x - c1.x) * 10 ** -2;
    const dy = (c2.y - c1.y) * 10 ** -2;
    const k = 9 * 10 ** 9;
    const magnitude =
      (k * (c1.charge * 10 ** -6) * (c2.charge * 10 ** -6)) /
      (dx ** 2 + dy ** 2);
    const i = dx / Math.sqrt(dx ** 2 + dy ** 2);
    const j = dy / Math.sqrt(dx ** 2 + dy ** 2);
    return new Force(magnitude, i, -j);
  }

  static add(f1: Force, f2: Force): Force {
    const magnitude = Math.sqrt(
      (f1.magnitude * f1.i + f2.magnitude * f2.i) ** 2 +
        (f1.magnitude * f1.j + f2.magnitude * f2.j) ** 2
    );
    const i = (f1.magnitude * f1.i + f2.magnitude * f2.i) / magnitude;
    const j = (f1.magnitude * f1.j + f2.magnitude * f2.j) / magnitude;
    return new Force(magnitude, i, j);
  }

  getForce = (): string => {
    const force = this.magnitude * (this.i ** 2 + this.j ** 2);
    return `${force.toFixed(2)} N`;
  }
}

export { Force };
