import { expect } from 'chai';
import { TriangularGridCreator } from '../src/model/grid/triangulargridcreator';
import { Cell } from '../src/model/grid/cell/cell';
import { Grid } from '../src/model/grid/grid';

describe('TriangularGridCreator', () => {

    it('verifying number of neighbours', () => {
        const triangularGrid: Grid = TriangularGridCreator.createGrid(3, 3, 10);
        const middleCell: Cell = triangularGrid.cellMatrix[1][1];
        expect(middleCell.neighbours.length).to.equal(3);
    });

    it('verifying neighbour count', () => {
        const triangularGrid: Grid = TriangularGridCreator.createGrid(4, 4, 10);
        expect(triangularGrid.cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([2, 2, 2, 2]);
        expect(triangularGrid.cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 3, 2]);
        expect(triangularGrid.cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([3, 3, 3, 3]);
        expect(triangularGrid.cellMatrix[3].map(cell => cell.neighbours.length)).to.deep.equal([1, 2, 2, 1]);

    });

});