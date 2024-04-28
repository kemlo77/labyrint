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
        const createTiltedSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, tiltedSquareWidth, 'square', angle - 45);

        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const onLastColumn: boolean = columnIndex === numberOfColumns - 1;

            const firstOctagonalCellCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep, columnIndex);
            const fistTiltedSquareCellCenter: Coordinate = firstOctagonalCellCenter
                .newRelativeCoordinate(stepFromOctagonCenterToTiltedSquareCenter);

            const octagonalCellSequence: Cell[] =
                this.createSequenceOfCells(firstOctagonalCellCenter, rowStep, numberOfRows, createOctagonalCell);
            cellColumns.push(octagonalCellSequence);

            if (onLastColumn) {
                continue;
            }

            const tiltedSquareCellSequence: Cell[] =
                this.createSequenceOfCells(
                    fistTiltedSquareCellCenter,
                    rowStep,
                    numberOfRows - 1,
                    createTiltedSquareCell
                );
            cellColumns.push(tiltedSquareCellSequence);


        }
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