import { Coordinate } from '../../../coordinate';
import { Cell } from '../../cell/cell';
import { CellFactory } from '../../cell/cellfactory';
import { Grid } from '../../grid';
import { CellCreator } from '../../cell/celltypealiases';
import { downUnitVector, leftUnitVector, rightUnitVector, upUnitVector } from '../../../unitvectors';
import { Vector } from '../../../vector';
import { RectangularGridFactory } from './rectangulargridfactory.interface';
import { RectangularGridProperties } from './rectangulargridproperties';
import { GridFactory } from '../gridfactory';

export class HexagonsGridFactory extends GridFactory implements RectangularGridFactory {

    createGrid(gridProperties: RectangularGridProperties): Grid {
        const cellGrid: Cell[][] = this.createCellMatrix(gridProperties);
        this.establishNeighbourRelationsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(gridProperties: RectangularGridProperties): Cell[][] {

        const cellWidth: number = gridProperties.lengthOfEdgeSegments;
        const eigthOfCellHeight: number = cellWidth / Math.sqrt(3) / 4;
        const numberOfRows: number = gridProperties.numberOfVerticalEdgeSegments;
        const numberOfColumns: number = gridProperties.numberOfHorizontalEdgeSegments;
        const angle: number = gridProperties.angle;

        const columnOffset: number = cellWidth * Math.sqrt(3) / 2;

        const columnStep: Vector = rightUnitVector.scale(columnOffset).newRotatedVector(angle);
        const leftColumnAdjustmentStep: Vector = rightUnitVector.scale(eigthOfCellHeight).newRotatedVector(angle);
        const rightColumnAdjustmentStep: Vector = leftUnitVector.scale(eigthOfCellHeight).newRotatedVector(angle);
        const oddColumnExtraRowStep: Vector = upUnitVector.scale(cellWidth / 2).newRotatedVector(angle);
        const rowStep: Vector = upUnitVector.scale(cellWidth).newRotatedVector(angle);
        const quarterRowStep: Vector = upUnitVector.scale(cellWidth / 4).newRotatedVector(angle);
        const negativeQuarterRowStep: Vector = downUnitVector.scale(cellWidth / 4).newRotatedVector(angle);
        const halfRowStep: Vector = upUnitVector.scale(cellWidth / 2).newRotatedVector(angle);
        const negativeRowStep: Vector = downUnitVector.scale(cellWidth).newRotatedVector(angle);

        const createRegularCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'hexagonal', angle + 90);
        const createTopHalfCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'right-half-hexagonal', angle + 270);
        const createBottomHalfCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'right-half-hexagonal', angle + 90);
        const createLeftSideCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'bottom-half-hexagonal', angle + 90);
        const createRightSideCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'bottom-half-hexagonal', angle + 270);
        const createUpRightQuarterCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'bottom-right-quarter-hexagonal', angle + 270);
        const createDownRightQuarterCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'bottom-left-quarter-hexagonal', angle + 270);

        const firstCellCenter: Coordinate = gridProperties.insertionPoint.newRelativeCoordinate(halfRowStep);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const onOddColumn: boolean = columnIndex % 2 === 1;
            const onEvenColumn: boolean = !onOddColumn;
            const onFirstColumn: boolean = columnIndex === 0;
            const onLastColumn: boolean = columnIndex === numberOfColumns - 1;

            const columnStartCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep.scale(columnIndex));


            if (onFirstColumn) {
                const firstColumnStartCenter: Coordinate =
                    columnStartCenter.newRelativeCoordinate(leftColumnAdjustmentStep);
                const columnOfCells: Cell[] =
                    this.createSequenceOfCells(firstColumnStartCenter, rowStep, numberOfRows, createLeftSideCell);
                cellColumns.push(columnOfCells);
                continue;
            }

            if (onEvenColumn && onLastColumn) {
                const evenLastColumnStartCenter: Coordinate =
                    columnStartCenter.newRelativeCoordinate(rightColumnAdjustmentStep);
                const columnOfCells: Cell[] =
                    this.createSequenceOfCells(evenLastColumnStartCenter, rowStep, numberOfRows, createRightSideCell);
                cellColumns.push(columnOfCells);
                continue;
            }

            if (onOddColumn && onLastColumn) {
                const oddColumnStartCenter: Coordinate = columnStartCenter.newRelativeCoordinate(oddColumnExtraRowStep)
                    .newRelativeCoordinate(rightColumnAdjustmentStep);
                const bottomCellCenter: Coordinate = oddColumnStartCenter.newRelativeCoordinate(negativeRowStep)
                    .newRelativeCoordinate(quarterRowStep);
                const topColumnCenter: Coordinate =
                    oddColumnStartCenter.newRelativeCoordinate(rowStep.scale(numberOfRows - 1))
                        .newRelativeCoordinate(negativeQuarterRowStep);

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
                const bottomCellCenter: Coordinate = oddColumnStartCenter.newRelativeCoordinate(negativeRowStep)
                    .newRelativeCoordinate(quarterRowStep);
                const topColumnCenter: Coordinate =
                    oddColumnStartCenter.newRelativeCoordinate(rowStep.scale(numberOfRows - 1))
                        .newRelativeCoordinate(negativeQuarterRowStep);

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


