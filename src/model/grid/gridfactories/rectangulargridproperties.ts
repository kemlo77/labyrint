import { Coordinate } from '../../coordinate';

export class RectangularGridProperties {

    private _insertionPoint: Coordinate;
    private _numberOfHorizontalEdgeSegments: number;
    private _numberOfVerticalEdgeSegments: number;
    private _lengthOfEdgeSegments: number;
    private _angle: number;

    constructor(
        insertionPoint: Coordinate,
        numberOforizontalEdgeSegments: number,
        numberOfVerticalEdgeSegments: number,
        lengthOfEdgeSegments: number,
        angle: number = 0
    ) {
        if (numberOforizontalEdgeSegments < 1) {
            throw new Error('numberOforizontalEdgeSegments must be at least 1');
        }
        if (numberOfVerticalEdgeSegments < 1) {
            throw new Error('numberOfVerticalEdgeSegments must be at least 1');
        }
        if (lengthOfEdgeSegments <= 0) {
            throw new Error('lengthOfEdgeSegments must be positive');
        }
        this._insertionPoint = insertionPoint;
        this._numberOfHorizontalEdgeSegments = numberOforizontalEdgeSegments;
        this._numberOfVerticalEdgeSegments = numberOfVerticalEdgeSegments;
        this._lengthOfEdgeSegments = lengthOfEdgeSegments;
        this._angle = angle;
    }

    get insertionPoint(): Coordinate {
        return this._insertionPoint;
    }

    get numberOfHorizontalEdgeSegments(): number {
        return this._numberOfHorizontalEdgeSegments;
    }

    get numberOfVerticalEdgeSegments(): number {
        return this._numberOfVerticalEdgeSegments;
    }

    get lengthOfEdgeSegments(): number {
        return this._lengthOfEdgeSegments;
    }

    get angle(): number {
        return this._angle;
    }
}