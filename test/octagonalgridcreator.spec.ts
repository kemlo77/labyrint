import { OctagonalGridCreator } from '../src/model/grid/octagonalgridcreator';
import { Grid } from '../src/model/grid/grid';
import { expect } from 'chai';

describe('OctagonalGridCreator', () => {

    it('Verifying neighbour count', () => {
        const grid: Grid = OctagonalGridCreator.createGrid(7, 5, 10);

        expect(grid.allCells.length).to.equal(33);
        grid.printNeighboursPerCell();

        expect(grid['_cellMatrix'][0].map(cell => cell.neighbours.length)).to.deep.equal([3, 4, 5, 2]);
        expect(grid['_cellMatrix'][1].map(cell => cell.neighbours.length)).to.deep.equal([4, 4, 4, 4]);
        expect(grid['_cellMatrix'][2].map(cell => cell.neighbours.length)).to.deep.equal([4, 4, 4, 4]);
        expect(grid['_cellMatrix'][3].map(cell => cell.neighbours.length)).to.deep.equal([3, 3, 3, 3]);
        expect(grid['_cellMatrix'][4].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 3, 2]);




    });



});
