import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class DiagonalSquareGridFactory implements GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.connectTiltedSquareCellsToNeighbourCells(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[numberOfColumns - 1][2 * (numberOfRows - 1)];
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
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'tilted-square'));
                } else {
                    const xCoordinate: number = cellWidth * (columnIndex + 3 / 2);
                    const yCoordinate: number = cellWidth * (rowIndex / 2 + 1);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'tilted-square'));
                }

            }
            cellGrid.push(rowOfCells);
        }
        return cellGrid;
    }

    private connectTiltedSquareCellsToNeighbourCells(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const evenRow: boolean = rowIndex % 2 === 0;
                const onTheLastColumn: boolean = columnIndex === grid.length - 1;

                if (evenRow || onTheLastColumn) {
                    continue;
                }

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const leftUpperCell: Cell = grid[columnIndex][rowIndex - 1];
                const rightUpperCell: Cell = grid[columnIndex + 1][rowIndex - 1];
                const leftLowerCell: Cell = grid[columnIndex][rowIndex + 1];
                const rightLowerCell: Cell = grid[columnIndex + 1][rowIndex + 1];

                currentCell.addNeighbour(leftUpperCell);
                leftUpperCell.addNeighbour(currentCell);
                currentCell.addNeighbour(rightUpperCell);
                rightUpperCell.addNeighbour(currentCell);
                currentCell.addNeighbour(leftLowerCell);
                leftLowerCell.addNeighbour(currentCell);
                currentCell.addNeighbour(rightLowerCell);
                rightLowerCell.addNeighbour(currentCell);
            }
        }


    }



}