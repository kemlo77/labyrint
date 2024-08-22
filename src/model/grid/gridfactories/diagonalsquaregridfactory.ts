import { Coordinate } from '../../coordinate';
import { downUnitVector, leftUnitVector, rightUnitVector, upRightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { FramedGridFactory } from './framedgridfactory';
import { RectangularGridProperties } from './rectangulargridproperties';

export class DiagonalSquareGridFactory extends FramedGridFactory {

    createGrid(gridProperties: RectangularGridProperties): Grid {
        const cellGrid: Cell[][] = this.createTiltedSquareCellGrid(gridProperties);
        this.connectTiltedSquareCellsToNeighbourCells(cellGrid);

        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];

        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createTiltedSquareCellGrid(gridProperties: RectangularGridProperties): Cell[][] {

        const cellWidth: number = gridProperties.lengthOfEdgeSegments / Math.SQRT2;
        const diagonalLength: number = gridProperties.lengthOfEdgeSegments;
        const halfDiagonalLength: number = diagonalLength / 2;
        const numberOfColumns: number = gridProperties.numberOfHorizontalEdgeSegments * 2 - 1;
        const numberOfRows: number = gridProperties.numberOfVerticalEdgeSegments;
        const angle: number = gridProperties.angle;

        const createTopRowTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', angle + 45);
        const createLeftColumnTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', angle + 135);
        const createBottomRowTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', angle + 225);
        const createRightColumnTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', angle + 315);
        const createSquareCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'square', 45 + angle);

        const stepToLeftReferencePoint: Vector = upRightUnitVector.scale(cellWidth)
            .newRotatedVector(angle);
        const stepToRightReferencePoint: Vector =
            rightUnitVector.scale(diagonalLength * (gridProperties.numberOfHorizontalEdgeSegments - 1))
                .newRotatedVector(angle);
        const columnStep: Vector = rightUnitVector.scale(diagonalLength / 2)
            .newRotatedVector(angle);
        const rowStep: Vector = upUnitVector.scale(diagonalLength)
            .newRotatedVector(angle);
        const oddColumnExtraStep: Vector = upUnitVector.scale(halfDiagonalLength)
            .newRotatedVector(angle);
        const toLeftTriangleCenterStep: Vector = leftUnitVector.scale(halfDiagonalLength * 2 / 3)
            .newRotatedVector(angle);
        const toRightTriangleCenterStep: Vector = rightUnitVector.scale(halfDiagonalLength * 2 / 3)
            .newRotatedVector(angle);
        const toBottomTriangleCenterStep: Vector = downUnitVector.scale(halfDiagonalLength * 2 / 3)
            .newRotatedVector(angle);
        const toTopTriangleCenterStep: Vector = upUnitVector.scale(halfDiagonalLength * 2 / 3)
            .newRotatedVector(angle);

        const bottomLeftReferencePoint: Coordinate =
            gridProperties.insertionPoint.newRelativeCoordinate(stepToLeftReferencePoint);
        const bottomRightReferencePoint: Coordinate =
            bottomLeftReferencePoint.newRelativeCoordinate(stepToRightReferencePoint);

        const cellColumns: Cell[][] = [];

        //Left column of triangles
        const leftTriangleColumnStartPoint: Coordinate =
            bottomLeftReferencePoint.newRelativeCoordinate(toLeftTriangleCenterStep);
        const firstColumn: Cell[] =
            this.createSequenceOfCells(leftTriangleColumnStartPoint, rowStep, numberOfRows, createLeftColumnTriangle);
        cellColumns.push(firstColumn);

        //Intermediate columns of squares and triangles
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const cellColumn: Cell[] = [];

            const evenColumn: boolean = columnIndex % 2 === 0;
            const oddColumn: boolean = columnIndex % 2 === 1;
            const columnStartPoint: Coordinate = bottomLeftReferencePoint
                .newRelativeCoordinate(columnStep.scale(columnIndex));

            if (evenColumn) {
                //Bottom triangle
                const bottomTriangleCenter: Coordinate = columnStartPoint
                    .newRelativeCoordinate(toBottomTriangleCenterStep);
                const bottomTriangleCell: Cell = createBottomRowTriangle(bottomTriangleCenter);
                cellColumn.push(bottomTriangleCell);

                //Squares
                const oddColumnStartPoint: Coordinate = columnStartPoint.newRelativeCoordinate(oddColumnExtraStep);
                const sequenceOfSquareCells: Cell[] =
                    this.createSequenceOfCells(oddColumnStartPoint, rowStep, numberOfRows - 1, createSquareCell);
                cellColumn.push(...sequenceOfSquareCells);

                //Top triangle
                const topTriangleCenter: Coordinate = columnStartPoint
                    .newRelativeCoordinate(rowStep.scale(numberOfRows - 1))
                    .newRelativeCoordinate(toTopTriangleCenterStep);
                const topTriangleCell: Cell = createTopRowTriangle(topTriangleCenter);
                cellColumn.push(topTriangleCell);


                cellColumns.push(cellColumn);

            }

            if (oddColumn) {
                //Squares
                const sequenceOfSquareCells: Cell[] =
                    this.createSequenceOfCells(columnStartPoint, rowStep, numberOfRows, createSquareCell);
                cellColumns.push(sequenceOfSquareCells);
            }

        }

        //Right column of triangles
        const rightTriangleColumnStartPoint: Coordinate =
            bottomRightReferencePoint.newRelativeCoordinate(toRightTriangleCenterStep);
        const rightColumn: Cell[] =
            this.createSequenceOfCells(rightTriangleColumnStartPoint, rowStep, numberOfRows, createRightColumnTriangle);
        cellColumns.push(rightColumn);

        return cellColumns;
    }

    private connectTiltedSquareCellsToNeighbourCells(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const onFirstColumn: boolean = columnIndex == 0;
                const notOnLastRow: boolean = rowIndex !== grid[columnIndex].length - 1;
                const notOnTheFirstRow: boolean = rowIndex !== 0;
                const onOddColumn: boolean = columnIndex % 2 === 1;
                const onEvenColumn: boolean = columnIndex % 2 === 0;
                const currentCell: Cell = grid[columnIndex][rowIndex];

                if (onFirstColumn) {
                    continue;
                }

                if (onOddColumn && notOnLastRow) {
                    const leftUpperCell: Cell = grid[columnIndex - 1][rowIndex];
                    currentCell.establishNeighbourRelationTo(leftUpperCell);
                }

                if (onOddColumn && notOnTheFirstRow) {
                    const leftLowerCell: Cell = grid[columnIndex - 1][rowIndex - 1];
                    currentCell.establishNeighbourRelationTo(leftLowerCell);
                }

                if (onEvenColumn) {
                    const leftUpperCell: Cell = grid[columnIndex - 1][rowIndex + 1];
                    const leftLowerCell: Cell = grid[columnIndex - 1][rowIndex];
                    currentCell.establishNeighbourRelationTo(leftUpperCell);
                    currentCell.establishNeighbourRelationTo(leftLowerCell);
                }

            }
        }
    }


}