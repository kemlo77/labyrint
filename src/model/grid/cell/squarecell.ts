import { Segment } from '../../segment';
import { Cell } from './cell';
import { Coordinate } from '../../coordinate';

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

    get borders(): Segment[] {
        return [this.upperBorder, this.rightBorder, this.lowerBorder, this.leftBorder];
    }

    get closedBorders(): Segment[] {
        const closedBorders: Segment[] = [];
        const allConnectedNeighbourBorders: Segment[] =
            this.connectedNeighbours.reduce((acc, neighbour) => acc.concat(neighbour.borders), []);

        for (const border of this.borders) {
            let borderIsOpen: boolean = false;

            for (const neighbourBorder of allConnectedNeighbourBorders) {
                const distance: number = border.midpoint.distanceTo(neighbourBorder.midpoint);
                const borderIsCommonWithConnectedNeighbour: boolean = distance < 0.1;
                if (borderIsCommonWithConnectedNeighbour) {
                    borderIsOpen = true;
                    break;
                }
            }

            if (!borderIsOpen) {
                closedBorders.push(border);
            }
        }
        return closedBorders;
    }

    get corners(): Coordinate[] {
        return [this.upperRightCorner, this.lowerRightCorner, this.lowerLeftCorner, this.upperLeftCorner];
    }

}