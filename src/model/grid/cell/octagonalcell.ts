import { Segment } from '../../segment';
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
    private rightBorder: Segment;
    private upRightBorder: Segment;
    private upperBorder: Segment;
    private upLeftBorder: Segment;
    private leftBorder: Segment;
    private lowLeftBorder: Segment;
    private lowerBorder: Segment;
    private lowRightBorder: Segment;



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
        this.rightBorder = new Segment(this.upperQ4Corner, this.lowerQ1Corner);
        this.upRightBorder = new Segment(this.lowerQ1Corner, this.upperQ1Corner);
        this.upperBorder = new Segment(this.upperQ1Corner, this.upperQ2Corner);
        this.upLeftBorder = new Segment(this.upperQ2Corner, this.lowerQ2Corner);
        this.leftBorder = new Segment(this.lowerQ2Corner, this.upperQ3Corner);
        this.lowLeftBorder = new Segment(this.upperQ3Corner, this.lowerQ3Corner);
        this.lowerBorder = new Segment(this.lowerQ3Corner, this.lowerQ4Corner);
        this.lowRightBorder = new Segment(this.lowerQ4Corner, this.upperQ4Corner);
    }

    get closedBorders(): Segment[] {
        const closedBorders: Segment[] = [];

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
            closedBorders.push(this.rightBorder);
        }
        if (hasNoConnectedCellInQ1) {
            closedBorders.push(this.upRightBorder);
        }
        if (hasNoConnectedCellAbove) {
            closedBorders.push(this.upperBorder);
        }
        if (hasNoConnectedCellInQ2) {
            closedBorders.push(this.upLeftBorder);
        }
        if (hasNoConnectedCellToTheLeft) {
            closedBorders.push(this.leftBorder);
        }
        if (hasNoConnectedCellInQ3) {
            closedBorders.push(this.lowLeftBorder);
        }
        if (hasNoConnectedCellBelow) {
            closedBorders.push(this.lowerBorder);
        }
        if (hasNoConnectedCellInQ4) {
            closedBorders.push(this.lowRightBorder);
        }

        return closedBorders;
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