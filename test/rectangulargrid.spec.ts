import { expect } from 'chai';
import { RectangularGrid } from '../src/model/rectangulargrid';
import { Cell } from '../src/model/cell';

describe('RectangularGrid', () => {

    it('verifying neighbours', () => {
        const rectGrid: RectangularGrid = new RectangularGrid(3,3,10);
        const midleCell: Cell = rectGrid.grid[1][1];
        //south neighbour
        expect(midleCell.neighbours[0].x).to.equal(20);
        expect(midleCell.neighbours[0].y).to.equal(30);
        //north neighbour
        expect(midleCell.neighbours[1].x).to.equal(20);
        expect(midleCell.neighbours[1].y).to.equal(10);
        //west neighbour
        expect(midleCell.neighbours[2].x).to.equal(10);
        expect(midleCell.neighbours[2].y).to.equal(20);
        //east neighbour
        expect(midleCell.neighbours[3].x).to.equal(30);
        expect(midleCell.neighbours[3].y).to.equal(20);
    });

    it('verifying neighbour count', () => {
        const rectGrid: RectangularGrid = new RectangularGrid(3,3,10);
        expect(rectGrid.grid[0].map(cell => cell.neighbours.length)).to.deep.equal([2,3,2]);
        expect(rectGrid.grid[1].map(cell => cell.neighbours.length)).to.deep.equal([3,4,3]);
        expect(rectGrid.grid[2].map(cell => cell.neighbours.length)).to.deep.equal([2,3,2]);
    });


    it('verifying top left cell', () => {
        const rectGrid: RectangularGrid = new RectangularGrid(3,3,10);
        const topLeftCell: Cell = rectGrid.grid[0][0];
        expect(topLeftCell.x).to.equal(10);
        expect(topLeftCell.y).to.equal(10);
    });

    it('verifying center cell', () => {
        const rectGrid: RectangularGrid = new RectangularGrid(3,3,10);
        const centerCell: Cell = rectGrid.grid[1][1];
        expect(centerCell.x).to.equal(20);
        expect(centerCell.y).to.equal(20);
    });

    it('verifying right center cell', () => {
        const rectGrid: RectangularGrid = new RectangularGrid(3,3,10);
        const centerCell: Cell = rectGrid.grid[1][1];
        expect(centerCell.x).to.equal(20);
        expect(centerCell.y).to.equal(20);
    });

    it('totalNumberOfCells', () => {
        const rectGrid: RectangularGrid = new RectangularGrid(3,3,10);
        expect(rectGrid.totalNumberOfCells).to.equal(9);
    });


});