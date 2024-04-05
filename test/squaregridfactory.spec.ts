import { expect } from 'chai';
import { SquareGridFactory } from '../src/model/grid/gridfactories/squaregridfactory';
import { Cell } from '../src/model/grid/cell/cell';
import { Grid } from '../src/model/grid/grid';

describe('SquareGridFactory', () => {

    it('verifying neighbour count', () => {
        const squareGrid: Grid = new SquareGridFactory().createGrid(3, 3, 10);
        expect(squareGrid['_cellMatrix'][0].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 2]);
        expect(squareGrid['_cellMatrix'][1].map(cell => cell.neighbours.length)).to.deep.equal([3, 4, 3]);
        expect(squareGrid['_cellMatrix'][2].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 2]);
    });

    it('verifying top left cell', () => {
        const squareGrid: Grid = new SquareGridFactory().createGrid(3, 3, 10);
        const topLeftCell: Cell = squareGrid['_cellMatrix'][0][0];
        expect(topLeftCell.center.x).to.equal(10);
        expect(topLeftCell.center.y).to.equal(10);
    });

    it('verifying center cell', () => {
        const squareGrid: Grid = new SquareGridFactory().createGrid(3, 3, 10);
        const centerCell: Cell = squareGrid['_cellMatrix'][1][1];
        expect(centerCell.center.x).to.equal(20);
        expect(centerCell.center.y).to.equal(20);
    });

    it('verifying right center cell', () => {
        const squareGrid: Grid = new SquareGridFactory().createGrid(3, 3, 10);
        const centerCell: Cell = squareGrid['_cellMatrix'][1][1];
        expect(centerCell.center.x).to.equal(20);
        expect(centerCell.center.y).to.equal(20);
    });

    it('totalNumberOfCells', () => {
        const squareGrid: Grid = new SquareGridFactory().createGrid(3, 3, 10);
        expect(squareGrid.totalNumberOfCells).to.equal(9);
    });

});