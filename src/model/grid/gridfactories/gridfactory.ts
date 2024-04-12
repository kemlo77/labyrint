import { Cell } from '../cell/cell';
import { Grid } from '../grid';

export abstract class GridFactory {
    abstract createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid;

    protected interConnectCellsInRows(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const notOnTheLastColumn: boolean = columnIndex !== grid.length - 1;
                if (notOnTheLastColumn) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const nextColumnNeighbour: Cell = grid[columnIndex + 1][rowIndex];
                    cell.addNeighbour(nextColumnNeighbour);
                    nextColumnNeighbour.addNeighbour(cell);
                }
            }
        }
    }

    protected interConnectCellsInColumns(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const notOnTheLastRow: boolean = rowIndex !== grid[columnIndex].length - 1;
                if (notOnTheLastRow) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const nextRowNeighbour: Cell = grid[columnIndex][rowIndex + 1];
                    cell.addNeighbour(nextRowNeighbour);
                    nextRowNeighbour.addNeighbour(cell);
                }
            }
        }
    }
}