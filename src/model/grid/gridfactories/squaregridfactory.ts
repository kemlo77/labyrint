import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { FramedGridFactory } from './framedgridfactory';

import { GridProperties } from './gridproperties';


export class SquareGridFactory extends FramedGridFactory {

    createGrid(gridProperties: GridProperties): Grid {
        const cellMatrix: Cell[][] = this.createCellMatrix(gridProperties);
        this.establishNeighbourRelationsInMatrix(cellMatrix);
        const startCell: Cell = cellMatrix[0][0];
        const endCell: Cell = cellMatrix[cellMatrix.length - 1][cellMatrix[0].length - 1];
        const cells: Cell[] = cellMatrix.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(gridProperties: GridProperties): Cell[][] {

        const cellWidth: number = gridProperties.cellWidth; //TODO: remove this line?

        const stepDirectionToFirstCellCenter: Vector = new Vector(cellWidth / 2, cellWidth / 2);

        const angleAdjustedStepDirectionToFirstCellCenter: Vector =
            stepDirectionToFirstCellCenter.newRotatedVector(gridProperties.angle);
        const firstCellCenter: Coordinate =
            gridProperties.insertionPoint.newRelativeCoordinate(angleAdjustedStepDirectionToFirstCellCenter, 1);

        const defaultColumnStep: Vector = Vector.rightUnitVector.scale(cellWidth);
        const defaultRowStep: Vector = Vector.downUnitVector.scale(cellWidth);
        const angleAdjustedColumnStep: Vector = defaultColumnStep.newRotatedVector(gridProperties.angle);
        const angleAdjustedRowStep: Vector = defaultRowStep.newRotatedVector(gridProperties.angle);
        const createRotatedSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', gridProperties.angle);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < gridProperties.horizontalEdgeSegments; columnIndex++) {
            const columnStartCenter: Coordinate =
                firstCellCenter.newRelativeCoordinate(angleAdjustedColumnStep, columnIndex);
            const cellSequence: Cell[] =
                this.createSequenceOfCells(columnStartCenter, angleAdjustedRowStep, gridProperties.verticalEdgeSegments,
                    createRotatedSquareCell);
            cellColumns.push(cellSequence);
        }

        return cellColumns;
    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        this.establishNeighbourRelationsInRows(grid);
        this.establishNeighbourRelationsInColumns(grid);
    }

}