import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { leftUnitVector, rightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { FramedGridFactory } from './framedgridfactory';
import { RectangularGridProperties } from './rectangulargridproperties';

export class RunningBondGridFactory extends FramedGridFactory {


    createGrid(gridProperties: RectangularGridProperties): Grid {
        const cellMatrix: Cell[][] = this.createCellGrid(gridProperties);
        this.establishNeighbourRelationsInMatrix(cellMatrix);
        const startCell: Cell = cellMatrix[0][0];
        const endCell: Cell = cellMatrix[cellMatrix.length - 1][cellMatrix[cellMatrix.length - 1].length - 1];
        const cells: Cell[] = cellMatrix.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellGrid(gridProperties: RectangularGridProperties): Cell[][] {

        const cellWidth: number = gridProperties.lengthOfEdgeSegments;
        const halfCellWidth: number = cellWidth / 2;
        const doubleCellWidth: number = cellWidth * 2;
        const numberOfcolumns: number = gridProperties.numberOfHorizontalEdgeSegments;
        const numberOfRows: number = gridProperties.numberOfVerticalEdgeSegments;
        const angle: number = gridProperties.angle;

        const oneStepUp: Vector = upUnitVector.scale(cellWidth).newRotatedVector(angle);
        const aHalfStepUp: Vector = upUnitVector.scale(halfCellWidth).newRotatedVector(angle);
        const aHalfStepLeft: Vector = leftUnitVector.scale(halfCellWidth).newRotatedVector(angle);
        const aHalfStepRight: Vector = rightUnitVector.scale(halfCellWidth).newRotatedVector(angle);
        const oneStepRight: Vector = rightUnitVector.scale(cellWidth).newRotatedVector(angle);
        const twoStepsRight: Vector = rightUnitVector.scale(doubleCellWidth).newRotatedVector(angle);

        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', angle);
        const createRectangularCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'double-square-rectangle', 90 + angle);

        const firstCellCenter: Coordinate = gridProperties.insertionPoint
            .newRelativeCoordinate(aHalfStepUp)
            .newRelativeCoordinate(aHalfStepRight);

        const cellRows: Cell[][] = [];
        const evenRowNumberOfWideCells: number = Math.floor(numberOfcolumns / 2);
        const oddRowNumberOfWideCells: number =
            numberOfcolumns % 2 === 0 ? Math.floor((numberOfcolumns - 1) / 2) : Math.floor(numberOfcolumns / 2);

        for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
            const rowOfCells: Cell[] = [];
            const onEvenRow: boolean = rowIndex % 2 === 0;
            const rowStartPoint: Coordinate = firstCellCenter.newRelativeCoordinate(oneStepUp.scale(rowIndex));
            if (onEvenRow) {
                //rectangular cells
                const evenRowStartPoint: Coordinate = rowStartPoint.newRelativeCoordinate(aHalfStepRight);
                const rectangularCells: Cell[] = this.createSequenceOfCells(
                    evenRowStartPoint,
                    twoStepsRight,
                    evenRowNumberOfWideCells,
                    createRectangularCell
                );
                rowOfCells.push(...rectangularCells);
                //square cell
                if (numberOfcolumns % 2 === 1) {
                    const lastCellCenter: Coordinate = evenRowStartPoint
                        .newRelativeCoordinate(twoStepsRight.scale(evenRowNumberOfWideCells))
                        .newRelativeCoordinate(aHalfStepLeft);
                    const squareCell: Cell = createSquareCell(lastCellCenter);
                    rowOfCells.push(squareCell);
                }
            } else {
                //square cell
                const oddRowStartPoint: Coordinate = rowStartPoint;
                const firstSquareCellInRow: Cell = createSquareCell(oddRowStartPoint);
                rowOfCells.push(firstSquareCellInRow);

                //rectangular cells
                const rectangularCellsStartPoint: Coordinate = oddRowStartPoint
                    .newRelativeCoordinate(aHalfStepRight)
                    .newRelativeCoordinate(oneStepRight);
                const rectangularCells: Cell[] = this.createSequenceOfCells(
                    rectangularCellsStartPoint,
                    twoStepsRight,
                    oddRowNumberOfWideCells,
                    createRectangularCell
                );
                rowOfCells.push(...rectangularCells);

                //square cell
                if (numberOfcolumns % 2 === 0) {
                    const lastCellCenter: Coordinate = rectangularCellsStartPoint
                        .newRelativeCoordinate(twoStepsRight.scale(oddRowNumberOfWideCells))
                        .newRelativeCoordinate(aHalfStepLeft);
                    const lastSquareCellInRow: Cell = createSquareCell(lastCellCenter);
                    rowOfCells.push(lastSquareCellInRow);
                }
            }
            cellRows.push(rowOfCells);
        }

        return cellRows;



    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        const transposedGrid: Cell[][] = MatrixOperations.transpose(grid);
        this.establishNeighbourRelationsInColumns(grid);
        this.establishNeighbourRelationsInColumns(transposedGrid);
        this.establishNeighbourRelationsForRemainingCells(grid);
    }

    private establishNeighbourRelationsForRemainingCells(grid: Cell[][]): void {
        for (let rowIndex: number = 0; rowIndex < grid.length; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < grid[rowIndex].length; columnIndex++) {

                const onFirstColumn: boolean = columnIndex === 0;
                const onEvenRow: boolean = rowIndex % 2 === 0;
                const onLastRow: boolean = rowIndex === grid.length - 1;
                const cell: Cell = grid[rowIndex][columnIndex];

                if (onEvenRow || onFirstColumn) {
                    continue;
                }
                const lowerRowLeftNeighbour: Cell = grid[rowIndex - 1][columnIndex - 1];
                cell.establishNeighbourRelationTo(lowerRowLeftNeighbour);

                if (onLastRow) {
                    continue;
                }
                const upperRowLeftNeighbour: Cell = grid[rowIndex + 1][columnIndex - 1];
                cell.establishNeighbourRelationTo(upperRowLeftNeighbour);
            }
        }
    }
}