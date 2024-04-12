import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class RunningBondGridFactory extends GridFactory {


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
        const quarterHeight: number = cellHeight / 4;
        const cellGrid: Cell[][] = [];

        cellGrid.push(createFirstRowOfCells());
        for (let rowIndex: number = 1; rowIndex < numberOfRows; rowIndex++) {
            cellGrid.push(createIntermediateRowOfCells(rowIndex));
        }
        cellGrid.push(createLastRowOfCells());

        return MatrixOperations.transpose<Cell>(cellGrid);

        function createFirstRowOfCells(): Cell[] {
            const firstRowOfCells: Cell[] = [];
            for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
                const evenColumn: boolean = columnIndex % 2 === 0;
                const xCoordinate: number = startOffsetX + cellWidth * columnIndex;
                const yAdjustment: number = evenColumn ? quarterHeight : 0;
                const yCoordinate: number = startOffsetY + yAdjustment;

                if (evenColumn) {
                    firstRowOfCells.push(createRectangularCellAt(xCoordinate, yCoordinate));
                } else {
                    firstRowOfCells.push(createSquareCellAt(xCoordinate, yCoordinate));
                }
            }
            return firstRowOfCells;
        }

        function createIntermediateRowOfCells(rowIndex: number): Cell[] {
            const intermediateRowOfCells: Cell[] = [];
            for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
                const evenColumn: boolean = columnIndex % 2 === 0;
                const xCoordinate: number = startOffsetX + cellWidth * columnIndex;
                const yAdjustment: number = evenColumn ? quarterHeight : -quarterHeight;
                const yCoordinate: number = startOffsetY + cellHeight * rowIndex + yAdjustment;

                intermediateRowOfCells.push(createRectangularCellAt(xCoordinate, yCoordinate));

            }
            return intermediateRowOfCells;
        }

        function createLastRowOfCells(): Cell[] {
            const lastRowOfCells: Cell[] = [];
            for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
                const evenColumn: boolean = columnIndex % 2 === 0;
                const xCoordinate: number = startOffsetX + cellWidth * columnIndex;
                const yAdjustment: number = evenColumn ? 0 : -quarterHeight;
                const yCoordinate: number = startOffsetY + cellHeight * numberOfRows + yAdjustment;

                if (evenColumn) {
                    lastRowOfCells.push(createSquareCellAt(xCoordinate, yCoordinate));
                } else {
                    lastRowOfCells.push(createRectangularCellAt(xCoordinate, yCoordinate));
                }
            }
            return lastRowOfCells;
        }

        function createSquareCellAt(xCoordinate: number, yCoordinate: number): Cell {
            const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
            const squareCell: Cell = CellFactory.createCell(center, cellWidth, 'square');
            return squareCell;
        }

        function createRectangularCellAt(xCoordinate: number, yCoordinate: number): Cell {
            const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
            const rectangularCell: Cell = CellFactory.createCell(center, cellWidth, 'double-square-rectangle');
            return rectangularCell;
        }
    }

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.interConnectCellsInRows(grid);
        this.interConnectCellsInColumns(grid);
        this.interConnectTheRemainingCells(grid);
    }

    private interConnectTheRemainingCells(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const notOnTheLastColumn: boolean = columnIndex !== grid.length - 1;
                const onTheFirstRow: boolean = rowIndex === 0;
                const oddColumnIndex: boolean = columnIndex % 2 === 1;

                if (onTheFirstRow) {
                    continue;
                }

                if (oddColumnIndex) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const upperRowLeftNeighbour: Cell = grid[columnIndex - 1][rowIndex - 1];
                    cell.establishNeighbourRelationTo(upperRowLeftNeighbour);
                }

                if (oddColumnIndex && notOnTheLastColumn) {
                    const cell: Cell = grid[columnIndex][rowIndex];
                    const upperRowRightNeighbour: Cell = grid[columnIndex + 1][rowIndex - 1];
                    cell.establishNeighbourRelationTo(upperRowRightNeighbour);
                }

            }
        }
    }
}