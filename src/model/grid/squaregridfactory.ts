import { Coordinate } from '../coordinate';
import { Cell } from './cell/cell';
import { Grid } from './grid';
import { SquareCell } from './cell/squarecell';
import { GridFactory } from './gridfactory';

export class SquareGridFactory extends GridFactory {

    constructor() {
        super();
    }

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellGrid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const xCoordinate: number = cellWidth * (columnIndex + 1);
                const yCoordinate: number = cellWidth * (rowIndex + 1);
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                rowOfCells.push(new SquareCell(center, cellWidth));
            }
            cellGrid.push(rowOfCells);
        }
        return cellGrid;
    }

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.connectCellsVertically(grid);
        this.connectCellsHorizontally(grid);
    }

    private connectCellsVertically(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                const cell: Cell = grid[columnIndex][rowIndex];
                const neighbourCell: Cell = grid[columnIndex][rowIndex + 1];
                cell.addNeighbour(neighbourCell);
                neighbourCell.addNeighbour(cell);
            }
        }
    }

    private connectCellsHorizontally(grid: Cell[][]): void {
        for (let columnIndex: number = 1; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const cell: Cell = grid[columnIndex][rowIndex];
                const neighbourCell: Cell = grid[columnIndex - 1][rowIndex];
                cell.addNeighbour(neighbourCell);
                neighbourCell.addNeighbour(cell);
            }
        }
    }

}