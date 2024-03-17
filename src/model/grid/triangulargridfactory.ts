
import { Cell } from './cell/cell';
import { Grid } from './grid';
import { Coordinate } from '../coordinate';
import { PointyTopTriangularCell } from './cell/pointytoptriangularcell';
import { FlatTopTriangularCell } from './cell/flattoptriangularcell';
import { GridFactory } from './gridfactory';

export class TriangularGridFactory extends GridFactory {

    constructor() {
        super();
    }


    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellMatrix: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectGrid(cellMatrix);

        const startCell: Cell = cellMatrix[0][0];
        startCell.visited = true;
        const endCell: Cell = cellMatrix[numberOfColumns - 1][numberOfRows - 1];

        return new Grid(cellMatrix, startCell, endCell);
    }


    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellHeight: number = Math.sqrt(3) / 2 * cellWidth;

        const grid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const xCoordinate: number = cellWidth * (1 + columnIndex / 2);
                let yCoordinate: number = cellHeight * (1 + rowIndex);
                yCoordinate += this.cellHasPointyTop(columnIndex, rowIndex) ? 0 : cellHeight * 1 / 3;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                if (this.cellHasPointyTop(columnIndex, rowIndex)) {
                    rowOfCells.push(new PointyTopTriangularCell(center, cellWidth));
                } else {
                    rowOfCells.push(new FlatTopTriangularCell(center, cellWidth));
                }
            }
            grid.push(rowOfCells);
        }
        return grid;
    }

    private cellHasPointyTop(columnIndex: number, rowIndex: number): boolean {
        return !this.cellHasFlatTop(columnIndex, rowIndex);
    }

    private cellHasFlatTop(columnIndex: number, rowIndex: number): boolean {
        const evenRowIndex: boolean = rowIndex % 2 == 0;
        const evenColumnIndex: boolean = columnIndex % 2 == 0;
        return (evenRowIndex && evenColumnIndex) || (!evenRowIndex && !evenColumnIndex);
    }

    private interconnectGrid(grid: Cell[][]): void {
        this.connectNeighboursToTheSouth(grid);
        this.connectNeighboursToTheNorth(grid);
        this.connectNeighboursToTheWest(grid);
        this.connectNeighboursToTheEast(grid);
    }

    private connectNeighboursToTheSouth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                if (this.cellHasFlatTop(columnIndex, rowIndex)) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex + 1]);
                }
            }
        }
    }

    private connectNeighboursToTheNorth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 1; rowIndex < grid[columnIndex].length; rowIndex++) {
                if (this.cellHasPointyTop(columnIndex, rowIndex)) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex - 1]);
                }

            }
        }
    }

    private connectNeighboursToTheWest(grid: Cell[][]): void {
        for (let columnIndex: number = 1; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex - 1][rowIndex]);
            }
        }
    }

    private connectNeighboursToTheEast(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length - 1; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex + 1][rowIndex]);
            }
        }
    }
}