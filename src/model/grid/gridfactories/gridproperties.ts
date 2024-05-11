import { Coordinate } from '../../coordinate';

export class GridProperties {

    private _insertionPoint: Coordinate;
    private _horizontalEdgeSegments: number;
    private _verticalEdgeSegments: number;
    private _edgeSegmentLength: number;
    private _angle: number;

    constructor(
        insertionPoint: Coordinate,
        horizontalEdgeSegments: number,
        verticalEdgeSegments: number,
        edgeSegmentLength: number,
        angle: number = 0
    ) {
        if (horizontalEdgeSegments < 1) {
            throw new Error('horizontalEdgeSegments must be at least 1');
        }
        if (verticalEdgeSegments < 1) {
            throw new Error('verticalEdgeSegments must be at least 1');
        }
        if (edgeSegmentLength <= 0) {
            throw new Error('edgeSegmentLength must be positive');
        }
        this._insertionPoint = insertionPoint;
        this._horizontalEdgeSegments = horizontalEdgeSegments;
        this._verticalEdgeSegments = verticalEdgeSegments;
        this._edgeSegmentLength = edgeSegmentLength;
        this._angle = angle;
    }

    get insertionPoint(): Coordinate {
        return this._insertionPoint;
    }

    get horizontalEdgeSegments(): number {
        return this._horizontalEdgeSegments;
    }

    get verticalEdgeSegments(): number {
        return this._verticalEdgeSegments;
    }

    get edgeSegmentLength(): number {
        return this._edgeSegmentLength;
    }

    get angle(): number {
        return this._angle;
    }
}