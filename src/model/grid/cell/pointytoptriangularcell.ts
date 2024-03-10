import { BorderSegment } from '../../bordersegment';
import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

export class PointyTopTriangularCell extends Cell {

    private upperCorner: Coordinate;
    private rightCorner: Coordinate;
    private leftCorner: Coordinate;
    private rightBorder: BorderSegment;
    private leftBorder: BorderSegment;
    private lowerBorder: BorderSegment;

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this.createCorners();
        this.createBorders();
    }

    private createCorners(): void {
        const height: number = this.width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = this.width / 2;

        this.upperCorner = new Coordinate(this.center.x, this.center.y + thirdHeight * 2);
        this.rightCorner = new Coordinate(this.center.x + halfWidth, this.center.y - thirdHeight);
        this.leftCorner = new Coordinate(this.center.x - halfWidth, this.center.y - thirdHeight);
    }

    private createBorders(): void {
        this.lowerBorder = new BorderSegment(this.leftCorner, this.rightCorner);
        this.rightBorder = new BorderSegment(this.upperCorner, this.rightCorner);
        this.leftBorder = new BorderSegment(this.upperCorner, this.leftCorner);
    }

    get corners(): Coordinate[] {
        return [
            this.upperCorner,
            this.rightCorner,
            this.leftCorner
        ];
    }

    get closedBorders(): BorderSegment[] {
        const closedBorderSegments: BorderSegment[] = [];

        const isLocatedAboveCenter: any = (neighbourCell: Cell) => neighbourCell.center.y > this.center.y;
        const isLocatedInCenterOrToTheLeft: any = (neighbourCell: Cell) => neighbourCell.center.x <= this.center.x;
        const isLocatedInCenterOrToTheRight: any = (neighbourCell: Cell) => neighbourCell.center.x >= this.center.x;

        const hasNoConnectedCellBelow: boolean = this.connectedNeighbours.every(isLocatedAboveCenter);
        const hasNoConnectedCellToTheRight: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheLeft);
        const hasNoConnectedCellToTheLeft: boolean = this.connectedNeighbours.every(isLocatedInCenterOrToTheRight);

        if (hasNoConnectedCellBelow) {
            closedBorderSegments.push(this.lowerBorder);
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