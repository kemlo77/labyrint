import { Coordinate } from '../../coordinate';
import { Cell } from './cell';
import { FlatTopTriangularCell } from './flattoptriangularcell';
import { HexagonalCell } from './hexagonalcell';
import { OctagonalCell } from './octagonalcell';
import { PointyTopTriangularCell } from './pointytoptriangularcell';
import { SquareCell } from './squarecell';
import { TiltedSquareCell } from './tiltedsquarecell';

export class CellFactory {
    static createCell(center: Coordinate, width: number, type: string): Cell {
        switch (type) {
            case 'flat-top-triangular':
                return new FlatTopTriangularCell(center, width);
            case 'pointy-top-triangular':
                return new PointyTopTriangularCell(center, width);
            case 'square':
                return new SquareCell(center, width);
            case 'tilted-square':
                return new TiltedSquareCell(center, width);
            case 'hexagonal':
                return new HexagonalCell(center, width);
            case 'octagonal':
                return new OctagonalCell(center, width);
            default:
                throw new Error('Unknown cell type');
        }
    }
}