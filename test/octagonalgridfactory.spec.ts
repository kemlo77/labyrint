
import { Grid } from '../src/model/grid/grid';
import { expect } from 'chai';
import { OctagonalGridFactory } from '../src/model/grid/octagonalgridfactory';

describe('OctagonalGridFactory', () => {

    it('Verifying neighbour count', () => {
        const grid: Grid = new OctagonalGridFactory().createGrid(4, 3, 10);

        //expect(grid.allCells.length).to.equal(18);

        expect(grid['_cellMatrix'][0].map(cell => cell.neighbours.length)).to.deep.equal([3, 4, 5, 4, 3]);
        expect(grid['_cellMatrix'][1].map(cell => cell.neighbours.length)).to.deep.equal([5, 4, 8, 4, 5]);
        expect(grid['_cellMatrix'][2].map(cell => cell.neighbours.length)).to.deep.equal([5, 4, 8, 4, 5]);
        expect(grid['_cellMatrix'][3].map(cell => cell.neighbours.length)).to.deep.equal([3, 0, 5, 0, 3]);

    });



});