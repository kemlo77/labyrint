import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { FramedGridFactory } from './framedgridfactory';
import { GridProperties } from './gridproperties';

export class RunningBondGridFactory extends FramedGridFactory {


    createGrid(gridProperties: GridProperties): Grid {
        const cellMatrix: Cell[][] = this.createCellGrid(gridProperties);
        this.establishNeighbourRelationsInMatrix(cellMatrix);
        const startCell: Cell = cellMatrix[0][0];
        const endCell: Cell = cellMatrix[cellMatrix.length - 1][cellMatrix[0].length - 1];
        const cells: Cell[] = cellMatrix.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellGrid(gridProperties: GridProperties): Cell[][] {

        //Inline på dessa variabler?
        const cellWidth: number = gridProperties.edgeSegmentLength;
        const numberOfRows: number = gridProperties.verticalEdgeSegments;
        const numberOfColumns: number = gridProperties.horizontalEdgeSegments;

        const startOffsetX: number = cellWidth;
        const startOffsetY: number = cellWidth;
        const cellHeight: number = cellWidth * 2;
        const quarterHeight: number = cellHeight / 4;
        const cellMatrix: Cell[][] = [];
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square');
        const createRectangularCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'double-square-rectangle');

        cellMatrix.push(createFirstRowOfCells());
        for (let rowIndex: number = 1; rowIndex < numberOfRows; rowIndex++) {
            cellMatrix.push(createIntermediateRowOfCells(rowIndex));
        }
        cellMatrix.push(createLastRowOfCells());

        return MatrixOperations.transpose<Cell>(cellMatrix);

        function createFirstRowOfCells(): Cell[] {
            const firstRowOfCells: Cell[] = [];
            for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
                const evenColumn: boolean = columnIndex % 2 === 0;
                const xCoordinate: number = startOffsetX + cellWidth * columnIndex;
                const yAdjustment: number = evenColumn ? quarterHeight : 0;
                const yCoordinate: number = startOffsetY + yAdjustment;

                if (evenColumn) {
                    firstRowOfCells.push(createRectangularCell(new Coordinate(xCoordinate, yCoordinate)));
                } else {
                    firstRowOfCells.push(createSquareCell(new Coordinate(xCoordinate, yCoordinate)));
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

                intermediateRowOfCells.push(createRectangularCell(new Coordinate(xCoordinate, yCoordinate)));

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
                    lastRowOfCells.push(createSquareCell(new Coordinate(xCoordinate, yCoordinate)));
                } else {
                    lastRowOfCells.push(createRectangularCell(new Coordinate(xCoordinate, yCoordinate)));
                }
            }
            return lastRowOfCells;
        }

    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        this.establishNeighbourRelationsInRows(grid);
        this.establishNeighbourRelationsInColumns(grid);
        this.establishNeighbourRelationsForRemainingCells(grid);
    }

    private establishNeighbourRelationsForRemainingCells(grid: Cell[][]): void {
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