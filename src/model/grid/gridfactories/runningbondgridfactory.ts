import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class RunningBondGridFactory implements GridFactory {


    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[0].length - 1];

        return new Grid(cellGrid, startCell, endCell);
    }

    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const startOffsetX: number = cellWidth;
        const startOffsetY: number = cellWidth;
        const cellHeight: number = cellWidth * 2;
        const cellGrid: Cell[][] = [];

        //first row
        const firstRowOfCells: Cell[] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const xCoordinate: number = startOffsetX + cellWidth * columnIndex;

            if (columnIndex % 2 === 0) {
                const yCoordinate: number = startOffsetY + cellHeight / 4;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                const cell: Cell = CellFactory.createCell(center, cellWidth, 'double-square-rectangle');
                firstRowOfCells.push(cell);
            } else {
                const yCoordinate: number = startOffsetY;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                const cell: Cell = CellFactory.createCell(center, cellWidth, 'square');
                firstRowOfCells.push(cell);
            }
        }
        cellGrid.push(firstRowOfCells);

        //intermediate rows
        for (let rowIndex: number = 1; rowIndex < numberOfRows; rowIndex++) {
            const rowOfCells: Cell[] = [];
            for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {

                const xCoordinate: number = startOffsetX + cellWidth * columnIndex;
                if (columnIndex % 2 === 0) {
                    const yCoordinate: number = startOffsetY + cellHeight * rowIndex + cellHeight / 4;
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'double-square-rectangle'));
                } else {
                    const yCoordinate: number = startOffsetY + cellHeight * rowIndex - cellHeight / 4;
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'double-square-rectangle'));
                }

            }
            cellGrid.push(rowOfCells);
        }

        //last row
        const lastRowOfCells: Cell[] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const xCoordinate: number = startOffsetX + cellWidth * columnIndex;

            if (columnIndex % 2 === 0) {
                const yCoordinate: number = startOffsetY + cellHeight * numberOfRows;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                const cell: Cell = CellFactory.createCell(center, cellWidth, 'square');
                lastRowOfCells.push(cell);
            } else {
                const yCoordinate: number = startOffsetY + cellHeight * numberOfRows   - cellHeight / 4;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                const cell: Cell = CellFactory.createCell(center, cellWidth, 'double-square-rectangle');
                lastRowOfCells.push(cell);
            }
        }
        cellGrid.push(lastRowOfCells);

        return cellGrid;
    }

    private interconnectCellsInGrid(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const notOnTheLastRow: boolean = rowIndex !== grid[columnIndex].length - 1;
                const notOnTheLastColumn: boolean = columnIndex !== grid.length - 1;

                if (notOnTheLastRow) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const nextRowNeighbour: Cell = grid[columnIndex][rowIndex + 1];
                    cell.addNeighbour(nextRowNeighbour);
                    nextRowNeighbour.addNeighbour(cell);
                }

                if (notOnTheLastColumn) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const nextColumnNeighbour: Cell = grid[columnIndex + 1][rowIndex];
                    cell.addNeighbour(nextColumnNeighbour);
                    nextColumnNeighbour.addNeighbour(cell);
                }
            }
        }
    }
}