import { expect } from 'chai';
import { HexagonalGridFactory } from '../src/model/grid/gridfactories/hexagonalgridfactory';
import { Grid } from '../src/model/grid/grid';

describe('HexagonalGridFactory', () => {

    it('verifying neighbour count', () => {
        const rectGrid: Grid = new HexagonalGridFactory().createGrid(5, 5, 10);

        expect(rectGrid['_cellMatrix'][0].map(cell => cell.neighbours.length)).to.deep.equal([2, 5, 3, 5, 2]);
        expect(rectGrid['_cellMatrix'][1].map(cell => cell.neighbours.length)).to.deep.equal([4, 6, 6, 6, 4]);
        expect(rectGrid['_cellMatrix'][2].map(cell => cell.neighbours.length)).to.deep.equal([4, 6, 6, 6, 4]);
        expect(rectGrid['_cellMatrix'][3].map(cell => cell.neighbours.length)).to.deep.equal([4, 6, 6, 6, 4]);
        expect(rectGrid['_cellMatrix'][4].map(cell => cell.neighbours.length)).to.deep.equal([3, 3, 5, 3, 3]);
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