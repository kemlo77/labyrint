import { expect } from 'chai';
import { HexagonalGridFactory } from '../../../../src/model/grid/gridfactories/hexagonalgridfactory';
import { Grid } from '../../../../src/model/grid/grid';
import { Cell } from '../../../../src/model/grid/cell/cell';

describe('HexagonalGridFactory', () => {

    it('verifying neighbour count', () => {
        const hexagonalgridfactory: HexagonalGridFactory = new HexagonalGridFactory();
        const cellMatrix: Cell[][] = hexagonalgridfactory['createCellMatrix'](5, 5, 10);
        hexagonalgridfactory['establishNeighbourRelationsInGrid'](cellMatrix);

        expect(cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([2, 4, 4, 4, 3]);
        expect(cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([5, 6, 6, 6, 3]);
        expect(cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([3, 6, 6, 6, 5]);
        expect(cellMatrix[3].map(cell => cell.neighbours.length)).to.deep.equal([5, 6, 6, 6, 3]);
        expect(cellMatrix[4].map(cell => cell.neighbours.length)).to.deep.equal([2, 4, 4, 4, 3]);
    });

    it('numberOfVisitedCells', () => {
        const rectGrid: Grid = new HexagonalGridFactory().createGrid(5, 5, 10);
        expect(rectGrid.numberOfVisitedCells).to.equal(1);
    });

    it('totalNumberOfCells', () => {
        const rectGrid: Grid = new HexagonalGridFactory().createGrid(5, 5, 10);
        expect(rectGrid.totalNumberOfCells).to.equal(25);
    });


});