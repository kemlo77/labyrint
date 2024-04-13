import { Grid } from '../../../src/model/grid/grid';
import { Cell } from '../../../src/model/grid/cell/cell';
import { GridSupplier } from '../../../src/model/grid/gridsupplier';
import { expect } from 'chai';

describe('Grid', () => {
    let grid: Grid;


    beforeEach(() => {
        // Initialize the grid and cells before each test
        grid = GridSupplier.getGrid('test-grid');
    });

    it('should have the correct start cell', () => {
        expect(grid.startCell.center.x).to.equal(15);
        expect(grid.startCell.center.y).to.equal(15);
    });

    it('should have the correct end cell', () => {
        expect(grid.endCell.center.x).to.equal(45);
        expect(grid.endCell.center.y).to.equal(45);
    });

    it('should return all cells', () => {
        expect(grid.allCells.length).to.equal(9);
    });

    it('should return all disconnected cells', () => {
        const allCells: Cell[] = grid.allCells;
        allCells[0].establishConnectionTo(allCells[1]);
        expect(grid.allDisconnectedCells.length).to.equal(7);
    });

    it('should have the correct number of cells', () => {
        expect(grid.totalNumberOfCells).to.equal(9);
    });

    it('should have the correct number of visited cells', () => {
        expect(grid.numberOfVisitedCells).to.equal(1);
    });

    it('should reset the grid', () => {
        const allCells: Cell[] = grid.allCells;
        allCells[0].establishConnectionTo(allCells[1]);
        allCells.forEach(cell => cell.visited = true);
        grid.resetGrid();
        expect(grid.numberOfVisitedCells).to.equal(1);
        expect(grid.allDisconnectedCells.length).to.equal(9);
    });

    it('should disconnect cells with only one connection', () => {
        const allCells: Cell[] = grid.allCells;
        allCells[0].establishConnectionTo(allCells[1]);
        grid.disconnectCellsWithOnlyOneConnection();
        expect(grid.allDisconnectedCells.length).to.equal(9);
    });


});
