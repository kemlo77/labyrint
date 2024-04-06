import { Coordinate } from './coordinate';

export class Segment {

    constructor(readonly p1: Coordinate, readonly p2: Coordinate) {
        //
    }

    get midpoint(): Coordinate {
        return new Coordinate((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
    }
}