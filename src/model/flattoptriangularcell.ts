import { BorderSegment } from './bordersegment';
import { Cell } from './cell';
import { Coordinate } from './coordinate';

export class FlatTopTriangularCell extends Cell {

    private lowerCorner: Coordinate;
    private rightCorner: Coordinate;
    private leftCorner: Coordinate;
    private rightBorder: BorderSegment;
    private leftBorder: BorderSegment;
    private upperBorder: BorderSegment;

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
        this.upperBorder = new BorderSegment(this.leftCorner, this.rightCorner);
        this.rightBorder = new BorderSegment(this.lowerCorner, this.rightCorner);
        this.leftBorder = new BorderSegment(this.lowerCorner, this.leftCorner);
    }

    get corners(): Coordinate[] {
        return [
            this.lowerCorner,
            this.rightCorner,
            this.leftCorner
        ];
    }

    get closedBorders(): BorderSegment[] {
        const closedBorderSegments: BorderSegment[] = [];

        const isLocatedBelowCenter: any = neighbourCell => neighbourCell.center.y < this.center.y;
        const isLocatedInCenterOrToTheLeft: any = neighbourCell => neighbourCell.center.x <= this.center.x;
        const isLocatedInCenterOrToTheRight: any = neighbourCell => neighbourCell.center.x >= this.center.x;

        const hasNoConnectedCellAbove: boolean = this.connectedNeighbours.every(isLocatedBelowCenter);
        const hasNoConnectedCellToTheRight: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheLeft);
        const hasNoConnectedCellToTheLeft: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheRight);

        if (hasNoConnectedCellAbove) {
            closedBorderSegments.push(this.upperBorder);
        }
        if (hasNoConnectedCellToTheRight) {
            closedBorderSegments.push(this.rightBorder);
        }
        if (hasNoConnectedCellToTheLeft) {
            closedBorderSegments.push(this.leftBorder);
        }

        return closedBorderSegments;
    }
}