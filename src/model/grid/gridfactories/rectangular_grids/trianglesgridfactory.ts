import { Coordinate } from '../../../coordinate';
import { Vector } from '../../../vector/vector';
import { stepDown, stepLeft, stepRight, stepUp } from '../../../vector/vectorcreator';
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

        const columnStep: Vector = stepRight(cellHeight).newRotatedVector(angle);
        const rowStep: Vector = stepUp(cellWidth / 2).newRotatedVector(angle);
        const leftAdjustmentStep: Vector = stepLeft(cellHeight / 6).newRotatedVector(angle);
        const rightAdjustmentStep: Vector = stepRight(cellHeight / 6).newRotatedVector(angle);
        const firstCellVerticalAdjustment: Vector = stepUp(cellWidth / 6).newRotatedVector(angle);
        const firstCellHorizontalAdjustment: Vector = stepRight(cellHeight / 2).newRotatedVector(angle);
        const lastCellVerticalAdjustment: Vector = stepDown(cellWidth / 6).newRotatedVector(angle);

        const createLeftPointingTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(
                center.stepToNewCoordinate(stepRight(cellHeight / 3).then(stepDown(cellWidth / 2))), 
                cellWidth, 
                'triangular', 
                angle + 90
            );
        const createRightPointingTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(
                center.stepToNewCoordinate(stepLeft(cellHeight / 3).then(stepUp(cellWidth /2))), 
                cellWidth, 
                'triangular', 
                angle + 270
            );
        const createLeftPointingBottomTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(
                center.stepToNewCoordinate(firstCellVerticalAdjustment),
                cellWidth,
                'left-half-triangular',
                angle + 270
            );
        const createLeftPointingTopTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(
                center.stepToNewCoordinate(lastCellVerticalAdjustment),
                cellWidth,
                'right-half-triangular',
                angle + 270
            );
        const createRightPointingBottomTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(
                center.stepToNewCoordinate(firstCellVerticalAdjustment),
                cellWidth,
                'right-half-triangular',
                angle + 90
            );
        const createRightPointingTopTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(
                center.stepToNewCoordinate(lastCellVerticalAdjustment),
                cellWidth,
                'left-half-triangular',
                angle + 90
            );

        const firstCellCenter: Coordinate = gridProperties.insertionPoint
            .stepToNewCoordinate(firstCellHorizontalAdjustment);

        const cellColumns: Cell[][] = [];

        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const columnStartCenter: Coordinate = firstCellCenter.stepToNewCoordinate(columnStep.times(columnIndex));
            const columnOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
                const onFirstRow: boolean = rowIndex === 0;
                const onLastRow: boolean = rowIndex === numberOfRows - 1;


                if (this.cellPointsRight(rowIndex, columnIndex)) {
                    const cellCenter: Coordinate = columnStartCenter
                        .stepToNewCoordinate(rowStep.times(rowIndex).then(rightAdjustmentStep));
                    if (onFirstRow) {
                        columnOfCells.push(createRightPointingBottomTriangle(cellCenter));
                        continue;
                    }
                    if (onLastRow) {
                        columnOfCells.push(createRightPointingTopTriangle(cellCenter));
                        continue;
                    }
                    columnOfCells.push(createLeftPointingTriangle(cellCenter));
                } else {
                    const cellCenter: Coordinate = columnStartCenter
                        .stepToNewCoordinate(rowStep.times(rowIndex).then(leftAdjustmentStep));
                    if (onFirstRow) {
                        columnOfCells.push(createLeftPointingBottomTriangle(cellCenter));
                        continue;
                    }
                    if (onLastRow) {
                        columnOfCells.push(createLeftPointingTopTriangle(cellCenter));
                        continue;
                    }
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