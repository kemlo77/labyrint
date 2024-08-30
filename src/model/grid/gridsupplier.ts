import { Grid } from './grid';
import { HexagonalGridFactory } from './gridfactories/rectangular_grids/hexagonalgridfactory';
import { OctagonalGridFactory } from './gridfactories/rectangular_grids/octagonalgridfactory';
import { StandardGridFactory } from './gridfactories/rectangular_grids/standardgridfactory';
import { DiagonalSquareGridFactory } from './gridfactories/rectangular_grids/diagonalsquaregridfactory';
import { TriangularGridFactory } from './gridfactories/rectangular_grids/triangulargridfactory';
import { RunningBondGridFactory } from './gridfactories/rectangular_grids/runningbondgridfactory';
import { Coordinate } from '../coordinate';
import { RectangularGridProperties } from './gridfactories/rectangular_grids/rectangulargridproperties';
import { SwedishFlagGridFactory } from './gridfactories/complex_grids/swedishflaggridfactory';
import { ComplexGridProperties } from './gridfactories/complex_grids/complexgridproperties';
import { RegularShapedGridProperties } from './gridfactories/regular_shaped_grids/regularshapedgridproperties';
import { AlternativeTriangularGridFactory }
    from './gridfactories/regular_shaped_grids/alternativetriangulargridfactory';
import { SquareGridFactory } from './gridfactories/regular_shaped_grids/squaregridfactory';

export class GridSupplier {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static getGrid(gridType: string): Grid {

        const insertionPoint: Coordinate = new Coordinate(15, 15);
        const testInsertionPoint: Coordinate = new Coordinate(0, 0);

        if (gridType === 'test-grid') {
            const gridProperties: RectangularGridProperties =
                new RectangularGridProperties(testInsertionPoint, 3, 3, 10);
            return new StandardGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'standard') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new StandardGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'square') {
            const gridProperties: RegularShapedGridProperties =
                new RegularShapedGridProperties(insertionPoint, 20, 30);
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

        if (gridType === 'swedishFlag') {
            const gridProperties: ComplexGridProperties = new ComplexGridProperties(insertionPoint, 20, 0);
            return new SwedishFlagGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'triangular2') {
            const gridProperties: RegularShapedGridProperties =
                new RegularShapedGridProperties(insertionPoint, 24, 30);
            return new AlternativeTriangularGridFactory().createGrid(gridProperties);
        }

        throw new Error('Invalid grid type');

    }
}