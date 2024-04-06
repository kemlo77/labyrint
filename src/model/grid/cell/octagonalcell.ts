import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

export class OctagonalCell extends Cell {

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this._corners = this.createCornersForOctagon(center, width);
    }

    private createCornersForOctagon(center: Coordinate, width: number): Coordinate[] {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;
        const lowerQ1: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfSideLength);
        const upperQ1: Coordinate = new Coordinate(center.x + halfSideLength, center.y + halfWidth);
        const upperQ2: Coordinate = new Coordinate(center.x - halfSideLength, center.y + halfWidth);
        const lowerQ2: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfSideLength);
        const upperQ3: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfSideLength);
        const lowerQ3: Coordinate = new Coordinate(center.x - halfSideLength, center.y - halfWidth);
        const lowerQ4: Coordinate = new Coordinate(center.x + halfSideLength, center.y - halfWidth);
        const upperQ4: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfSideLength);
        return [lowerQ1, upperQ1, upperQ2, lowerQ2, upperQ3, lowerQ3, lowerQ4, upperQ4];
    }

}