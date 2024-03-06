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

    constructor(center: Coordinate, width :number) {
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
        return [
            this.upperRightBorder,
            this.upperLeftBorder,
            this.centerRightBorder,
            this.centerLeftBorder,
            this.lowerRightBorder,
            this.lowerLeftBorder
        ]
    }

    

}