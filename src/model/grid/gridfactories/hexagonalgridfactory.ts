import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { CellCreator } from '../cell/celltypealiases';
import { UnframedGridFactory } from './unframedgridfactory';
import { rightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';

export class HexagonalGridFactory extends UnframedGridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellMatrix(numberOfColumns, numberOfRows, cellWidth);
        this.establishNeighbourRelationsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const columnOffset: number = cellWidth * Math.sqrt(3) / 2;

        const columnStep: Vector = rightUnitVector.scale(columnOffset);
        const oddColumnExtraRowStep: Vector = upUnitVector.scale(cellWidth / 2);
        const rowStep: Vector = upUnitVector.scale(cellWidth);

        const createHexagonalCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'hexagonal', 90);

        const firstCellCenter: Coordinate = new Coordinate(cellWidth, columnOffset);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const onOddColumn: boolean = columnIndex % 2 === 1;
            let columnStartCellCenter: Coordinate =
                firstCellCenter.newRelativeCoordinate(columnStep.scale(columnIndex));
            if (onOddColumn) {
                columnStartCellCenter = columnStartCellCenter.newRelativeCoordinate(oddColumnExtraRowStep);
            }
            const columnOfCells: Cell[] =
                this.createSequenceOfCells(columnStartCellCenter, rowStep, numberOfRows, createHexagonalCell);
            cellColumns.push(columnOfCells);
        }
        return cellColumns;
    }

    private establishNeighbourRelationsInGrid(grid: Cell[][]): void {
        this.establishNeighbourRelationsInRows(grid);
        this.establishNeighbourRelationsInColumns(grid);
        this.establishNeighbourRelationsBetweenTheRest(grid);
    }

    private establishNeighbourRelationsBetweenTheRest(grid: Cell[][]): void {


        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const currentCell: Cell = grid[columnIndex][rowIndex];
                const onEvenColumn: boolean = columnIndex % 2 === 0;
                const onOddColumn: boolean = !onEvenColumn;
                const onLastColumn: boolean = columnIndex === grid.length - 1;
                const notOnFirstRow: boolean = rowIndex > 0;
                const notOnLastRow: boolean = rowIndex < grid[columnIndex].length - 1;

                if (onLastColumn) {
                    continue;
                }

                if (onEvenColumn && notOnFirstRow) {
                    const neighbourDownRight: Cell = grid[columnIndex + 1][rowIndex - 1];
                    currentCell.establishNeighbourRelationTo(neighbourDownRight);
                }

                if (onOddColumn && notOnLastRow) {
                    const neighbourUpRight: Cell = grid[columnIndex + 1][rowIndex + 1];
                    currentCell.establishNeighbourRelationTo(neighbourUpRight);
                }
            }
        }
    }
}


