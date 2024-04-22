import { Grid } from './grid';
import { HexagonalGridFactory } from './gridfactories/hexagonalgridfactory';
import { OctagonalGridFactory } from './gridfactories/octagonalgridfactory';
import { SquareGridFactory } from './gridfactories/squaregridfactory';
import { DiagonalSquareGridFactory } from './gridfactories/diagonalsquaregridfactory';
import { DiagonalSquareVariantFactory } from './gridfactories/diagonalsquarevariantfactory';
import { TriangularGridFactory } from './gridfactories/triangulargridfactory';
import { RunningBondGridFactory } from './gridfactories/runningbondgridfactory';
import { Coordinate } from '../coordinate';

export class GridSupplier {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static getGrid(gridType: string): Grid {

        const insertionPoint: Coordinate = new Coordinate(15, 15);
        const testInsertionPoint: Coordinate = new Coordinate(0, 0);

        if (gridType === 'test-grid') {
            return new SquareGridFactory().createGrid(3, 3, 10, testInsertionPoint);
        }

        if (gridType === 'square') {
            return new SquareGridFactory().createGrid(34, 21, 30, insertionPoint);
        }

        if (gridType === 'runningBond') {
            return new RunningBondGridFactory().createGrid(69, 21, 15);
        }

        if (gridType === 'hexagonal') {
            return new HexagonalGridFactory().createGrid(51, 37, 20);
        }

        if (gridType === 'triangular') {
            return new TriangularGridFactory().createGrid(81, 29, 25);
        }

        if (gridType === 'octagonal') {
            return new OctagonalGridFactory().createGrid(34, 21, 30);
        }

        if (gridType === 'diagonalSquare') {
            return new DiagonalSquareGridFactory().createGrid(34, 21, 30, insertionPoint);
        }

        if (gridType === 'diagonalSquareVariant') {
            return new DiagonalSquareVariantFactory().createGrid(30, 30, 15);
        }

        throw new Error('Invalid grid type');

    }
}