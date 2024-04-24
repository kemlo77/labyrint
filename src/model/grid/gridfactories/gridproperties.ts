import { Coordinate } from '../../coordinate';

export class GridProperties {

    private _insertionPoint: Coordinate;
    private _horizontalEdgeSegments: number;
    private _verticalEdgeSegments: number;
    private _cellWidth: number;
    private _angle: number;

    constructor(
        insertionPoint: Coordinate,
        horizontalEdgeSegments: number,
        verticalEdgeSegments: number,
        cellWidth: number,
        angle: number = 0
    ) {
        if (horizontalEdgeSegments < 1) {
            throw new Error('horizontalEdgeSegments must be at least 1');
        }
        if (verticalEdgeSegments < 1) {
            throw new Error('verticalEdgeSegments must be at least 1');
        }
        if (cellWidth <= 0) {
            throw new Error('cellWidth must be positive');
        }
        this._insertionPoint = insertionPoint;
        this._horizontalEdgeSegments = horizontalEdgeSegments;
        this._verticalEdgeSegments = verticalEdgeSegments;
        this._cellWidth = cellWidth;
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

    get cellWidth(): number {
        return this._cellWidth;
    }

    get angle(): number {
        return this._angle;
    }
}