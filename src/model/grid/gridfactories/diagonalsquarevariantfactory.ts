import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
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
        //TODO: vinkel och startpunkt borde vara input-parameter
        const angle: number = 45;
        const firstCellCenter: Coordinate = new Coordinate(cellWidth * numberOfColumns * Math.SQRT2 / 2, cellWidth);

        const defaultXStepDirection: Vector = new Vector(cellWidth, 0);
        const defaultYStepDirection: Vector = new Vector(0, cellWidth);
        const angledXStepDirection: Vector = defaultXStepDirection.newRotatedVector(angle);        
        const angledYStepDirection: Vector = defaultYStepDirection.newRotatedVector(angle);
        const createTiltedSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', angle);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const columnStartCenter: Coordinate =
                firstCellCenter.newRelativeCoordinate(angledXStepDirection, columnIndex);
            const cellSequence: Cell[] =
            this.createSequenceOfCells(columnStartCenter, angledYStepDirection, numberOfRows, createTiltedSquareCell);
            cellColumns.push(cellSequence);
        }

        return cellColumns;
    }

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.interConnectCellsInRows(grid);
        this.interConnectCellsInColumns(grid);
    }



}