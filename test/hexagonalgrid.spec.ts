import { expect } from 'chai';
import { HexagonalGrid } from '../src/model/hexagonalgrid';

describe('HexagonalGrid', () => {

    it('verifying neighbour count', () => {
        const rectGrid: HexagonalGrid = new HexagonalGrid(5,5,10);
        expect(rectGrid.grid[0].map(cell => cell.neighbours.length)).to.deep.equal([3,3,5,3,3]);
        expect(rectGrid.grid[1].map(cell => cell.neighbours.length)).to.deep.equal([4,6,6,6,4]);
        expect(rectGrid.grid[2].map(cell => cell.neighbours.length)).to.deep.equal([4,6,6,6,4]);
        expect(rectGrid.grid[3].map(cell => cell.neighbours.length)).to.deep.equal([4,6,6,6,4]);
        expect(rectGrid.grid[4].map(cell => cell.neighbours.length)).to.deep.equal([2,5,3,5,2]);
    });

    it('numberOfVisitedCells', ()=> {
        const rectGrid: HexagonalGrid = new HexagonalGrid(5,5,10);
        expect(rectGrid.numberOfVisitedCells).to.equal(1);
    });

    it('totalNumberOfCells', () => {
        const rectGrid: HexagonalGrid = new HexagonalGrid(5,5,10);
        expect(rectGrid.totalNumberOfCells).to.equal(25);
    });


});