import { Coordinate } from '../../../coordinate';
import { downUnitVector, leftUnitVector, rightUnitVector, upUnitVector } from '../../../unitvectors';
import { Vector } from '../../../vector';
import { Cell } from '../../cell/cell';
import { CellFactory } from '../../cell/cellfactory';
import { CellCreator } from '../../cell/celltypealiases';
import { Grid } from '../../grid';
import { GridFactory } from '../gridfactory';
import { RectangularGridFactory } from './rectangulargridfactory.interface';
import { RectangularGridProperties } from './rectangulargridproperties';


export class TrianglesGridFactory extends GridFactory implements RectangularGridFactory {

    createGrid(gridProperties: RectangularGridProperties): Grid {
        const cellGrid: Cell[][] = this.createCellMatrix(gridProperties);
        this.establishNeighbourRelationsInMatrix(cellGrid);

        const startCell: Cell = cellGrid[0][1];
        let endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];
        if (cellGrid.length % 2 === 0) {
            endCell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 2];
        }

        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }


    private createCellMatrix(gridProperties: RectangularGridProperties): Cell[][] {

        const cellWidth: number = gridProperties.lengthOfEdgeSegments;
        const numberOfRows: number = gridProperties.numberOfVerticalEdgeSegments * 2 + 1;
        const numberOfColumns: number = gridProperties.numberOfHorizontalEdgeSegments;
        const angle: number = gridProperties.angle;

        const cellHeight: number = cellWidth;

        const columnStep: Vector = rightUnitVector.scale(cellHeight).newRotatedVector(angle);
        const rowStep: Vector = upUnitVector.scale(cellWidth / 2).newRotatedVector(angle);
        const leftAdjustmentStep: Vector = leftUnitVector.scale(cellHeight / 6).newRotatedVector(angle);
        const rightAdjustmentStep: Vector = rightUnitVector.scale(cellHeight / 6).newRotatedVector(angle);
        const firstCellVerticalAdjustment: Vector = upUnitVector.scale(cellWidth / 6).newRotatedVector(angle);
        const firstCellHorizontalAdjustment: Vector = rightUnitVector.scale(cellHeight / 2).newRotatedVector(angle);
        const lastCellVerticalAdjustment: Vector = downUnitVector.scale(cellWidth / 6).newRotatedVector(angle);

        const createLeftPointingTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'triangular', angle + 90);
        const createRightPointingTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'triangular', angle + 270);
        const createLeftPointingBottomTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'left-half-triangular', angle + 270);
        const createLeftPointingTopTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'right-half-triangular', angle + 270);
        const createRightPointingBottomTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'right-half-triangular', angle + 90);
        const createRightPointingTopTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'left-half-triangular', angle + 90);

        const firstCellCenter: Coordinate = gridProperties.insertionPoint
            .newRelativeCoordinate(firstCellHorizontalAdjustment);

        const cellColumns: Cell[][] = [];

        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const columnStartCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep.scale(columnIndex));
            const columnOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const onFirstRow: boolean = rowIndex === 0;
                const onLastRow: boolean = rowIndex === numberOfRows - 1;

                let cellCenter: Coordinate = columnStartCenter.newRelativeCoordinate(rowStep.scale(rowIndex));
                if (this.cellPointsRight(rowIndex, columnIndex)) {
                    if (onFirstRow) {
                        cellCenter = cellCenter.newRelativeCoordinate(rightAdjustmentStep)
                            .newRelativeCoordinate(firstCellVerticalAdjustment);
                        columnOfCells.push(createRightPointingBottomTriangle(cellCenter));
                        continue;
                    }
                    if (onLastRow) {
                        cellCenter = cellCenter.newRelativeCoordinate(rightAdjustmentStep)
                            .newRelativeCoordinate(lastCellVerticalAdjustment);
                        columnOfCells.push(createRightPointingTopTriangle(cellCenter));
                        continue;
                    }
                    cellCenter = cellCenter.newRelativeCoordinate(rightAdjustmentStep);
                    columnOfCells.push(createLeftPointingTriangle(cellCenter));
                } else {

                    if (onFirstRow) {
                        cellCenter = cellCenter.newRelativeCoordinate(leftAdjustmentStep)
                            .newRelativeCoordinate(firstCellVerticalAdjustment);
                        columnOfCells.push(createLeftPointingBottomTriangle(cellCenter));
                        continue;
                    }
                    if (onLastRow) {
                        cellCenter = cellCenter.newRelativeCoordinate(leftAdjustmentStep)
                            .newRelativeCoordinate(lastCellVerticalAdjustment);
                        columnOfCells.push(createLeftPointingTopTriangle(cellCenter));
                        continue;
                    }
                    cellCenter = cellCenter.newRelativeCoordinate(leftAdjustmentStep);
                    columnOfCells.push(createRightPointingTriangle(cellCenter));
                }
            }

            cellColumns.push(columnOfCells);
        }

        return cellColumns;
    }

    private cellPointsRight(columnIndex: number, rowIndex: number): boolean {
        const evenRowIndex: boolean = rowIndex % 2 == 0;
        const evenColumnIndex: boolean = columnIndex % 2 == 0;
        return (evenRowIndex && evenColumnIndex) || (!evenRowIndex && !evenColumnIndex);
    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        this.establishNeighbourRelationsInColumns(grid);
        this.establishSomeNeighbourRelationsBetweenColumns(grid);
    }


    private establishSomeNeighbourRelationsBetweenColumns(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {

                const onLastColumn: boolean = columnIndex === grid.length - 1;
                if (onLastColumn) {
                    continue;
                }

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const neighbourCellToTheRight: Cell = grid[columnIndex + 1][rowIndex];
                if (currentCell.hasCommonBorderWith(neighbourCellToTheRight)) {
                    currentCell.establishNeighbourRelationTo(neighbourCellToTheRight);
                }
            }
        }
    }
}