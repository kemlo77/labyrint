import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

export class SquareCell extends Cell {

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this._corners = this.createCorners(center, width);
    }

    private createCorners(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const upperRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfWidth);
        const upperLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfWidth);
        const lowerRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfWidth);
        const lowerLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfWidth);
        return [upperRightCorner, lowerRightCorner, lowerLeftCorner, upperLeftCorner];
    }

}