import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

export class TiltedSquareCell extends Cell {

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this._corners = this.createCorners(center, width);
    }

    private createCorners(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const upperCorner: Coordinate = new Coordinate(center.x, center.y + halfWidth);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y);
        const lowerCorner: Coordinate = new Coordinate(center.x, center.y - halfWidth);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y);
        return [upperCorner, rightCorner, lowerCorner, leftCorner];
    }

}