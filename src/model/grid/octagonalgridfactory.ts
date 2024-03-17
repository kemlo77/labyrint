import { Coordinate } from '../coordinate';
import { Cell } from './cell/cell';
import { OctagonalCell } from './cell/octagonalcell';
import { TiltedSquareCell } from './cell/tiltedsquarecell';
import { Grid } from './grid';
import { GridFactory } from './gridfactory';

export class OctagonalGridFactory extends GridFactory {

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
            for (let rowIndex: number = 0; rowIndex < numberOfRows * 2 - 1; rowIndex++) {
                if (rowIndex % 2 === 0) {
                    const xCoordinate: number = cellWidth * (columnIndex + 1);
                    const yCoordinate: number = cellWidth * (rowIndex / 2 + 1);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(new OctagonalCell(center, cellWidth));
                } else {
                    const tiltedSquareCellWidth: number =
                        cellWidth - this.sideLengthOfOctagonFromInradius(cellWidth / 2);
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

    private sideLengthOfOctagonFromInradius(inradius: number): number {
        return inradius * 2 / (1 + Math.SQRT2);
    }

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.connectOctagonalCellsVertically(grid);
        this.connectOctagonalCellsHorizontally(grid);

        this.connectOctagonalCellToTiltedSquareCellInQ1(grid);
        this.connectOctagonalCellToTiltedSquareCellInQ2(grid);
        this.connectOctagonalCellToTiltedSquareCellInQ3(grid);
        this.connectOctagonalCellToTiltedSquareCellInQ4(grid);
    }



    private connectOctagonalCellsVertically(grid: Cell[][]): void {
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

    private connectOctagonalCellsHorizontally(grid: Cell[][]): void {
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

    private connectOctagonalCellToTiltedSquareCellInQ1(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 2; rowIndex < grid[columnIndex].length; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex < grid.length - 1) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex - 1]);
                    grid[columnIndex][rowIndex - 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

    private connectOctagonalCellToTiltedSquareCellInQ2(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 2; rowIndex < grid[columnIndex].length; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex > 0) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex - 1][rowIndex - 1]);
                    grid[columnIndex - 1][rowIndex - 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

    private connectOctagonalCellToTiltedSquareCellInQ3(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                if (rowIndex % 2 === 0 && columnIndex < grid.length - 1) {
                    grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex + 1]);
                    grid[columnIndex][rowIndex + 1].addNeighbour(grid[columnIndex][rowIndex]);
                }
            }
        }
    }

    private connectOctagonalCellToTiltedSquareCellInQ4(grid: Cell[][]): void {
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