import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';


export class TriangularGridFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellMatrix: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectGrid(cellMatrix);

        const startCell: Cell = cellMatrix[0][0];
        startCell.visited = true;
        const endCell: Cell = cellMatrix[numberOfColumns - 1][numberOfRows - 1];

        return new Grid(cellMatrix, startCell, endCell);
    }


    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellHeight: number = Math.sqrt(3) / 2 * cellWidth;

        const grid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const xCoordinate: number = cellWidth * (1 + columnIndex / 2);

                if (this.cellHasPointyTop(columnIndex, rowIndex)) {
                    const yCoordinate: number = cellHeight * (1 + rowIndex);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'equilateral-triangular', 0));
                } else {
                    const yCoordinate: number = cellHeight * (4 / 3 + rowIndex);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'equilateral-triangular', 180));
                }
            }
            grid.push(rowOfCells);
        }
        return grid;
    }

    private cellHasPointyTop(columnIndex: number, rowIndex: number): boolean {
        return !this.cellHasFlatTop(columnIndex, rowIndex);
    }

    private cellHasFlatTop(columnIndex: number, rowIndex: number): boolean {
        const evenRowIndex: boolean = rowIndex % 2 == 0;
        const evenColumnIndex: boolean = columnIndex % 2 == 0;
        return (evenRowIndex && evenColumnIndex) || (!evenRowIndex && !evenColumnIndex);
    }

    private interconnectGrid(grid: Cell[][]): void {
        this.interConnectCellsInRows(grid);
        this.interconnectSomeCellsInColumns(grid);
    }


    private interconnectSomeCellsInColumns(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const notOnLastRow: boolean = rowIndex !== grid[columnIndex].length - 1;
                const cellHasFlatTop: boolean = this.cellHasFlatTop(columnIndex, rowIndex);

                if (notOnLastRow && cellHasFlatTop) {
                    const neighbourCellBelow: Cell = grid[columnIndex][rowIndex + 1];
                    currentCell.establishNeighbourRelationTo(neighbourCellBelow);
                }
            }
        }
    }
}