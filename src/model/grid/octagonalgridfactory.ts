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
        this.connectOctagonalCellsToNeighbourCells(cellGrid);
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

    private connectOctagonalCellsToNeighbourCells(grid: Cell[][]): void {

        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {

                const rowWithTiltedSquareCells = rowIndex % 2 === 1;
                const currentCell: Cell = grid[columnIndex][rowIndex];
                const notOnTheFirstColumn = columnIndex !== 0;
                const notOnTheLastColumn = columnIndex !== grid.length - 1;
                const notOnTheFirstRow = rowIndex !== 0;
                const notOnTheLastRow = rowIndex !== grid[columnIndex].length - 1;

                if (rowWithTiltedSquareCells) {
                    continue;
                }
                
                if (notOnTheLastRow) {
                    const neighbourOctagonalCellBelow: Cell = grid[columnIndex][rowIndex + 2];
                    currentCell.addNeighbour(neighbourOctagonalCellBelow);
                    neighbourOctagonalCellBelow.addNeighbour(currentCell);
                }

                if (notOnTheLastColumn) {
                    const neighbourOctagonalCellToTheRight: Cell = grid[columnIndex + 1][rowIndex];
                    currentCell.addNeighbour(neighbourOctagonalCellToTheRight);
                    neighbourOctagonalCellToTheRight.addNeighbour(currentCell);
                }

                if (notOnTheFirstRow && notOnTheLastColumn) {
                    const neighbourTiltedSquareCellInQ1: Cell = grid[columnIndex][rowIndex - 1];
                    currentCell.addNeighbour(neighbourTiltedSquareCellInQ1);
                    neighbourTiltedSquareCellInQ1.addNeighbour(currentCell);
                }

                if (notOnTheFirstRow && notOnTheFirstColumn) {
                    const neighbourTiltedSquareCellInQ2 = grid[columnIndex - 1][rowIndex - 1];
                    currentCell.addNeighbour(neighbourTiltedSquareCellInQ2);
                    neighbourTiltedSquareCellInQ2.addNeighbour(currentCell);
                }

                if (notOnTheLastColumn && notOnTheLastRow) {
                    const neighbourTiltedSquareCellInQ3 = grid[columnIndex][rowIndex + 1];
                    currentCell.addNeighbour(neighbourTiltedSquareCellInQ3);
                    neighbourTiltedSquareCellInQ3.addNeighbour(currentCell);
                }

                if (notOnTheFirstColumn && notOnTheLastRow) {
                    const neighbourTiltedSquareCellInQ4 = grid[columnIndex - 1][rowIndex + 1];
                    currentCell.addNeighbour(neighbourTiltedSquareCellInQ4);
                    neighbourTiltedSquareCellInQ4.addNeighbour(currentCell);
                }
                
            }
        }


    }

}