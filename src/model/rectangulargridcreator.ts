import { Coordinate } from './coordinate';
import { Cell } from './cell';
import { Grid } from './grid';

export class RectangularGridCreator {

    private constructor() {
        //
    }

    static createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = RectangularGridCreator.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        RectangularGridCreator.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private static createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellGrid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const xCoordinate: number = cellWidth * (columnIndex + 1);
                const yCoordinate: number = cellWidth * (rowIndex + 1);
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                rowOfCells.push(new Cell(center, cellWidth));
            }
            cellGrid.push(rowOfCells);
        }
        return cellGrid;
    }

    private static interconnectCellsInGrid(grid: Cell[][]): void {
        RectangularGridCreator.connectNeighboursToTheSouth(grid);
        RectangularGridCreator.connectNeighboursToTheNorth(grid);
        RectangularGridCreator.connectNeighboursToTheWest(grid);
        RectangularGridCreator.connectNeighboursToTheEast(grid);
    }

    private static connectNeighboursToTheSouth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex + 1]);
            }
        }
    }

    private static connectNeighboursToTheNorth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 1; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex - 1]);
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