import { Grid } from '../../../src/model/grid/grid';
import { Cell } from '../../../src/model/grid/cell/cell';
import { GridSupplier } from '../../../src/model/grid/gridsupplier';
import { expect } from 'chai';
import { Coordinate } from '../../../src/model/coordinate';
import { RectangularGridProperties } from '../../../src/model/grid/gridfactories/rectangulargridproperties';
import { SquareGridFactory } from '../../../src/model/grid/gridfactories/squaregridfactory';

describe('Grid', () => {
    let grid: Grid;


    beforeEach(() => {
        // Initialize the grid and cells before each test
        grid = GridSupplier.getGrid('test-grid');
    });

    it('should have the correct start cell', () => {
        expect(grid.startCell.center.x).to.equal(5);
        expect(grid.startCell.center.y).to.equal(5);
    });

    it('should have the correct end cell', () => {
        expect(grid.endCell.center.x).to.equal(25);
        expect(grid.endCell.center.y).to.equal(25);
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

    it('should connect to another grid', () => {
        const insertionPoint1: Coordinate = new Coordinate(0, 0);
        const insertionPoint2: Coordinate = new Coordinate(30, 0);
        const gridProperties1: RectangularGridProperties = new RectangularGridProperties(insertionPoint1, 3, 3, 10);
        const gridProperties2: RectangularGridProperties = new RectangularGridProperties(insertionPoint2, 3, 3, 10);
        const grid1: Grid = new SquareGridFactory().createGrid(gridProperties1);
        const grid2: Grid = new SquareGridFactory().createGrid(gridProperties2);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(4);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(4);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(1);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(4);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(4);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(1);

        grid1.establishNeighbourRelationsWith(grid2);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(2);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(5);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(2);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(2);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(5);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(2);
    });

    it('should not connect to another grid', () => {
        const insertionPoint1: Coordinate = new Coordinate(0, 0);
        const insertionPoint2: Coordinate = new Coordinate(31, 0);
        const gridProperties1: RectangularGridProperties = new RectangularGridProperties(insertionPoint1, 3, 3, 10);
        const gridProperties2: RectangularGridProperties = new RectangularGridProperties(insertionPoint2, 3, 3, 10);
        const grid1: Grid = new SquareGridFactory().createGrid(gridProperties1);
        const grid2: Grid = new SquareGridFactory().createGrid(gridProperties2);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(4);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(4);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(1);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(4);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(4);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(1);

        grid1.establishNeighbourRelationsWith(grid2);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(4);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(4);
        expect(grid1.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(1);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 2).length).to.equal(4);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 3).length).to.equal(4);
        expect(grid2.allCells.filter(cell => cell.neighbours.length === 4).length).to.equal(1);
    });


});
