import { expect } from 'chai';
import { TriangularGridFactory } from '../../../../src/model/grid/gridfactories/triangulargridfactory';
import { Cell } from '../../../../src/model/grid/cell/cell';
import { Grid } from '../../../../src/model/grid/grid';

describe('TriangularGridFactory', () => {

    it('verifying number of neighbours', () => {
        const triangularGridFactory: TriangularGridFactory = new TriangularGridFactory();
        const cellMatrix: Cell[][] = triangularGridFactory['createCellMatrix'](3, 3, 10);
        triangularGridFactory['establishNeighbourRelationsInMatrix'](cellMatrix);
        const middleCell: Cell = cellMatrix[1][1];
        expect(middleCell.neighbours.length).to.equal(3);
    });

    it('verifying neighbour count', () => {
        const triangularGridFactory: TriangularGridFactory = new TriangularGridFactory();
        const cellMatrix: Cell[][] = triangularGridFactory['createCellMatrix'](4, 4, 10);
        triangularGridFactory['establishNeighbourRelationsInMatrix'](cellMatrix);
        expect(cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([2, 2, 2, 2]);
        expect(cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 3, 2]);
        expect(cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([3, 3, 3, 3]);
        expect(cellMatrix[3].map(cell => cell.neighbours.length)).to.deep.equal([1, 2, 2, 1]);

    });

});