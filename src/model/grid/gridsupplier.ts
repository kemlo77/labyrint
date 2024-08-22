import { Grid } from './grid';
import { HexagonalGridFactory } from './gridfactories/hexagonalgridfactory';
import { OctagonalGridFactory } from './gridfactories/octagonalgridfactory';
import { SquareGridFactory } from './gridfactories/squaregridfactory';
import { DiagonalSquareGridFactory } from './gridfactories/diagonalsquaregridfactory';
import { TriangularGridFactory } from './gridfactories/triangulargridfactory';
import { RunningBondGridFactory } from './gridfactories/runningbondgridfactory';
import { Coordinate } from '../coordinate';
import { RectangularGridProperties } from './gridfactories/rectangulargridproperties';
import { ComplexGridFactory } from './gridfactories/complexgridfactory';

export class GridSupplier {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static getGrid(gridType: string): Grid {

        const insertionPoint: Coordinate = new Coordinate(15, 15);
        const testInsertionPoint: Coordinate = new Coordinate(0, 0);

        if (gridType === 'test-grid') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(testInsertionPoint, 3, 3, 10);
            return new SquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'square') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new SquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'tiltedSquare') {
            const specialInsertionPoint: Coordinate = new Coordinate(15, 30 * 15 * Math.SQRT2 / 2 + 15);
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(specialInsertionPoint, 30, 30, 15, -45);
            return new SquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'runningBond') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new RunningBondGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'hexagonal') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 40, 21, 30);
            return new HexagonalGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'triangular') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new TriangularGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'octagonal') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new OctagonalGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'diagonalSquare') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new DiagonalSquareGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'complexGrid') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new ComplexGridFactory().createGrid(gridProperties);
        }

        throw new Error('Invalid grid type');

    }
}