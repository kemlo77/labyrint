import { Segment } from '../../segment';
import { Cell } from './cell';
import { Coordinate } from '../../coordinate';
import { CellTest } from './celltypealiases';



export class SquareCell extends Cell {

    private upperRightCorner: Coordinate;
    private upperLeftCorner: Coordinate;
    private lowerRightCorner: Coordinate;
    private lowerLeftCorner: Coordinate;
    private upperBorder: Segment;
    private rightBorder: Segment;
    private lowerBorder: Segment;
    private leftBorder: Segment;

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this.createCorners();
        this.createBorders();
    }

    private createCorners(): void {
        const halfWidth: number = this.width / 2;
        this.upperRightCorner = new Coordinate(this.center.x + halfWidth, this.center.y + halfWidth);
        this.upperLeftCorner = new Coordinate(this.center.x - halfWidth, this.center.y + halfWidth);
        this.lowerRightCorner = new Coordinate(this.center.x + halfWidth, this.center.y - halfWidth);
        this.lowerLeftCorner = new Coordinate(this.center.x - halfWidth, this.center.y - halfWidth);
    }

    private createBorders(): void {
        this.upperBorder = new Segment(this.upperLeftCorner, this.upperRightCorner);
        this.rightBorder = new Segment(this.upperRightCorner, this.lowerRightCorner);
        this.lowerBorder = new Segment(this.lowerLeftCorner, this.lowerRightCorner);
        this.leftBorder = new Segment(this.upperLeftCorner, this.lowerLeftCorner);
    }

    get closedBorders(): Segment[] {
        const closedBorders: Segment[] = [];

        const isLocatedInCenterOrBelow: CellTest = neighbourCell => neighbourCell.center.y <= this.center.y;
        const isLocatedInCenterOrToTheLeft: CellTest = neighbourCell => neighbourCell.center.x <= this.center.x;
        const isLocatedInCenterOrAbove: CellTest = neighbourCell => neighbourCell.center.y >= this.center.y;
        const isLocatedInCenterOrToTheRight: CellTest = neighbourCell => neighbourCell.center.x >= this.center.x;

        const hasNoConnectedCellAbove: boolean = this.connectedNeighbours.every(isLocatedInCenterOrBelow);
        const hasNoConnectedCellToTheRight: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheLeft);
        const hasNoConnectedCellBelow: boolean = this.connectedNeighbours.every(isLocatedInCenterOrAbove);
        const hasNoConnectedCellToTheLeft: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheRight);

        if (hasNoConnectedCellAbove) {
            closedBorders.push(this.upperBorder);
        }
        if (hasNoConnectedCellToTheRight) {
            closedBorders.push(this.rightBorder);
        }
        if (hasNoConnectedCellBelow) {
            closedBorders.push(this.lowerBorder);
        }
        if (hasNoConnectedCellToTheLeft) {
            closedBorders.push(this.leftBorder);
        }

        return closedBorders;
    }

    get corners(): Coordinate[] {
        return [this.upperRightCorner, this.lowerRightCorner, this.lowerLeftCorner, this.upperLeftCorner];
    }

}