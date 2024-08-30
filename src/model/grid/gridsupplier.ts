import { Grid } from './grid';
import { HexagonsGridFactory } from './gridfactories/rectangular_grids/hexagonsgridfactory';
import { OctagonsGridFactory } from './gridfactories/rectangular_grids/octagonsgridfactory';
import { StandardGridFactory } from './gridfactories/rectangular_grids/standardgridfactory';
import { DiagonalSquaresGridFactory } from './gridfactories/rectangular_grids/diagonalsquaresgridfactory';
import { TrianglesGridFactory } from './gridfactories/rectangular_grids/trianglesgridfactory';
import { RunningBondGridFactory } from './gridfactories/rectangular_grids/runningbondgridfactory';
import { Coordinate } from '../coordinate';
import { RectangularGridProperties } from './gridfactories/rectangular_grids/rectangulargridproperties';
import { SwedishFlagGridFactory } from './gridfactories/complex_grids/swedishflaggridfactory';
import { ComplexGridProperties } from './gridfactories/complex_grids/complexgridproperties';
import { RegularShapedGridProperties } from './gridfactories/regular_shaped_grids/regularshapedgridproperties';
import { TriangularGridFactory }
    from './gridfactories/regular_shaped_grids/triangulargridfactory';
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

        if (gridType === 'hexagons') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 40, 21, 30);
            return new HexagonsGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'triangles') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new TrianglesGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'octagons') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new OctagonsGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'diagonalSquares') {
            const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 34, 21, 30);
            return new DiagonalSquaresGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'swedishFlag') {
            const gridProperties: ComplexGridProperties = new ComplexGridProperties(insertionPoint, 20, 0);
            return new SwedishFlagGridFactory().createGrid(gridProperties);
        }

        if (gridType === 'triangular') {
            const gridProperties: RegularShapedGridProperties =
                new RegularShapedGridProperties(insertionPoint, 24, 30);
            return new TriangularGridFactory().createGrid(gridProperties);
        }

        throw new Error('Invalid grid type');

    }
}