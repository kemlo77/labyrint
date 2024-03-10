
import { Cell } from './cell/cell';
import { Grid } from './grid';
import { Coordinate } from '../coordinate';
import { PointyTopTriangularCell } from './cell/pointytoptriangularcell';
import { FlatTopTriangularCell } from './cell/flattoptriangularcell';

export class TriangularGridCreator {

    private constructor() {
        //
    }


    static createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellMatrix: Cell[][] = TriangularGridCreator.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        TriangularGridCreator.interconnectGrid(cellMatrix);

        const startCell: Cell = cellMatrix[0][0];
        startCell.visited = true;
        const endCell: Cell = cellMatrix[numberOfColumns - 1][numberOfRows - 1];

        return new Grid(cellMatrix, startCell, endCell);
    }


    private static createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
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

    private static cellHasPointyTop(columnIndex: number, rowIndex: number): boolean {
        return !this.cellHasFlatTop(columnIndex, rowIndex);
    }

    private static cellHasFlatTop(columnIndex: number, rowIndex: number): boolean {
        const evenRowIndex: boolean = rowIndex % 2 == 0;
        const evenColumnIndex: boolean = columnIndex % 2 == 0;
        return (evenRowIndex && evenColumnIndex) || (!evenRowIndex && !evenColumnIndex);
    }

    private static interconnectGrid(grid: Cell[][]): void {
        TriangularGridCreator.connectNeighboursToTheSouth(grid);
        TriangularGridCreator.connectNeighboursToTheNorth(grid);
        TriangularGridCreator.connectNeighboursToTheWest(grid);
        TriangularGridCreator.connectNeighboursToTheEast(grid);
    }

    private static connectNeighboursToTheSouth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                const lastRow: boolean = rowIndex == grid[columnIndex].length - 1;
                if (lastRow) {
                    continue;
                }
                if (this.cellHasFlatTop(columnIndex, rowIndex)) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex + 1]);
                }

            }
        }
    }

    private static connectNeighboursToTheNorth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 1; rowIndex < grid[columnIndex].length; rowIndex++) {
                const firstRow: boolean = rowIndex == 0;
                if (firstRow) {
                    continue;
                }
                if (TriangularGridCreator.cellHasPointyTop(columnIndex, rowIndex)) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex - 1]);
                }

            }
        }
    }

    private static connectNeighboursToTheWest(grid: Cell[][]): void {
        for (let columnIndex: number = 1; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex - 1][rowIndex]);
            }
        }
    }

    private static connectNeighboursToTheEast(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length - 1; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex + 1][rowIndex]);
            }
        }
    }
}