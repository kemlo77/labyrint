import { Grid } from './grid';
import { HexagonalGridFactory } from './gridfactories/hexagonalgridfactory';
import { OctagonalGridFactory } from './gridfactories/octagonalgridfactory';
import { SquareGridFactory } from './gridfactories/squaregridfactory';
import { DiagonalSquareGridFactory } from './gridfactories/diagonalsquaregridfactory';
import { TriangularGridFactory } from './gridfactories/triangulargridfactory';
import { RunningBondGridFactory } from './gridfactories/runningbondgridfactory';
import { Coordinate } from '../coordinate';
import { GridProperties } from './gridfactories/gridproperties';

export class GridSupplier {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static getGrid(gridType: string): Grid {

        const insertionPoint: Coordinate = new Coordinate(15, 15);
        const testInsertionPoint: Coordinate = new Coordinate(0, 0);

        if (gridType === 'test-grid') {
            const gridProperties: GridProperties = new GridProperties(testInsertionPoint, 3, 3, 10);
            return new SquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'square') {
            const gridProperties: GridProperties = new GridProperties(insertionPoint, 34, 21, 30);
            return new SquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'tiltedSquare') {
            const specialInsertionPoint: Coordinate = new Coordinate(15, 30 * 15 * Math.SQRT2 / 2 + 15);
            const gridProperties: GridProperties = new GridProperties(specialInsertionPoint, 30, 30, 15, -45);
            return new SquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'runningBond') {
            const gridProperties: GridProperties = new GridProperties(insertionPoint, 34, 21, 30);
            return new RunningBondGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'hexagonal') {
            return new HexagonalGridFactory().createGrid(33, 24, 30);
        }

        if (gridType === 'triangular') {
            return new TriangularGridFactory().createGrid(81, 29, 25);
        }

        if (gridType === 'octagonal') {
            const gridProperties: GridProperties = new GridProperties(insertionPoint, 34, 21, 30);
            return new OctagonalGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'diagonalSquare') {
            const gridProperties: GridProperties = new GridProperties(insertionPoint, 34, 21, 30);
            return new DiagonalSquareGridFactory().createGrid(gridProperties);
        }

        throw new Error('Invalid grid type');

    }
}