import { expect } from 'chai';
import { SquareGridCreator } from '../src/model/grid/squaregridcreator';
import { Cell } from '../src/model/grid/cell/cell';
import { Grid } from '../src/model/grid/grid';

describe('SquareGridCreator', () => {

    it('verifying neighbours', () => {
        const squareGrid: Grid = SquareGridCreator.createGrid(3, 3, 10);
        const middleCell: Cell = squareGrid.cellMatrix[1][1];
        //south neighbour
        expect(middleCell.neighbours[0].center.x).to.equal(20);
        expect(middleCell.neighbours[0].center.y).to.equal(30);
        //north neighbour
        expect(middleCell.neighbours[1].center.x).to.equal(20);
        expect(middleCell.neighbours[1].center.y).to.equal(10);
        //west neighbour
        expect(middleCell.neighbours[2].center.x).to.equal(10);
        expect(middleCell.neighbours[2].center.y).to.equal(20);
        //east neighbour
        expect(middleCell.neighbours[3].center.x).to.equal(30);
        expect(middleCell.neighbours[3].center.y).to.equal(20);
    });

    it('verifying neighbour count', () => {
        const squareGrid: Grid = SquareGridCreator.createGrid(3, 3, 10);
        expect(squareGrid.cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 2]);
        expect(squareGrid.cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([3, 4, 3]);
        expect(squareGrid.cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 2]);
    });


    it('verifying top left cell', () => {
        const squareGrid: Grid = SquareGridCreator.createGrid(3, 3, 10);
        const topLeftCell: Cell = squareGrid.cellMatrix[0][0];
        expect(topLeftCell.center.x).to.equal(10);
        expect(topLeftCell.center.y).to.equal(10);
    });

    it('verifying center cell', () => {
        const squareGrid: Grid = SquareGridCreator.createGrid(3, 3, 10);
        const centerCell: Cell = squareGrid.cellMatrix[1][1];
        expect(centerCell.center.x).to.equal(20);
        expect(centerCell.center.y).to.equal(20);
    });

    it('verifying right center cell', () => {
        const squareGrid: Grid = SquareGridCreator.createGrid(3, 3, 10);
        const centerCell: Cell = squareGrid.cellMatrix[1][1];
        expect(centerCell.center.x).to.equal(20);
        expect(centerCell.center.y).to.equal(20);
    });

    it('totalNumberOfCells', () => {
        const squareGrid: Grid = SquareGridCreator.createGrid(3, 3, 10);
        expect(squareGrid.totalNumberOfCells).to.equal(9);
    });


});