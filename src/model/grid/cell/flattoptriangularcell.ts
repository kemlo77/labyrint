import { Segment } from '../../segment';
import { Cell } from './cell';
import { Coordinate } from '../../coordinate';
import { CellTest } from './celltypealiases';

export class FlatTopTriangularCell extends Cell {

    private lowerCorner: Coordinate;
    private rightCorner: Coordinate;
    private leftCorner: Coordinate;
    private rightBorder: Segment;
    private leftBorder: Segment;
    private upperBorder: Segment;

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this.createCorners();
        this.createBorders();
    }

    private createCorners(): void {
        const height: number = this.width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = this.width / 2;

        this.lowerCorner = new Coordinate(this.center.x, this.center.y - thirdHeight * 2);
        this.rightCorner = new Coordinate(this.center.x + halfWidth, this.center.y + thirdHeight);
        this.leftCorner = new Coordinate(this.center.x - halfWidth, this.center.y + thirdHeight);
    }

    private createBorders(): void {
        this.upperBorder = new Segment(this.leftCorner, this.rightCorner);
        this.rightBorder = new Segment(this.lowerCorner, this.rightCorner);
        this.leftBorder = new Segment(this.lowerCorner, this.leftCorner);
    }

    get corners(): Coordinate[] {
        return [this.lowerCorner, this.rightCorner, this.leftCorner];
    }

    get borders(): Segment[] {
        return [this.upperBorder, this.rightBorder, this.leftBorder];
    }

    get closedBorders(): Segment[] {
        const closedBorders: Segment[] = [];

        const isLocatedBelowCenter: CellTest = neighbourCell => neighbourCell.center.y < this.center.y;
        const isLocatedInCenterOrToTheLeft: CellTest = neighbourCell => neighbourCell.center.x <= this.center.x;
        const isLocatedInCenterOrToTheRight: CellTest = neighbourCell => neighbourCell.center.x >= this.center.x;

        const hasNoConnectedCellAbove: boolean = this.connectedNeighbours.every(isLocatedBelowCenter);
        const hasNoConnectedCellToTheRight: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheLeft);
        const hasNoConnectedCellToTheLeft: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheRight);

        if (hasNoConnectedCellAbove) {
            closedBorders.push(this.upperBorder);
        }
        if (hasNoConnectedCellToTheRight) {
            closedBorders.push(this.rightBorder);
        }
        if (hasNoConnectedCellToTheLeft) {
            closedBorders.push(this.leftBorder);
        }

        return closedBorders;
    }
}