import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { downUnitVector, leftUnitVector, rightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
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

        const cellWidth: number = gridProperties.edgeSegmentLength;
        const numberOfcolumns: number = gridProperties.horizontalEdgeSegments;
        const numberOfRows: number = gridProperties.verticalEdgeSegments;

        const startOffsetX: number = cellWidth;
        const startOffsetY: number = cellWidth;
        const firstCellCenter: Coordinate = new Coordinate(startOffsetX, startOffsetY);
        const oneStepDown: Vector = downUnitVector.scale(cellWidth);
        const aHalfStepRight: Vector = rightUnitVector.scale(cellWidth / 2);
        const aHalfStepLeft: Vector = leftUnitVector.scale(cellWidth / 2);
        const twoStepsRight: Vector = rightUnitVector.scale(cellWidth * 2);

        const cellMatrix: Cell[][] = [];
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square');
        const createRectangularCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'double-square-rectangle', 90);

        cellMatrix.push(createFirstColumnOfCells());
        for (let columnIndex: number = 1; columnIndex < numberOfcolumns; columnIndex++) {
            cellMatrix.push(createIntermediateColumnOfCells(columnIndex));
        }
        cellMatrix.push(createLastColumnOfCells());

        return cellMatrix;

        function createFirstColumnOfCells(): Cell[] {
            const cellColumn: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const evenRow: boolean = rowIndex % 2 === 0;

                let center: Coordinate = firstCellCenter.newRelativeCoordinate(oneStepDown, rowIndex);

                if (evenRow) {
                    center = center.newRelativeCoordinate(aHalfStepRight);
                    cellColumn.push(createRectangularCell(center));
                } else {
                    cellColumn.push(createSquareCell(center));
                }
            }
            return cellColumn;
        }

        function createIntermediateColumnOfCells(columnIndex: number): Cell[] {
            const cellColumn: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const evenRow: boolean = rowIndex % 2 === 0;

                let center: Coordinate = new Coordinate(startOffsetX, startOffsetY)
                    .newRelativeCoordinate(oneStepDown, rowIndex)
                    .newRelativeCoordinate(twoStepsRight, columnIndex);

                if (evenRow) {
                    center = center.newRelativeCoordinate(aHalfStepRight);
                } else {
                    center = center.newRelativeCoordinate(aHalfStepLeft);
                }
                cellColumn.push(createRectangularCell(center));
            }
            return cellColumn;
        }

        function createLastColumnOfCells(): Cell[] {
            const cellColumn: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const evenRow: boolean = rowIndex % 2 === 0;

                let center: Coordinate = new Coordinate(startOffsetX, startOffsetY)
                    .newRelativeCoordinate(oneStepDown, rowIndex)
                    .newRelativeCoordinate(twoStepsRight, numberOfcolumns);

                if (evenRow) {
                    cellColumn.push(createSquareCell(center));
                } else {
                    center = center.newRelativeCoordinate(aHalfStepLeft);
                    cellColumn.push(createRectangularCell(center));
                }
            }
            return cellColumn;
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

                const evenRowIndex: boolean = rowIndex % 2 === 0;
                const onFirstColumn: boolean = columnIndex === 0;

                if (onFirstColumn || evenRowIndex) {
                    continue;
                }

                const cell: Cell = grid[columnIndex][rowIndex];
                const upperRowLeftNeighbour: Cell = grid[columnIndex - 1][rowIndex - 1];
                const lowerRowLeftNeighbour: Cell = grid[columnIndex - 1][rowIndex + 1];
                cell.establishNeighbourRelationTo(upperRowLeftNeighbour);
                cell.establishNeighbourRelationTo(lowerRowLeftNeighbour);
            }
        }
    }
}