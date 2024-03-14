import { BorderSegment } from '../../bordersegment';
import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class OctagonalCell extends Cell {



    private sideLength: number;
    private upperQ1Corner: Coordinate;
    private lowerQ1Corner: Coordinate;
    private upperQ2Corner: Coordinate;
    private lowerQ2Corner: Coordinate;
    private upperQ3Corner: Coordinate;
    private lowerQ3Corner: Coordinate;
    private upperQ4Corner: Coordinate;
    private lowerQ4Corner: Coordinate;
    private rightBorder: BorderSegment;
    private upRightBorder: BorderSegment;
    private upperBorder: BorderSegment;
    private upLeftBorder: BorderSegment;
    private leftBorder: BorderSegment;
    private lowLeftBorder: BorderSegment;
    private lowerBorder: BorderSegment;
    private lowRightBorder: BorderSegment;



    constructor(center: Coordinate, width: number) {
        super(center, width);
        this.calculateAndSetSideLength();
        this.createCorners();
        this.createBorders();
    }

    private calculateAndSetSideLength(): void {
        this.sideLength = this.width / (1 + Math.SQRT2);
    }

    private createCorners(): void {
        const halfSideLength: number = this.sideLength / 2;
        const halfWidth: number = this.width / 2;
        this.lowerQ1Corner = new Coordinate(this.center.x + halfWidth, this.center.y + halfSideLength);
        this.upperQ1Corner = new Coordinate(this.center.x + halfSideLength, this.center.y + halfWidth);
        this.upperQ2Corner = new Coordinate(this.center.x - halfSideLength, this.center.y + halfWidth);
        this.lowerQ2Corner = new Coordinate(this.center.x - halfWidth, this.center.y + halfSideLength);
        this.upperQ3Corner = new Coordinate(this.center.x - halfWidth, this.center.y - halfSideLength);
        this.lowerQ3Corner = new Coordinate(this.center.x - halfSideLength, this.center.y - halfWidth);
        this.lowerQ4Corner = new Coordinate(this.center.x + halfSideLength, this.center.y - halfWidth);
        this.upperQ4Corner = new Coordinate(this.center.x + halfWidth, this.center.y - halfSideLength);
    }

    private createBorders(): void {
        this.rightBorder = new BorderSegment(this.upperQ4Corner, this.lowerQ1Corner);
        this.upRightBorder = new BorderSegment(this.lowerQ1Corner, this.upperQ1Corner);
        this.upperBorder = new BorderSegment(this.upperQ1Corner, this.upperQ2Corner);
        this.upLeftBorder = new BorderSegment(this.upperQ2Corner, this.lowerQ2Corner);
        this.leftBorder = new BorderSegment(this.lowerQ2Corner, this.upperQ3Corner);
        this.lowLeftBorder = new BorderSegment(this.upperQ3Corner, this.lowerQ3Corner);
        this.lowerBorder = new BorderSegment(this.lowerQ3Corner, this.lowerQ4Corner);
        this.lowRightBorder = new BorderSegment(this.lowerQ4Corner, this.upperQ4Corner);
    }

    get closedBorders(): BorderSegment[] {
        const closedBorderSegments: BorderSegment[] = [];

        type CellTest = (cell: Cell) => boolean;
        const isLocatedToTheRight: CellTest = c => c.center.x > this.center.x && c.center.y === this.center.y;
        const isLocatedInQ1: CellTest = c => c.center.x > this.center.x && c.center.y > this.center.y;
        const isLocatedAbove: CellTest = c => c.center.y > this.center.y && c.center.x === this.center.x;
        const isLocatedInQ2: CellTest = c => c.center.x < this.center.x && c.center.y > this.center.y;
        const isLocatedToTheLeft: CellTest = c => c.center.x < this.center.x && c.center.y === this.center.y;
        const isLocatedInQ3: CellTest = c => c.center.x < this.center.x && c.center.y < this.center.y;
        const isLocatedBelow: CellTest = c => c.center.y < this.center.y && c.center.x === this.center.x;
        const isLocatedInQ4: CellTest = c => c.center.x > this.center.x && c.center.y < this.center.y;

        const hasNoConnectedCellToTheRight: boolean = !this.connectedNeighbours.some(isLocatedToTheRight);
        const hasNoConnectedCellInQ1: boolean = !this.connectedNeighbours.some(isLocatedInQ1);
        const hasNoConnectedCellAbove: boolean = !this.connectedNeighbours.some(isLocatedAbove);
        const hasNoConnectedCellInQ2: boolean = !this.connectedNeighbours.some(isLocatedInQ2);
        const hasNoConnectedCellToTheLeft: boolean = !this.connectedNeighbours.some(isLocatedToTheLeft);
        const hasNoConnectedCellInQ3: boolean = !this.connectedNeighbours.some(isLocatedInQ3);
        const hasNoConnectedCellBelow: boolean = !this.connectedNeighbours.some(isLocatedBelow);
        const hasNoConnectedCellInQ4: boolean = !this.connectedNeighbours.some(isLocatedInQ4);

        if (hasNoConnectedCellToTheRight) {
            closedBorderSegments.push(this.rightBorder);
        }
        if (hasNoConnectedCellInQ1) {
            closedBorderSegments.push(this.upRightBorder);
        }
        if (hasNoConnectedCellAbove) {
            closedBorderSegments.push(this.upperBorder);
        }
        if (hasNoConnectedCellInQ2) {
            closedBorderSegments.push(this.upLeftBorder);
        }
        if (hasNoConnectedCellToTheLeft) {
            closedBorderSegments.push(this.leftBorder);
        }
        if (hasNoConnectedCellInQ3) {
            closedBorderSegments.push(this.lowLeftBorder);
        }
        if (hasNoConnectedCellBelow) {
            closedBorderSegments.push(this.lowerBorder);
        }
        if (hasNoConnectedCellInQ4) {
            closedBorderSegments.push(this.lowRightBorder);
        }

        return closedBorderSegments;
    }

    get corners(): Coordinate[] {
        return [
            this.lowerQ1Corner,
            this.upperQ1Corner,
            this.upperQ2Corner,
            this.lowerQ2Corner,
            this.upperQ3Corner,
            this.lowerQ3Corner,
            this.lowerQ4Corner,
            this.upperQ4Corner
        ];
    }


}