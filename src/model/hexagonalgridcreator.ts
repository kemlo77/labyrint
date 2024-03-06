import { Cell } from './cell';
import { Coordinate } from './coordinate';
import { Grid } from './grid';
import { HexagonalCell } from './hexagonalcell';

export class HexagonalGridCreator {

    private constructor() {
        //
    }

    static createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = HexagonalGridCreator.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        HexagonalGridCreator.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        startCell.visited = true;
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private static createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellHeight: number = cellWidth * Math.sqrt(3) / 2;
        const rowOffset: number = cellWidth / 2;


        const grid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                let xCoordinate: number = cellWidth * (columnIndex + 1);
                if (rowIndex % 2 == 1) {
                    xCoordinate += rowOffset;
                }
                const yCoordinate: number = cellHeight * (rowIndex + 1);
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                rowOfCells.push(new HexagonalCell(center, cellWidth));
            }
            grid.push(rowOfCells);
        }
        return grid;
    }

    private static interconnectCellsInGrid(grid: Cell[][]): void {
        HexagonalGridCreator.connectNeighboursToTheSouth(grid);
        HexagonalGridCreator.connectNeighboursToTheNorth(grid);
        HexagonalGridCreator.connectNeighboursToTheWest(grid);
        HexagonalGridCreator.connectNeighboursToTheEast(grid);
    }

    private static connectNeighboursToTheSouth(grid: Cell[][]): void {
        const cellWidth: number = grid[0][0].width;
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let rowIndex: number = 0; rowIndex < transposedGrid.length - 1; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const highestAcceptedDistance: number = cellWidth * 0.55;
                transposedGrid[rowIndex + 1]
                    .filter(cell => (highestAcceptedDistance > Math.abs(currentCell.center.x - cell.center.x)))
                    .forEach(cell => currentCell.addNeighbour(cell));
            }
        }
    }

    private static connectNeighboursToTheNorth(grid: Cell[][]): void {
        const cellWidth: number = grid[0][0].width;
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let rowIndex: number = 1; rowIndex < transposedGrid.length; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const highestAcceptedDistance: number = cellWidth * 0.55;
                transposedGrid[rowIndex - 1]
                    .filter(cell => (highestAcceptedDistance > Math.abs(currentCell.center.x - cell.center.x)))
                    .forEach(cell => { currentCell.addNeighbour(cell); });
            }
        }
    }

    private static transposeArrayOfArrays(inputArrayOfArrays: Cell[][]): Cell[][] {
        const newArrayOfArrays: Cell[][] = [];
        for (let column: number = 0; column < inputArrayOfArrays[0].length; column++) {
            const newRow: Cell[] = [];
            for (let row: number = 0; row < inputArrayOfArrays.length; row++) {
                newRow.push(inputArrayOfArrays[row][column]);
            }
            newArrayOfArrays.push(newRow);
        }
        return newArrayOfArrays;
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