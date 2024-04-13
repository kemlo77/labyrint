import { expect } from 'chai';
import { TriangularGridFactory } from '../../../../src/model/grid/gridfactories/triangulargridfactory';
import { Cell } from '../../../../src/model/grid/cell/cell';
import { Grid } from '../../../../src/model/grid/grid';

describe('TriangularGridFactory', () => {

    it('verifying number of neighbours', () => {
        const triangularGrid: Grid = new TriangularGridFactory().createGrid(3, 3, 10);
        const middleCell: Cell = triangularGrid['_cellMatrix'][1][1];
        expect(middleCell.neighbours.length).to.equal(3);
    });

    it('verifying neighbour count', () => {
        const triangularGrid: Grid = new TriangularGridFactory().createGrid(4, 4, 10);
        expect(triangularGrid['_cellMatrix'][0].map(cell => cell.neighbours.length)).to.deep.equal([2, 2, 2, 2]);
        expect(triangularGrid['_cellMatrix'][1].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 3, 2]);
        expect(triangularGrid['_cellMatrix'][2].map(cell => cell.neighbours.length)).to.deep.equal([3, 3, 3, 3]);
        expect(triangularGrid['_cellMatrix'][3].map(cell => cell.neighbours.length)).to.deep.equal([1, 2, 2, 1]);

    });

});