import { expect } from 'chai';
import { SquareGridFactory } from '../../../../src/model/grid/gridfactories/squaregridfactory';
import { Cell } from '../../../../src/model/grid/cell/cell';

describe('SquareGridFactory', () => {

    let cellMatrix: Cell[][];

    beforeEach(() => {
        const squaregridfactory: SquareGridFactory = new SquareGridFactory();
        cellMatrix = squaregridfactory['createCellMatrix'](3, 3, 10);
        squaregridfactory['establishNeighbourRelationsInMatrix'](cellMatrix);
    });

    it('verifying neighbour count', () => {
        expect(cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 2]);
        expect(cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([3, 4, 3]);
        expect(cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 2]);
    });

    it('verifying top left cell', () => {
        const topLeftCell: Cell = cellMatrix[0][0];
        expect(topLeftCell.center.x).to.equal(10);
        expect(topLeftCell.center.y).to.equal(10);
    });

    it('verifying center cell', () => {
        const centerCell: Cell = cellMatrix[1][1];
        expect(centerCell.center.x).to.equal(20);
        expect(centerCell.center.y).to.equal(20);
    });

    it('verifying right center cell', () => {
        const centerCell: Cell = cellMatrix[1][1];
        expect(centerCell.center.x).to.equal(20);
        expect(centerCell.center.y).to.equal(20);
    });

    it('totalNumberOfCells', () => {
        expect(cellMatrix.flat().length).to.equal(9);
    });

});