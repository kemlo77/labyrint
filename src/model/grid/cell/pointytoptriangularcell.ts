import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

export class PointyTopTriangularCell extends Cell {

    constructor(center: Coordinate, width: number) {
        super(center);
        this._corners = this.createCornersForTriangle(center, width);
    }

    private createCornersForTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;

        const upperCorner: Coordinate = new Coordinate(center.x, center.y + thirdHeight * 2);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - thirdHeight);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - thirdHeight);
        return [upperCorner, rightCorner, leftCorner];
    }

}