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
        const rowOffset: number = cellWidth * Math.sqrt(3) / 2;

        const columnStep: Vector = rightUnitVector.scale(cellWidth);
        const oddRowExtraColumnStep: Vector = rightUnitVector.scale(cellWidth / 2);
        const rowStep: Vector = upUnitVector.scale(rowOffset);

        const createHexagonalCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'hexagonal');

        const firstCellCenter: Coordinate = new Coordinate(cellWidth, rowOffset);

        const cellRows: Cell[][] = [];
        for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
            const onOddRow: boolean = rowIndex % 2 === 1;
            let rowStartCellCenter: Coordinate = firstCellCenter.newRelativeCoordinate(rowStep.scale(rowIndex));
            if (onOddRow) {
                rowStartCellCenter = rowStartCellCenter.newRelativeCoordinate(oddRowExtraColumnStep);

            }
            const rowOfCells: Cell[] =
                this.createSequenceOfCells(rowStartCellCenter, columnStep, numberOfColumns, createHexagonalCell);
            cellRows.push(rowOfCells);
        }
        return cellRows;
    }

    private establishNeighbourRelationsInGrid(grid: Cell[][]): void {
        this.establishNeighbourRelationsInRows(grid);
        this.establishNeighbourRelationsInColumns(grid);
        this.establishNeighbourRelationsBetweenTheRest(grid);
    }

    private establishNeighbourRelationsBetweenTheRest(grid: Cell[][]): void {

        for (let rowIndex: number = 0; rowIndex < grid.length; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = grid[rowIndex][columnIndex];
                const onEvenRow: boolean = rowIndex % 2 === 0;
                const onOddRow: boolean = !onEvenRow;
                const onLastRow: boolean = rowIndex === grid.length - 1;
                const notOnLastColumn: boolean = columnIndex < grid[rowIndex].length - 1;
                const notOnFirstColumn: boolean = columnIndex > 0;

                if (onLastRow) {
                    continue;
                }

                if (onEvenRow && notOnFirstColumn) {
                    const neighbourUpLeft: Cell = grid[rowIndex + 1][columnIndex - 1];
                    currentCell.establishNeighbourRelationTo(neighbourUpLeft);
                }

                if (onOddRow && notOnLastColumn) {
                    const neighbourUpRight: Cell = grid[rowIndex + 1][columnIndex + 1];
                    currentCell.establishNeighbourRelationTo(neighbourUpRight);
                }
            }
        }
    }


}