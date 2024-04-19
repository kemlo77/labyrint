import { expect } from 'chai';
import { OctagonalGridFactory } from '../../../../src/model/grid/gridfactories/octagonalgridfactory';
import { Cell } from '../../../../src/model/grid/cell/cell';

describe('OctagonalGridFactory', () => {

    it('Verifying neighbour count', () => {
        const octagonalGridFactory: OctagonalGridFactory = new OctagonalGridFactory();
        const cellMatrix: Cell[][] = octagonalGridFactory['createCellGrid'](4, 3, 10);
        octagonalGridFactory['connectOctagonalCellsToNeighbourCells'](cellMatrix);
        //expect(grid.allCells.length).to.equal(18);

        expect(cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([3, 4, 5, 4, 3]);
        expect(cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([5, 4, 8, 4, 5]);
        expect(cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([5, 4, 8, 4, 5]);
        expect(cellMatrix[3].map(cell => cell.neighbours.length)).to.deep.equal([3, 0, 5, 0, 3]);

    });



});
