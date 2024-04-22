import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class DiagonalSquareVariantFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellMatrix: Cell[][] = this.createCellMatrix(numberOfColumns, numberOfRows, cellWidth);
        this.establishNeighbourRelationsInMatrix(cellMatrix);
        const startCell: Cell = cellMatrix[0][0];
        const endCell: Cell = cellMatrix[numberOfColumns - 1][numberOfRows - 1];
        const cells: Cell[] = cellMatrix.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        //TODO: vinkel och startpunkt borde vara input-parameter
        const halfDiagonal: number = numberOfColumns * cellWidth * Math.SQRT2 / 2;
        const insertionPoint: Coordinate = new Coordinate(halfDiagonal + cellWidth, cellWidth);
        const angle: number = 45;

        let stepDirectionToFirstCellCenter: Vector = new Vector(cellWidth / 2, cellWidth / 2);

        stepDirectionToFirstCellCenter = stepDirectionToFirstCellCenter.newRotatedVector(angle);
        const firstCellCenter: Coordinate = insertionPoint.newRelativeCoordinate(stepDirectionToFirstCellCenter, 1);

        const defaultColumnStep: Vector = Vector.rightUnitVector.scale(cellWidth);
        const defaultRowStep: Vector = Vector.downUnitVector.scale(cellWidth);
        const angleAdjustedColumnStep: Vector = defaultColumnStep.newRotatedVector(angle);
        const angleAdjustedRowStep: Vector = defaultRowStep.newRotatedVector(angle);
        const createRotatedSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', angle);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const columnStartCenter: Coordinate =
                firstCellCenter.newRelativeCoordinate(angleAdjustedColumnStep, columnIndex);
            const cellSequence: Cell[] =
                this.createSequenceOfCells(
                    columnStartCenter,
                    angleAdjustedRowStep,
                    numberOfRows,
                    createRotatedSquareCell
                );
            cellColumns.push(cellSequence);
        }

        return cellColumns;
    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        this.establishNeighbourRelationsInRows(grid);
        this.establishNeighbourRelationsInColumns(grid);
    }



}