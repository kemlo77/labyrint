import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';


export class SquareGridFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.interconnectCellsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[numberOfColumns - 1][numberOfRows - 1];
        return new Grid(cellGrid, startCell, endCell);
    }

    private createCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        //TODO: Should have a coordinate as input parameter do define where firstCellCenter should be
        const startOffsetX: number = cellWidth;
        const startOffsetY: number = cellWidth;
        const firstCellCenter: Coordinate = new Coordinate(startOffsetX, startOffsetY);

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

    private interconnectCellsInGrid(grid: Cell[][]): void {
        this.interConnectCellsInRows(grid);
        this.interConnectCellsInColumns(grid);
    }

}