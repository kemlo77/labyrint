import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class DiagonalSquareVariantFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const startOffsetX: number = cellWidth;
        const startOffsetY: number = cellWidth / 2 * (numberOfColumns + 1);
        const cellGrid: Cell[][] = [];

        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {

                const xCoordinate: number = startOffsetX + cellWidth * columnIndex / 2 + cellWidth * rowIndex / 2;
                const yCoordinate: number = startOffsetY - cellWidth * columnIndex / 2 + cellWidth * rowIndex / 2;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                rowOfCells.push(CellFactory.createCell(center, cellWidth, 'tilted-square'));
            }
            cellGrid.push(rowOfCells);
        }

        return cellGrid;
    }

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.interConnectCellsInRows(grid);
        this.interConnectCellsInColumns(grid);
    }



}