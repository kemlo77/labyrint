import { Coordinate } from '../../coordinate';
import { downRightUnitVector, downUnitVector, rightUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { FramedGridFactory } from './framedgridfactory';
import { GridProperties } from './gridproperties';

export class OctagonalGridFactory extends FramedGridFactory {

    createGrid(gridProperties: GridProperties): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(gridProperties);
        this.establishNeighbourRelationsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[0].length - 1];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellGrid(gridProperties: GridProperties): Cell[][] {
        const numberOfColumns: number = gridProperties.horizontalEdgeSegments;
        const numberOfRows: number = gridProperties.verticalEdgeSegments;
        const cellWidth: number = gridProperties.edgeSegmentLength;
        const angle: number = gridProperties.angle;

        const halfCellWidth: number = cellWidth / 2;
        const tiltedSquareCellDiagonalLength: number =
            cellWidth - this.sideLengthOfOctagonFromInradius(halfCellWidth);
        const tiltedSquareWidth: number = tiltedSquareCellDiagonalLength / Math.SQRT2;
        const halfTiltedSquareWidth: number = tiltedSquareWidth / 2;

        const stepDirectionToFirstCellCenter: Vector = downRightUnitVector.scale(halfCellWidth * Math.SQRT2)
            .newRotatedVector(angle);
        const columnStep: Vector = rightUnitVector.scale(cellWidth).newRotatedVector(angle);
        const rowStep: Vector = downUnitVector.scale(cellWidth).newRotatedVector(angle);
        const stepFromOctagonCenterToTiltedSquareCenter: Vector =
            downRightUnitVector.scale(halfCellWidth + halfTiltedSquareWidth).newRotatedVector(angle);

        const firstCellCenter: Coordinate =
            gridProperties.insertionPoint.newRelativeCoordinate(stepDirectionToFirstCellCenter);

        const createOctagonalCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'octagonal', angle);
        const createLeftHalfOctagonalCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'semi-octagonal-semi-square', angle);
        const createToptHalfOctagonalCell: CellCreator = (center: Coordinate) => CellFactory
            .createCell(center, cellWidth, 'semi-octagonal-semi-square', angle + 270);
        const createRightHalfOctagonalCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'semi-octagonal-semi-square', angle + 180);
        const createBottomtHalfOctagonalCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'semi-octagonal-semi-square', angle + 90);
        const createChamferedSquareQ1Cell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle - 90);
        const createChamferedSquareQ2Cell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle);
        const createChamferedSquareQ3Cell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle + 90);
        const createChamferedSquareQ4Cell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle + 180);
        const createTiltedSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, tiltedSquareWidth, 'square', angle - 45);
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', angle);

        if (gridProperties.verticalEdgeSegments === 1) {
            const rowOfCells: Cell[] = this.createSequenceOfCells(
                firstCellCenter,
                columnStep,
                gridProperties.horizontalEdgeSegments,
                createSquareCell
            );
            return [rowOfCells];
        }

        if (gridProperties.horizontalEdgeSegments === 1) {
            const columnOfCells: Cell[] = this.createSequenceOfCells(
                firstCellCenter,
                rowStep,
                gridProperties.verticalEdgeSegments,
                createSquareCell
            );
            return [columnOfCells];
        }


        const cellColumns: Cell[][] = [];

        // first column
        const firstColumn: Cell[] = [];
        const q2CornerCell: Cell = createChamferedSquareQ2Cell(firstCellCenter);
        firstColumn.push(q2CornerCell);

        const leftColumnSecondCellCenter: Coordinate = firstCellCenter.newRelativeCoordinate(rowStep);
        const leftColumnOfCells: Cell[] = this.createSequenceOfCells(
            leftColumnSecondCellCenter,
            rowStep,
            numberOfRows - 2,
            createLeftHalfOctagonalCell
        );
        firstColumn.push(...leftColumnOfCells);

        const q3CornerCellCenter: Coordinate = leftColumnSecondCellCenter
            .newRelativeCoordinate(rowStep.scale(numberOfRows - 2));
        const q3CornerCell: Cell = createChamferedSquareQ3Cell(q3CornerCellCenter);
        firstColumn.push(q3CornerCell);

        cellColumns.push(firstColumn);


        // intermediate columns
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const notOnFirstColumn: boolean = columnIndex !== 0;
            const notOnLastColumn: boolean = columnIndex !== numberOfColumns - 1;
            const firstOctagonalCellCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep, columnIndex);
            const fistTiltedSquareCellCenter: Coordinate = firstOctagonalCellCenter
                .newRelativeCoordinate(stepFromOctagonCenterToTiltedSquareCenter);


            if (notOnFirstColumn && notOnLastColumn) {
                const intermediateColumn: Cell[] = [];
                const topCell: Cell = createToptHalfOctagonalCell(firstOctagonalCellCenter);
                intermediateColumn.push(topCell);
                const intermediateColumnSecondCellCenter: Coordinate =
                    firstOctagonalCellCenter.newRelativeCoordinate(rowStep);
                const octagonalCellSequence: Cell[] =
                    this.createSequenceOfCells(
                        intermediateColumnSecondCellCenter,
                        rowStep,
                        numberOfRows - 2,
                        createOctagonalCell
                    );
                intermediateColumn.push(...octagonalCellSequence);
                const bottomCellCenter: Coordinate = firstOctagonalCellCenter
                    .newRelativeCoordinate(rowStep.scale(numberOfRows - 1));
                const bottomCell: Cell = createBottomtHalfOctagonalCell(bottomCellCenter);
                intermediateColumn.push(bottomCell);


                cellColumns.push(intermediateColumn);
            }

            if (notOnLastColumn) {
                const tiltedSquareCellSequence: Cell[] =
                    this.createSequenceOfCells(
                        fistTiltedSquareCellCenter,
                        rowStep,
                        numberOfRows - 1,
                        createTiltedSquareCell
                    );
                cellColumns.push(tiltedSquareCellSequence);
            }


        }
        // last column
        const lastColumn: Cell[] = [];
        const lastColumnFirstCellCenter: Coordinate =
            firstCellCenter.newRelativeCoordinate(columnStep, numberOfColumns - 1);
        const q1CornerCell: Cell = createChamferedSquareQ1Cell(lastColumnFirstCellCenter);
        lastColumn.push(q1CornerCell);

        const rightColumnSecondCellCenter: Coordinate = lastColumnFirstCellCenter.newRelativeCoordinate(rowStep);
        const rightColumnOfCells: Cell[] = this.createSequenceOfCells(
            rightColumnSecondCellCenter,
            rowStep,
            numberOfRows - 2,
            createRightHalfOctagonalCell
        );
        lastColumn.push(...rightColumnOfCells);

        const q4CornerCellCenter: Coordinate = rightColumnSecondCellCenter
            .newRelativeCoordinate(rowStep.scale(numberOfRows - 2));
        const q4CornerCell: Cell = createChamferedSquareQ4Cell(q4CornerCellCenter);
        lastColumn.push(q4CornerCell);

        cellColumns.push(lastColumn);

        return cellColumns;
    }

    private sideLengthOfOctagonFromInradius(inradius: number): number {
        return inradius * 2 / (1 + Math.SQRT2);
    }

    private establishNeighbourRelationsInGrid(grid: Cell[][]): void {
        this.establishNeighbourRelationsBetweenOctagons(grid);
        this.establishNeighbourRelationsToFromTiltedSquareCells(grid);

    }

    private establishNeighbourRelationsBetweenOctagons(grid: Cell[][]): void {
        const octagonalCells: Cell[][] = grid.filter((_, index) => index % 2 === 0);
        this.establishNeighbourRelationsInColumns(octagonalCells);
        this.establishNeighbourRelationsInRows(octagonalCells);
    }

    private establishNeighbourRelationsToFromTiltedSquareCells(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {

                const onColumnWithOctagonalCells: boolean = columnIndex % 2 === 0;

                if (onColumnWithOctagonalCells) {
                    continue;
                }

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const neighbourUpLeft: Cell = grid[columnIndex - 1][rowIndex];
                const neighbourUpRight: Cell = grid[columnIndex + 1][rowIndex];
                const neighbourDownLeft: Cell = grid[columnIndex - 1][rowIndex + 1];
                const neighbourDownRight: Cell = grid[columnIndex + 1][rowIndex + 1];

                currentCell.establishNeighbourRelationTo(neighbourUpLeft);
                currentCell.establishNeighbourRelationTo(neighbourUpRight);
                currentCell.establishNeighbourRelationTo(neighbourDownLeft);
                currentCell.establishNeighbourRelationTo(neighbourDownRight);

            }
        }
    }

}