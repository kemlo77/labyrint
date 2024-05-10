import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { CellCreator } from '../cell/celltypealiases';
import { UnframedGridFactory } from './unframedgridfactory';
import { downUnitVector, rightUnitVector, upUnitVector } from '../../unitvectors';
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
        const negativeRowStep: Vector = downUnitVector.scale(cellWidth);

        const createRegularCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'hexagonal', 90);
        const createTopHalfCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'half-hexagonal', 270);
        const createBottomHalfCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'half-hexagonal', 90);
        const createLeftSideCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'side-hexagonal', 90);
        const createRightSideCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'side-hexagonal', 270);
        const createUpRightQuarterCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'quarter-hexagonal', 270);
        const createDownRightQuarterCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'quarter-hexagonal-mirrored', 270);

        const firstCellCenter: Coordinate = new Coordinate(cellWidth, columnOffset);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const onOddColumn: boolean = columnIndex % 2 === 1;
            const onEvenColumn: boolean = !onOddColumn;
            const columnStartCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep.scale(columnIndex));
            const onFirstColumn: boolean = columnIndex === 0;
            const onLastColumn: boolean = columnIndex === numberOfColumns - 1;

            //Left column
            if (onFirstColumn) {
                const columnOfCells: Cell[] =
                    this.createSequenceOfCells(columnStartCenter, rowStep, numberOfRows, createLeftSideCell);
                cellColumns.push(columnOfCells);
                continue;
            }

            if (onEvenColumn && onLastColumn) {
                const columnOfCells: Cell[] =
                    this.createSequenceOfCells(columnStartCenter, rowStep, numberOfRows, createRightSideCell);
                cellColumns.push(columnOfCells);
                continue;
            }

            if (onEvenColumn) {
                const columnOfCells: Cell[] =
                    this.createSequenceOfCells(columnStartCenter, rowStep, numberOfRows, createRegularCell);
                cellColumns.push(columnOfCells);
            }

            if (onOddColumn && onLastColumn) {
                const columnOfCells: Cell[] = [];
                const oddColumnStartCenter: Coordinate = columnStartCenter.newRelativeCoordinate(oddColumnExtraRowStep);

                //bottom cell in column
                const bottomCellCenter: Coordinate = oddColumnStartCenter.newRelativeCoordinate(negativeRowStep);
                columnOfCells.push(createDownRightQuarterCell(bottomCellCenter));


                //intermediate cells in column
                const intermediateCellsInColumn: Cell[] =
                    this.createSequenceOfCells(oddColumnStartCenter, rowStep, numberOfRows - 1, createRightSideCell);
                columnOfCells.push(...intermediateCellsInColumn);

                //top cell in column
                const topColumnCenter: Coordinate =
                    oddColumnStartCenter.newRelativeCoordinate(rowStep.scale(numberOfRows - 1));
                columnOfCells.push(createUpRightQuarterCell(topColumnCenter));

                cellColumns.push(columnOfCells);
                continue;
            }

            if (onOddColumn) {
                const columnOfCells: Cell[] = [];
                const oddColumnStartCenter: Coordinate = columnStartCenter.newRelativeCoordinate(oddColumnExtraRowStep);

                //bottom cell in column
                const bottomCellCenter: Coordinate = oddColumnStartCenter.newRelativeCoordinate(negativeRowStep);
                columnOfCells.push(createBottomHalfCell(bottomCellCenter));


                //intermediate cells in column
                const intermediateCellsInColumn: Cell[] =
                    this.createSequenceOfCells(oddColumnStartCenter, rowStep, numberOfRows - 1, createRegularCell);
                columnOfCells.push(...intermediateCellsInColumn);

                //top cell in column
                const topColumnCenter: Coordinate =
                    oddColumnStartCenter.newRelativeCoordinate(rowStep.scale(numberOfRows - 1));
                columnOfCells.push(createTopHalfCell(topColumnCenter));

                cellColumns.push(columnOfCells);
            }
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

                if (onEvenColumn) {
                    const neighbourUpRight: Cell = grid[columnIndex + 1][rowIndex + 1];
                    currentCell.establishNeighbourRelationTo(neighbourUpRight);
                }

                if (onOddColumn && notOnFirstRow) {
                    const neighbourDownRight: Cell = grid[columnIndex + 1][rowIndex - 1];
                    currentCell.establishNeighbourRelationTo(neighbourDownRight);
                }
            }
        }
    }
}


