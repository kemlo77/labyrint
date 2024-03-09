import { BorderSegment } from './bordersegment';
import { Cell } from './cell';
import { Coordinate } from './coordinate';

export class HexagonalCell extends Cell {

    private upperCenterCorner: Coordinate;
    private upperRightCorner: Coordinate;
    private upperLeftCorner: Coordinate;
    private lowerRightCorner: Coordinate;
    private lowerLeftCorner: Coordinate;
    private lowerCenterCorner: Coordinate;

    private upperRightBorder: BorderSegment;
    private upperLeftBorder: BorderSegment;
    private centerRightBorder: BorderSegment;
    private centerLeftBorder: BorderSegment;
    private lowerRightBorder: BorderSegment;
    private lowerLeftBorder: BorderSegment;

    constructor(center: Coordinate, width: number) {
        super(center, width);
        this.createCorners();
        this.createBorders();
    }

    private createCorners(): void {
        const halfWidth: number = this.width / 2;
        const quarterHeight: number = this.width / Math.sqrt(3) / 2;

        this.upperCenterCorner = new Coordinate(this.center.x, this.center.y + 2 * quarterHeight);
        this.upperRightCorner = new Coordinate(this.center.x + halfWidth, this.center.y + quarterHeight);
        this.upperLeftCorner = new Coordinate(this.center.x - halfWidth, this.center.y + quarterHeight);
        this.lowerRightCorner = new Coordinate(this.center.x + halfWidth, this.center.y - quarterHeight);
        this.lowerLeftCorner = new Coordinate(this.center.x - halfWidth, this.center.y - quarterHeight);
        this.lowerCenterCorner = new Coordinate(this.center.x, this.center.y - 2 * quarterHeight);
    }

    private createBorders(): void {
        this.upperRightBorder = new BorderSegment(this.upperCenterCorner, this.upperRightCorner);
        this.centerRightBorder = new BorderSegment(this.upperRightCorner, this.lowerRightCorner);
        this.lowerRightBorder = new BorderSegment(this.lowerRightCorner, this.lowerCenterCorner);
        this.lowerLeftBorder = new BorderSegment(this.lowerCenterCorner, this.lowerLeftCorner);
        this.centerLeftBorder = new BorderSegment(this.lowerLeftCorner, this.upperLeftCorner);
        this.upperLeftBorder = new BorderSegment(this.upperLeftCorner, this.upperCenterCorner);

    }

    get corners(): Coordinate[] {
        return [
            this.upperCenterCorner,
            this.upperRightCorner,
            this.lowerRightCorner,
            this.lowerCenterCorner,
            this.lowerLeftCorner,
            this.upperLeftCorner
        ];
    }
    get closedBorders(): BorderSegment[] {
        //TODO returnera dom borders som inte har en connected neighbour
        const closedBorderSegments: BorderSegment[] = [];
        let hasNoCenterRightNeighbour: boolean = true;
        let hasNoCenterLeftNeighbour: boolean = true;
        let hasNoUpperRightNeighbour: boolean = true;
        let hasNoUpperLeftNeighbour: boolean = true;
        let hasNoLowerRightNeighbour: boolean = true;
        let hasNoLowerLeftNeighbour: boolean = true;

        this.connectedNeighbours.forEach(neighbour => {
            const xDiff: number = neighbour.center.x - this.center.x;
            const yDiff: number = neighbour.center.y - this.center.y;


            if (yDiff > 0) {
                if (xDiff > 0) {
                    hasNoUpperRightNeighbour = false;
                }
                if (xDiff < 0) {
                    hasNoUpperLeftNeighbour = false;
                }

            }
            if (yDiff == 0) {
                if (xDiff > 0) {
                    hasNoCenterRightNeighbour = false;
                }
                if (xDiff < 0) {
                    hasNoCenterLeftNeighbour = false;
                }

            }
            if (yDiff < 0) {
                if (xDiff > 0) {
                    hasNoLowerRightNeighbour = false;
                }
                if (xDiff < 0) {
                    hasNoLowerLeftNeighbour = false;
                }

            }
        });
        if (hasNoUpperRightNeighbour) {
            closedBorderSegments.push(this.upperRightBorder);
        }
        if (hasNoCenterRightNeighbour) {
            closedBorderSegments.push(this.centerRightBorder);
        }
        if (hasNoLowerRightNeighbour) {
            closedBorderSegments.push(this.lowerRightBorder);
        }
        if (hasNoUpperLeftNeighbour) {
            closedBorderSegments.push(this.upperLeftBorder);
        }
        if (hasNoCenterLeftNeighbour) {
            closedBorderSegments.push(this.centerLeftBorder);
        }
        if (hasNoLowerLeftNeighbour) {
            closedBorderSegments.push(this.lowerLeftBorder);
        }


        return closedBorderSegments;
    }



}