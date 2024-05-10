import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { CellCreator } from '../cell/celltypealiases';
import { downUnitVector, rightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
import { FramedGridFactory } from './framedgridfactory';
import { GridProperties } from './gridproperties';

export class HexagonalGridFactory extends FramedGridFactory {

    createGrid(gridProperties: GridProperties): Grid {
        const cellGrid: Cell[][] = this.createCellMatrix(gridProperties);
        this.establishNeighbourRelationsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(gridProperties: GridProperties): Cell[][] {

        const cellWidth: number = gridProperties.edgeSegmentLength;
        const numberOfRows: number = gridProperties.verticalEdgeSegments;
        const numberOfColumns: number = gridProperties.horizontalEdgeSegments;
        const angle: number = gridProperties.angle;

        const columnOffset: number = cellWidth * Math.sqrt(3) / 2;

        const columnStep: Vector = rightUnitVector.scale(columnOffset).newRotatedVector(angle);
        const oddColumnExtraRowStep: Vector = upUnitVector.scale(cellWidth / 2).newRotatedVector(angle);
        const rowStep: Vector = upUnitVector.scale(cellWidth).newRotatedVector(angle);
        const halfRowStep: Vector = upUnitVector.scale(cellWidth / 2).newRotatedVector(angle);
        const negativeRowStep: Vector = downUnitVector.scale(cellWidth).newRotatedVector(angle);

        const createRegularCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'hexagonal', angle + 90);
        const createTopHalfCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'half-hexagonal', angle + 270);
        const createBottomHalfCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'half-hexagonal', angle + 90);
        const createLeftSideCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'side-hexagonal', angle + 90);
        const createRightSideCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'side-hexagonal', angle + 270);
        const createUpRightQuarterCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'quarter-hexagonal', angle + 270);
        const createDownRightQuarterCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'quarter-hexagonal-mirrored', angle + 270);

        const firstCellCenter: Coordinate = gridProperties.insertionPoint.newRelativeCoordinate(halfRowStep);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const onOddColumn: boolean = columnIndex % 2 === 1;
            const onEvenColumn: boolean = !onOddColumn;
            const columnStartCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep.scale(columnIndex));
            const onFirstColumn: boolean = columnIndex === 0;
            const onLastColumn: boolean = columnIndex === numberOfColumns - 1;

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

            if (onOddColumn && onLastColumn) {
                const oddColumnStartCenter: Coordinate = columnStartCenter.newRelativeCoordinate(oddColumnExtraRowStep);
                const bottomCellCenter: Coordinate = oddColumnStartCenter.newRelativeCoordinate(negativeRowStep);
                const topColumnCenter: Coordinate =
                    oddColumnStartCenter.newRelativeCoordinate(rowStep.scale(numberOfRows - 1));

                const bottomCell: Cell = createDownRightQuarterCell(bottomCellCenter);
                const intermediateCellsInColumn: Cell[] =
                    this.createSequenceOfCells(oddColumnStartCenter, rowStep, numberOfRows - 1, createRightSideCell);
                const topCell: Cell = createUpRightQuarterCell(topColumnCenter);

                cellColumns.push([bottomCell, ...intermediateCellsInColumn, topCell]);
                continue;
            }

            if (onEvenColumn) {
                const columnOfCells: Cell[] =
                    this.createSequenceOfCells(columnStartCenter, rowStep, numberOfRows, createRegularCell);
                cellColumns.push(columnOfCells);
            }

            if (onOddColumn) {
                const oddColumnStartCenter: Coordinate = columnStartCenter.newRelativeCoordinate(oddColumnExtraRowStep);
                const bottomCellCenter: Coordinate = oddColumnStartCenter.newRelativeCoordinate(negativeRowStep);
                const topColumnCenter: Coordinate =
                    oddColumnStartCenter.newRelativeCoordinate(rowStep.scale(numberOfRows - 1));

                const bottomCell: Cell = createBottomHalfCell(bottomCellCenter);
                const intermediateCellsInColumn: Cell[] =
                    this.createSequenceOfCells(oddColumnStartCenter, rowStep, numberOfRows - 1, createRegularCell);
                const topCell: Cell = createTopHalfCell(topColumnCenter);

                cellColumns.push([bottomCell, ...intermediateCellsInColumn, topCell]);
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


