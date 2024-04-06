import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

export class HexagonalCell extends Cell {

    constructor(center: Coordinate, width: number) {
        super(center);
        this._corners = this.createCornersForHexagon(center, width);
    }

    private createCornersForHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;

        const upperCenter: Coordinate = new Coordinate(center.x, center.y + 2 * quarterHeight);
        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y + quarterHeight);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y + quarterHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        return [upperRight, upperCenter, upperLeft, lowerLeft, lowerCenter, lowerRight];
    }

}