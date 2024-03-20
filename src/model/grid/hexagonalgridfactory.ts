import { Cell } from './cell/cell';
import { Coordinate } from '../coordinate';
import { Grid } from './grid';
import { HexagonalCell } from './cell/hexagonalcell';
import { GridFactory } from './gridfactory';
import { MatrixOperations } from '../../service/matrixoperations';
import { CellAction, CellTest } from './cell/celltypealiases';

export class HexagonalGridFactory extends GridFactory {

    constructor() {
        super();
    }

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        startCell.visited = true;
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
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

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.connectCellsDiagonally(grid);
        this.connectCellsHorizontally(grid);
    }

    private connectCellsDiagonally(grid: Cell[][]): void {
        const cellWidth: number = grid[0][0].width;
        const transposedGrid: Cell[][] = MatrixOperations.transpose<Cell>(grid);
        for (let rowIndex: number = 0; rowIndex < transposedGrid.length; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const neighbourDistance: number = cellWidth * 1.01;
                const cellIsWithinNeighbouringDistance: CellTest =
                    (cell) => currentCell.center.distanceTo(cell.center) < neighbourDistance;
                const addCellAsNeighbour: CellAction = (cell) => currentCell.addNeighbour(cell);
                const notOnTheLastRow: boolean = rowIndex !== transposedGrid.length - 1;
                const notOnTheFirstRow: boolean = rowIndex !== 0;

                if (notOnTheLastRow) {
                    const cellsOnNextRow: Cell[] = transposedGrid[rowIndex + 1];
                    cellsOnNextRow
                        .filter(cellIsWithinNeighbouringDistance)
                        .forEach(addCellAsNeighbour);
                }

                if (notOnTheFirstRow) {
                    const cellsOnPreviousRow: Cell[] = transposedGrid[rowIndex - 1];
                    cellsOnPreviousRow
                        .filter(cellIsWithinNeighbouringDistance)
                        .forEach(addCellAsNeighbour);
                }
            }
        }
    }

    private connectCellsHorizontally(grid: Cell[][]): void {
        for (let columnIndex: number = 1; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const cell: Cell = grid[columnIndex][rowIndex];
                const neighbourCell: Cell = grid[columnIndex - 1][rowIndex];
                cell.addNeighbour(neighbourCell);
                neighbourCell.addNeighbour(cell);
            }
        }
    }

}