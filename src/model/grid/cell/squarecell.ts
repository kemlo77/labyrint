import { BorderSegment } from '../../bordersegment';
import { Cell } from './cell';
import { Coordinate } from '../../coordinate';



export class SquareCell extends Cell {

    private upperRightCorner: Coordinate;
    private upperLeftCorner: Coordinate;
    private lowerRightCorner: Coordinate;
    private lowerLeftCorner: Coordinate;
    private upperBorder: BorderSegment;
    private rightBorder: BorderSegment;
    private lowerBorder: BorderSegment;
    private leftBorder: BorderSegment;

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
        this.upperBorder = new BorderSegment(this.upperLeftCorner, this.upperRightCorner);
        this.rightBorder = new BorderSegment(this.upperRightCorner, this.lowerRightCorner);
        this.lowerBorder = new BorderSegment(this.lowerLeftCorner, this.lowerRightCorner);
        this.leftBorder = new BorderSegment(this.upperLeftCorner, this.lowerLeftCorner);
    }

    get closedBorders(): BorderSegment[] {
        const closedBorderSegments: BorderSegment[] = [];

        const isLocatedInCenterOrBelow: any = neighbourCell => neighbourCell.center.y <= this.center.y;
        const isLocatedInCenterOrToTheLeft: any = neighbourCell => neighbourCell.center.x <= this.center.x;
        const isLocatedInCenterOrAbove: any = neighbourCell => neighbourCell.center.y >= this.center.y;
        const isLocatedInCenterOrToTheRight: any = neighbourCell => neighbourCell.center.x >= this.center.x;

        const hasNoConnectedCellAbove: boolean = this.connectedNeighbours.every(isLocatedInCenterOrBelow);
        const hasNoConnectedCellToTheRight: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheLeft);
        const hasNoConnectedCellBelow: boolean = this.connectedNeighbours.every(isLocatedInCenterOrAbove);
        const hasNoConnectedCellToTheLeft: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheRight);

        if (hasNoConnectedCellAbove) {
            closedBorderSegments.push(this.upperBorder);
        }
        if (hasNoConnectedCellToTheRight) {
            closedBorderSegments.push(this.rightBorder);
        }
        if (hasNoConnectedCellBelow) {
            closedBorderSegments.push(this.lowerBorder);
        }
        if (hasNoConnectedCellToTheLeft) {
            closedBorderSegments.push(this.leftBorder);
        }

        return closedBorderSegments;
    }

    get corners(): Coordinate[] {
        return [this.upperRightCorner, this.lowerRightCorner, this.lowerLeftCorner, this.upperLeftCorner];
    }

}