import { Coordinate } from '../coordinate';
import { Cell } from './cell/cell';
import { OctagonalCell } from './cell/octagonalcell';
import { TiltedSquareCell } from './cell/tiltedsquarecell';
import { Grid } from './grid';

export class OctagonalGridCreator {

    private constructor() {
        //
    }

    static createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = OctagonalGridCreator.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        OctagonalGridCreator.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private static createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellGrid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows * 2 - 1; rowIndex++) {
                if (rowIndex % 2 === 0) {
                    const xCoordinate: number = cellWidth * (columnIndex + 1);
                    const yCoordinate: number = cellWidth * (rowIndex / 2 + 1);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(new OctagonalCell(center, cellWidth));
                } else {
                    const tiltedSquareCellWidth: number =
                        cellWidth - OctagonalGridCreator.sideLengthOfOctagonFromInradius(cellWidth / 2);
                    const xCoordinate: number = cellWidth * (columnIndex + 1) + cellWidth / 2;
                    const yCoordinate: number = cellWidth * (rowIndex / 2 + 1 / 2) + cellWidth / 2;
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(new TiltedSquareCell(center, tiltedSquareCellWidth));
                }

            }
            cellGrid.push(rowOfCells);
        }
        return cellGrid;
    }

    private static sideLengthOfOctagonFromInradius(inradius: number): number {
        return inradius * 2 / (1 + Math.SQRT2);
    }

    private static interconnectCellsInGrid(grid: Cell[][]): void {
        OctagonalGridCreator.connectOctagonalCellsVertically(grid);
        OctagonalGridCreator.connectOctagonalCellsHorizontally(grid);

        OctagonalGridCreator.connectOctagonalCellToTiltedSquareCellInQ1(grid);
        OctagonalGridCreator.connectOctagonalCellToTiltedSquareCellInQ2(grid);
        OctagonalGridCreator.connectOctagonalCellToTiltedSquareCellInQ3(grid);
        OctagonalGridCreator.connectOctagonalCellToTiltedSquareCellInQ4(grid);
    }



    private static connectOctagonalCellsVertically(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 2; rowIndex++) {
                if (rowIndex % 2 === 0) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const neighbour: Cell = grid[columnIndex][rowIndex + 2];
                    cell.addNeighbour(neighbour);
                    neighbour.addNeighbour(cell);
                }
            }
        }
    }

    private static connectOctagonalCellsHorizontally(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length - 1; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                if (rowIndex % 2 == 0) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const neighbour: Cell = grid[columnIndex + 1][rowIndex];
                    cell.addNeighbour(neighbour);
                    neighbour.addNeighbour(cell);
                }
            }
        }
    }

    private static connectOctagonalCellToTiltedSquareCellInQ1(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 2; rowIndex < grid[columnIndex].length; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex < grid.length - 1) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex - 1]);
                    grid[columnIndex][rowIndex - 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

    private static connectOctagonalCellToTiltedSquareCellInQ2(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 2; rowIndex < grid[columnIndex].length; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex > 0) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex - 1][rowIndex - 1]);
                    grid[columnIndex - 1][rowIndex - 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

    private static connectOctagonalCellToTiltedSquareCellInQ3(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex < grid.length - 1) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex + 1]);
                    grid[columnIndex][rowIndex + 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

    private static connectOctagonalCellToTiltedSquareCellInQ4(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex > 0) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex - 1][rowIndex + 1]);
                    grid[columnIndex - 1][rowIndex + 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

}