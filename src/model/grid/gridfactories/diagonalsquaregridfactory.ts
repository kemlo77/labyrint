import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { FramedGridFactory } from './framedgridfactory';
import { GridProperties } from './gridproperties';

export class DiagonalSquareGridFactory extends FramedGridFactory {

    createGrid(gridProperties: GridProperties): Grid {
        const cellGrid: Cell[][] = this.createTiltedSquareCellGrid(gridProperties);
        this.connectTiltedSquareCellsToNeighbourCells(cellGrid);

        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];

        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createTiltedSquareCellGrid(gridProperties: GridProperties): Cell[][] {

        const cellWidth: number = gridProperties.edgeSegmentLength / Math.SQRT2;
        const diagonalLength: number = gridProperties.edgeSegmentLength;
        const halfDiagonalLength: number = diagonalLength / 2;
        const numberOfColumns: number = gridProperties.horizontalEdgeSegments * 2 - 1;
        const numberOfRows: number = gridProperties.verticalEdgeSegments;
        const angle: number = - gridProperties.angle;

        const createBottomRowTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', 45 + angle);
        const createLeftColumnTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', 135 + angle);
        const createTopRowTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', 225 + angle);
        const createRightColumnTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'isosceles-right-triangular', 315 + angle);
        const createSquareCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'square', 45 + angle);

        const stepToLeftReferencePoint: Vector = Vector.downRightUnitVector.scale(cellWidth)
            .newRotatedVector(angle);
        const stepToRightReferencePoint: Vector =
            Vector.rightUnitVector.scale(diagonalLength * (gridProperties.horizontalEdgeSegments - 1))
                .newRotatedVector(angle);
        const columnStep: Vector =
            Vector.rightUnitVector.scale(diagonalLength / 2).newRotatedVector(angle);
        const rowStep: Vector =
            Vector.downUnitVector.scale(diagonalLength).newRotatedVector(angle);
        const oddColumnExtraStep: Vector =
            Vector.downUnitVector.scale(halfDiagonalLength).newRotatedVector(angle);
        const toLeftTriangleCenterStep: Vector =
            Vector.leftUnitVector.scale(halfDiagonalLength * 2 / 3).newRotatedVector(angle);
        const toRightTriangleCenterStep: Vector =
            Vector.rightUnitVector.scale(halfDiagonalLength * 2 / 3).newRotatedVector(angle);
        const toTopTriangleCenterStep: Vector =
            Vector.upUnitVector.scale(halfDiagonalLength * 2 / 3).newRotatedVector(angle);
        const toBottomTriangleCenterStep: Vector =
            Vector.downUnitVector.scale(halfDiagonalLength * 2 / 3).newRotatedVector(angle);

        const topLeftReferencePoint: Coordinate =
            gridProperties.insertionPoint.newRelativeCoordinate(stepToLeftReferencePoint);
        const topRightReferencePoint: Coordinate =
            topLeftReferencePoint.newRelativeCoordinate(stepToRightReferencePoint);

        const cellColumns: Cell[][] = [];

        //Left column of triangles
        const leftTriangleColumnStartPoint: Coordinate =
            topLeftReferencePoint.newRelativeCoordinate(toLeftTriangleCenterStep);
        const firstColumn: Cell[] =
            this.createSequenceOfCells(leftTriangleColumnStartPoint, rowStep, numberOfRows, createLeftColumnTriangle);
        cellColumns.push(firstColumn);

        //Intermediate columns of squares and triangles
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const cellColumn: Cell[] = [];

            const evenColumn: boolean = columnIndex % 2 === 0;
            const oddColumn: boolean = columnIndex % 2 === 1;
            const columnStartPoint: Coordinate = topLeftReferencePoint.newRelativeCoordinate(columnStep, columnIndex);

            if (evenColumn) {
                //Top triangle
                const topTriangleCenter: Coordinate = columnStartPoint.newRelativeCoordinate(toTopTriangleCenterStep);
                const topTriangleCell: Cell = createTopRowTriangle(topTriangleCenter);
                cellColumn.push(topTriangleCell);

                //Squares
                const oddColumnStartPoint: Coordinate = columnStartPoint.newRelativeCoordinate(oddColumnExtraStep);
                const sequenceOfSquareCells: Cell[] =
                    this.createSequenceOfCells(oddColumnStartPoint, rowStep, numberOfRows - 1, createSquareCell);
                cellColumn.push(...sequenceOfSquareCells);

                //Bottom triangle
                const bottomTriangleCenter: Coordinate = columnStartPoint
                    .newRelativeCoordinate(rowStep, numberOfRows - 1)
                    .newRelativeCoordinate(toBottomTriangleCenterStep);
                const bottomTriangleCell: Cell = createBottomRowTriangle(bottomTriangleCenter);
                cellColumn.push(bottomTriangleCell);


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
            topRightReferencePoint.newRelativeCoordinate(toRightTriangleCenterStep);
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
                    const leftLowerCell: Cell = grid[columnIndex - 1][rowIndex];
                    currentCell.establishNeighbourRelationTo(leftLowerCell);
                }

                if (onOddColumn && notOnTheFirstRow) {
                    const leftUpperCell: Cell = grid[columnIndex - 1][rowIndex - 1];
                    currentCell.establishNeighbourRelationTo(leftUpperCell);
                }

                if (onEvenColumn) {
                    const leftLowerCell: Cell = grid[columnIndex - 1][rowIndex + 1];
                    const leftUpperCell: Cell = grid[columnIndex - 1][rowIndex];
                    currentCell.establishNeighbourRelationTo(leftLowerCell);
                    currentCell.establishNeighbourRelationTo(leftUpperCell);
                }

            }
        }
    }


}