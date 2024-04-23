import { Coordinate } from '../../coordinate';

export class GridProperties {
    constructor(
        readonly insertionPoint: Coordinate,
        readonly horizontalEdgeSegments: number,
        readonly verticalEdgeSegments: number,
        readonly cellWidth: number,
        readonly angle: number = 0
    ) {
        //
    }
}