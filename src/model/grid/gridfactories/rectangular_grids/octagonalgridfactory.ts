import { Coordinate } from '../../../coordinate';
import { rightUnitVector, upRightUnitVector, upUnitVector } from '../../../unitvectors';
import { Vector } from '../../../vector';
import { Cell } from '../../cell/cell';
import { CellFactory } from '../../cell/cellfactory';
import { CellCreator } from '../../cell/celltypealiases';
import { Grid } from '../../grid';
import { RectangularGridFactory } from './rectangulargridfactory.interface';
import { GridFactory } from '../gridfactory';
import { RectangularGridProperties } from './rectangulargridproperties';

export class OctagonalGridFactory extends GridFactory implements RectangularGridFactory {

    createGrid(gridProperties: RectangularGridProperties): Grid {
        const cellGrid: Cell[][] = this.createCellGrid(gridProperties);
        this.establishNeighbourRelationsInGrid(cellGrid);
        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[0].length - 1];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellGrid(gridProperties: RectangularGridProperties): Cell[][] {
        const numberOfColumns: number = gridProperties.numberOfHorizontalEdgeSegments;
        const numberOfRows: number = gridProperties.numberOfVerticalEdgeSegments;
        const cellWidth: number = gridProperties.lengthOfEdgeSegments;
        const angle: number = gridProperties.angle;

        const halfCellWidth: number = cellWidth / 2;
        const tiltedSquareCellDiagonalLength: number =
            cellWidth - this.sideLengthOfOctagonFromInradius(halfCellWidth);
        const tiltedSquareWidth: number = tiltedSquareCellDiagonalLength / Math.SQRT2;
        const halfTiltedSquareWidth: number = tiltedSquareWidth / 2;

        const stepDirectionToFirstCellCenter: Vector = upRightUnitVector.scale(halfCellWidth * Math.SQRT2)
            .newRotatedVector(angle);
        const columnStep: Vector = rightUnitVector.scale(cellWidth).newRotatedVector(angle);
        const rowStep: Vector = upUnitVector.scale(cellWidth).newRotatedVector(angle);
        const stepFromOctagonCenterToTiltedSquareCenter: Vector =
            upRightUnitVector.scale(halfCellWidth + halfTiltedSquareWidth).newRotatedVector(angle);

        const firstCellCenter: Coordinate =
            gridProperties.insertionPoint.newRelativeCoordinate(stepDirectionToFirstCellCenter);

        const createOctagonalCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'octagonal', angle);

        const createLeftHalfOctagonalCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'semi-octagonal-semi-square', angle);
        const createBottomHalfOctagonalCell: CellCreator = (center: Coordinate) => CellFactory
            .createCell(center, cellWidth, 'semi-octagonal-semi-square', angle + 90);
        const createRightHalfOctagonalCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'semi-octagonal-semi-square', angle + 180);
        const createToptHalfOctagonalCell: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'semi-octagonal-semi-square', angle + 270);
        const createLowerRightCornerCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle + 90);
        const createLowerLeftCornerCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle + 0);
        const createUpperLeftCornerCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle + 270);
        const createUpperRightCornerCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'chamfered-square', angle + 180);
        const createTiltedSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, tiltedSquareWidth, 'square', angle + 45);
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', angle);

        if (gridProperties.numberOfVerticalEdgeSegments === 1) {
            const rowOfCells: Cell[] = this.createSequenceOfCells(
                firstCellCenter,
                columnStep,
                gridProperties.numberOfHorizontalEdgeSegments,
                createSquareCell
            );
            return [rowOfCells];
        }

        if (gridProperties.numberOfHorizontalEdgeSegments === 1) {
            const columnOfCells: Cell[] = this.createSequenceOfCells(
                firstCellCenter,
                rowStep,
                gridProperties.numberOfVerticalEdgeSegments,
                createSquareCell
            );
            return [columnOfCells];
        }


        const cellColumns: Cell[][] = [];

        // first column
        const firstColumn: Cell[] = [];
        const lowerLeftCornerCell: Cell = createLowerLeftCornerCell(firstCellCenter);
        firstColumn.push(lowerLeftCornerCell);

        const leftColumnSecondCellCenter: Coordinate = firstCellCenter.newRelativeCoordinate(rowStep);
        const leftColumnOfCells: Cell[] = this.createSequenceOfCells(
            leftColumnSecondCellCenter,
            rowStep,
            numberOfRows - 2,
            createLeftHalfOctagonalCell
        );
        firstColumn.push(...leftColumnOfCells);

        const upperLeftCornerCellCenter: Coordinate = leftColumnSecondCellCenter
            .newRelativeCoordinate(rowStep.scale(numberOfRows - 2));
        const upperLeftCornerCell: Cell = createUpperLeftCornerCell(upperLeftCornerCellCenter);
        firstColumn.push(upperLeftCornerCell);

        cellColumns.push(firstColumn);


        // intermediate columns
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const notOnFirstColumn: boolean = columnIndex !== 0;
            const notOnLastColumn: boolean = columnIndex !== numberOfColumns - 1;
            const firstOctagonalCellCenter: Coordinate = firstCellCenter
                .newRelativeCoordinate(columnStep.scale(columnIndex));
            const fistTiltedSquareCellCenter: Coordinate = firstOctagonalCellCenter
                .newRelativeCoordinate(stepFromOctagonCenterToTiltedSquareCenter);


            if (notOnFirstColumn && notOnLastColumn) {
                const intermediateColumn: Cell[] = [];
                const bottomCell: Cell = createBottomHalfOctagonalCell(firstOctagonalCellCenter);
                intermediateColumn.push(bottomCell);
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
                const topCellCenter: Coordinate = firstOctagonalCellCenter
                    .newRelativeCoordinate(rowStep.scale(numberOfRows - 1));
                const topCell: Cell = createToptHalfOctagonalCell(topCellCenter);
                intermediateColumn.push(topCell);


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
            firstCellCenter.newRelativeCoordinate(columnStep.scale(numberOfColumns - 1));
        const lowerRightCornerCell: Cell = createLowerRightCornerCell(lastColumnFirstCellCenter);
        lastColumn.push(lowerRightCornerCell);

        const rightColumnSecondCellCenter: Coordinate = lastColumnFirstCellCenter.newRelativeCoordinate(rowStep);
        const rightColumnOfCells: Cell[] = this.createSequenceOfCells(
            rightColumnSecondCellCenter,
            rowStep,
            numberOfRows - 2,
            createRightHalfOctagonalCell
        );
        lastColumn.push(...rightColumnOfCells);

        const upperRightCornerCellCenter: Coordinate = rightColumnSecondCellCenter
            .newRelativeCoordinate(rowStep.scale(numberOfRows - 2));
        const upperRightCornerCell: Cell = createUpperRightCornerCell(upperRightCornerCellCenter);
        lastColumn.push(upperRightCornerCell);

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
                const neighbourDownLeft: Cell = grid[columnIndex - 1][rowIndex];
                const neighbourDownRight: Cell = grid[columnIndex + 1][rowIndex];
                const neighbourUpLeft: Cell = grid[columnIndex - 1][rowIndex + 1];
                const neighbourUpRight: Cell = grid[columnIndex + 1][rowIndex + 1];

                currentCell.establishNeighbourRelationTo(neighbourDownLeft);
                currentCell.establishNeighbourRelationTo(neighbourDownRight);
                currentCell.establishNeighbourRelationTo(neighbourUpLeft);
                currentCell.establishNeighbourRelationTo(neighbourUpRight);

            }
        }
    }

}