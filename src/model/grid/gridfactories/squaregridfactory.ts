import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';


export class SquareGridFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number, insertionPoint: Coordinate): Grid {
        const cellMatrix: Cell[][] = this.createCellMatrix(numberOfColumns, numberOfRows, cellWidth, insertionPoint);
        this.establishNeighbourRelationsInMatrix(cellMatrix);
        const startCell: Cell = cellMatrix[0][0];
        const endCell: Cell = cellMatrix[numberOfColumns - 1][numberOfRows - 1];
        const cells: Cell[] = cellMatrix.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(numberOfColumns: number, numberOfRows: number, cellWidth: number,
        insertionPoint: Coordinate): Cell[][] {
        const firstCellCenter: Coordinate =
            new Coordinate(insertionPoint.x + cellWidth / 2, insertionPoint.y + cellWidth / 2);

        const xDirectionStepVector: Vector = new Vector(cellWidth, 0);
        const yDirectionStepVector: Vector = new Vector(0, cellWidth);
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square');

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const columnStartCenter: Coordinate =
                firstCellCenter.newRelativeCoordinate(xDirectionStepVector, columnIndex);

            const cellSequence: Cell[] =
                this.createSequenceOfCells(columnStartCenter, yDirectionStepVector, numberOfRows, createSquareCell);
            cellColumns.push(cellSequence);
        }

        return cellColumns;
    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        this.establishNeighbourRelationsInRows(grid);
        this.establishNeighbourRelationsInColumns(grid);
    }

}