import { BorderSegment } from '../../bordersegment';
import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class TiltedSquareCell extends Cell {

    private upperCorner: Coordinate;
    private rightCorner: Coordinate;
    private leftCorner: Coordinate;
    private lowerCorner: Coordinate;
    private upperRightBorder: BorderSegment;
    private lowerRightBorder: BorderSegment;
    private lowerLeftBorder: BorderSegment;
    private upperLeftBorder: BorderSegment;


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
        this.upperRightBorder = new BorderSegment(this.upperCorner, this.rightCorner);
        this.lowerRightBorder = new BorderSegment(this.rightCorner, this.lowerCorner);
        this.lowerLeftBorder = new BorderSegment(this.lowerCorner, this.leftCorner);
        this.upperLeftBorder = new BorderSegment(this.leftCorner, this.upperCorner);
    }


    get closedBorders(): BorderSegment[] {
        const closedBorderSegments: BorderSegment[] = [];

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
            closedBorderSegments.push(this.upperRightBorder);
        }
        if (hasNoConnectedCellInSecondQuadrant) {
            closedBorderSegments.push(this.upperLeftBorder);
        }
        if (hasNoConnectedCellInThirdQuadrant) {
            closedBorderSegments.push(this.lowerLeftBorder);
        }
        if (hasNoConnectedCellInFourthQuadrant) {
            closedBorderSegments.push(this.lowerRightBorder);
        }
        return closedBorderSegments;

    }

    get corners(): Coordinate[] {
        return [this.upperCorner, this.rightCorner, this.lowerCorner, this.leftCorner];
    }

}