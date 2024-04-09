import { Grid } from './grid';
import { HexagonalGridFactory } from './gridfactories/hexagonalgridfactory';
import { OctagonalGridFactory } from './gridfactories/octagonalgridfactory';
import { SquareGridFactory } from './gridfactories/squaregridfactory';
import { DiagonalSquareGridFactory } from './gridfactories/diagonalsquaregridfactory';
import { DiagonalSquareVariantFactory } from './gridfactories/diagonalsquarevariantfactory';
import { TriangularGridFactory } from './gridfactories/triangulargridfactory';
import { RunningBondGridFactory } from './gridfactories/runningbondgridfactory';

export class GridSupplier {
    static getGrid(gridType: string): Grid {

        if (gridType === 'square') {
            return new SquareGridFactory().createGrid(69, 43, 15);
        }

        if (gridType === 'runningBond') {
            return new RunningBondGridFactory().createGrid(20, 8, 25);
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
            return new DiagonalSquareGridFactory().createGrid(41, 25, 25);
        }

        if (gridType === 'diagonalSquareVariant') {
            return new DiagonalSquareVariantFactory().createGrid(32, 32, 20);
        }

        throw new Error('Invalid grid type');

    }
}