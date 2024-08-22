import { expect } from 'chai';
import { OctagonalGridFactory } 
    from '../../../../../src/model/grid/gridfactories/rectangular_grids/octagonalgridfactory';
import { Cell } from '../../../../../src/model/grid/cell/cell';
import { RectangularGridProperties } 
    from '../../../../../src/model/grid/gridfactories/rectangular_grids/rectangulargridproperties';
import { Coordinate } from '../../../../../src/model/coordinate';

describe('OctagonalGridFactory', () => {

    it('Verifying neighbour count', () => {
        const octagonalGridFactory: OctagonalGridFactory = new OctagonalGridFactory();
        const insertionPoint: Coordinate = new Coordinate(0, 0);
        const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 3, 3, 10);
        const cellMatrix: Cell[][] = octagonalGridFactory['createCellGrid'](gridProperties);
        octagonalGridFactory['establishNeighbourRelationsInGrid'](cellMatrix);

        expect(cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([3, 5, 3]);
        expect(cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([4, 4]);
        expect(cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([5, 8, 5]);
        expect(cellMatrix[3].map(cell => cell.neighbours.length)).to.deep.equal([4, 4]);
        expect(cellMatrix[4].map(cell => cell.neighbours.length)).to.deep.equal([3, 5, 3]);

    });



});
