import { Segment } from '../../segment';
import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class TiltedSquareCell extends Cell {

    private upperCorner: Coordinate;
    private rightCorner: Coordinate;
    private leftCorner: Coordinate;
    private lowerCorner: Coordinate;
    private upperRightBorder: Segment;
    private lowerRightBorder: Segment;
    private lowerLeftBorder: Segment;
    private upperLeftBorder: Segment;


    constructor(center: Coordinate, width: number) {
        super(center, width);
        this.createCorners();
        this.createBorders();
    }

    private createCorners(): void {
        const halfWidth: number = this.width / 2;
        this.upperCorner = new Coordinate(this.center.x, this.center.y + halfWidth);
        this.rightCorner = new Coordinate(this.center.x + halfWidth, this.center.y);
        this.lowerCorner = new Coordinate(this.center.x, this.center.y - halfWidth);
        this.leftCorner = new Coordinate(this.center.x - halfWidth, this.center.y);

    }

    private createBorders(): void {
        this.upperRightBorder = new Segment(this.upperCorner, this.rightCorner);
        this.lowerRightBorder = new Segment(this.rightCorner, this.lowerCorner);
        this.lowerLeftBorder = new Segment(this.lowerCorner, this.leftCorner);
        this.upperLeftBorder = new Segment(this.leftCorner, this.upperCorner);
    }

    get borders(): Segment[] {
        return [this.upperRightBorder, this.lowerRightBorder, this.lowerLeftBorder, this.upperLeftBorder];
    }

    get closedBorders(): Segment[] {
        const closedBorders: Segment[] = [];

        type CellTest = (cell: Cell) => boolean;
        const isLocatedInFirstQuadrant: CellTest = c => c.center.x > this.center.x && c.center.y > this.center.y;
        const isLocatedInSecondQuadrant: CellTest = c => c.center.x < this.center.x && c.center.y > this.center.y;
        const isLocatedInThirdQuadrant: CellTest = c => c.center.x < this.center.x && c.center.y < this.center.y;
        const isLocatedInFourthQuadrant: CellTest = c => c.center.x > this.center.x && c.center.y < this.center.y;

        const hasNoConnectedCellInFirstQuadrant: boolean = !this.connectedNeighbours.some(isLocatedInFirstQuadrant);
        const hasNoConnectedCellInSecondQuadrant: boolean = !this.connectedNeighbours.some(isLocatedInSecondQuadrant);
        const hasNoConnectedCellInThirdQuadrant: boolean = !this.connectedNeighbours.some(isLocatedInThirdQuadrant);
        const hasNoConnectedCellInFourthQuadrant: boolean = !this.connectedNeighbours.some(isLocatedInFourthQuadrant);

        if (hasNoConnectedCellInFirstQuadrant) {
            closedBorders.push(this.upperRightBorder);
        }
        if (hasNoConnectedCellInSecondQuadrant) {
            closedBorders.push(this.upperLeftBorder);
        }
        if (hasNoConnectedCellInThirdQuadrant) {
            closedBorders.push(this.lowerLeftBorder);
        }
        if (hasNoConnectedCellInFourthQuadrant) {
            closedBorders.push(this.lowerRightBorder);
        }
        return closedBorders;

    }

    get corners(): Coordinate[] {
        return [this.upperCorner, this.rightCorner, this.lowerCorner, this.leftCorner];
    }

}