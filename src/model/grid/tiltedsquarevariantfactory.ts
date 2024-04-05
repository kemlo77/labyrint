import { Coordinate } from '../coordinate';
import { Cell } from './cell/cell';
import { TiltedSquareCell } from './cell/tiltedsquarecell';
import { Grid } from './grid';
import { GridFactory } from './gridfactory';

export class TiltedSquareVariantFactory extends GridFactory {

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
        const startOffsetX: number = cellWidth;
        const startOffsetY: number = cellWidth / 2 * (numberOfColumns + 1);
        const cellGrid: Cell[][] = [];

        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {

                const xCoordinate: number = startOffsetX + cellWidth * columnIndex / 2 + cellWidth * rowIndex / 2;
                const yCoordinate: number = startOffsetY - cellWidth * columnIndex / 2 + cellWidth * rowIndex / 2;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                rowOfCells.push(new TiltedSquareCell(center, cellWidth));
            }
            cellGrid.push(rowOfCells);
        }

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