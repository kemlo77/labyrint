import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class DiagonalSquareGridFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, diagonalCellWidth: number,
        insertionPoint: Coordinate): Grid {
        const cellWidth: number = diagonalCellWidth / Math.SQRT2;
        const cellGrid: Cell[][] =
            this.createTiltedSquareCellGrid(numberOfColumns, numberOfRows, cellWidth, insertionPoint);
        this.connectTiltedSquareCellsToNeighbourCells(cellGrid);

        const topLeftCell1: Cell = cellGrid[0][0];
        const topLeftCell2: Cell = cellGrid[1][0];

        const topRightCell1: Cell = cellGrid[cellGrid.length - 2][0];
        const topRightCell2: Cell = cellGrid[cellGrid.length - 1][0];

        const bottomLeftCell1: Cell = cellGrid[0][cellGrid[0].length - 1];
        const bottomLeftCell2: Cell = cellGrid[1][cellGrid[1].length - 1];

        const bottomRightCell1: Cell = cellGrid[cellGrid.length - 2][cellGrid[cellGrid.length - 2].length - 1];
        const bottomRightCell2: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];


        const topRowCells: Cell[] = cellGrid.map(row => row[0]).filter((cell, index) => index % 2 === 1);
        const bottomRowCells: Cell[] = cellGrid.map(row => row[row.length - 1])
            .filter((cell, index) => index % 2 === 1);
        const leftColumnCells: Cell[] = cellGrid[0];
        const rightColumnCells: Cell[] = cellGrid[cellGrid.length - 1];

        const newTopRow: Cell[] = this.createAndAttachTopRowTriangles(topRowCells);
        const newBottomRow: Cell[] = this.createAndAttachBottomRowTriangles(bottomRowCells);
        const newLeftColumn: Cell[] = this.createAndAttachLeftRowTriangles(leftColumnCells);
        const newRightColumn: Cell[] = this.createAndAttachRightRowTriangles(rightColumnCells);
        cellGrid.push(newTopRow);
        cellGrid.push(newBottomRow);
        cellGrid.unshift(newLeftColumn);
        cellGrid.push(newRightColumn);

        const newTopLeftCell: Cell = this.createAndAttachTopLeftCornerTriangle(topLeftCell1, topLeftCell2);
        const newTopRightCell: Cell = this.createAndAttachTopRightCornerTriangle(topRightCell1, topRightCell2);
        const newBottomLeftCell: Cell = this.createAndAttachBottomLeftCornerTriangle(bottomLeftCell1, bottomLeftCell2);
        const newBottomRightCell: Cell =
            this.createAndAttachBottomRightCornerTriangle(bottomRightCell1, bottomRightCell2);
        cellGrid.push([newTopLeftCell, newTopRightCell, newBottomLeftCell, newBottomRightCell]);

        const startCell: Cell = newTopLeftCell;
        const endCell: Cell = newBottomRightCell;

        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createTiltedSquareCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number,
        insertionPoint: Coordinate): Cell[][] {

        const diagonalLength: number = cellWidth * Math.SQRT2;
        const halfDiagonalLength: number = diagonalLength / 2;

        const firstCellCenter: Coordinate =
            new Coordinate(insertionPoint.x + diagonalLength / 2, insertionPoint.y + diagonalLength / 2);
        const columnStep: Vector = Vector.rightUnitVector.scale(halfDiagonalLength);
        const rowStep: Vector = Vector.downUnitVector.scale(diagonalLength);
        const oddColumnExtraStep: Vector = Vector.downUnitVector.scale(halfDiagonalLength);
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', 45);


        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns * 2 - 1; columnIndex++) {

            const evenColumn: boolean = columnIndex % 2 === 0;
            const columnStartPoint: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep, columnIndex);

            if (evenColumn) {
                const oddColumnStartPoint: Coordinate = columnStartPoint.newRelativeCoordinate(oddColumnExtraStep, 1);
                const cellSequence: Cell[] =
                    this.createSequenceOfCells(oddColumnStartPoint, rowStep, numberOfRows - 1, createSquareCell);
                cellColumns.push(cellSequence);

            } else {
                const cellSequence: Cell[] =
                    this.createSequenceOfCells(columnStartPoint, rowStep, numberOfRows, createSquareCell);
                cellColumns.push(cellSequence);

            }

        }
        return cellColumns;
    }

    private connectTiltedSquareCellsToNeighbourCells(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const evenColumn: boolean = columnIndex % 2 === 0;

                if (evenColumn) {
                    continue;
                }

                const notOnLastRow: boolean = rowIndex !== grid[columnIndex].length - 1;
                const notOnTheFirstRow: boolean = rowIndex !== 0;
                const currentCell: Cell = grid[columnIndex][rowIndex];

                if (notOnLastRow) {
                    const leftLowerCell: Cell = grid[columnIndex - 1][rowIndex];
                    const rightLowerCell: Cell = grid[columnIndex + 1][rowIndex];
                    currentCell.establishNeighbourRelationTo(leftLowerCell);
                    currentCell.establishNeighbourRelationTo(rightLowerCell);

                }

                if (notOnTheFirstRow) {
                    const leftUpperCell: Cell = grid[columnIndex - 1][rowIndex - 1];
                    const rightUpperCell: Cell = grid[columnIndex + 1][rowIndex - 1];
                    currentCell.establishNeighbourRelationTo(leftUpperCell);
                    currentCell.establishNeighbourRelationTo(rightUpperCell);
                }

            }
        }
    }


    private createAndAttachTopLeftCornerTriangle(firstCell: Cell, secondCell: Cell): Cell {
        const cornerDirection: Vector = Vector.upLeftUnitVector;
        return this.createAndAttachCornerTriangle(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachTopRightCornerTriangle(firstCell: Cell, secondCell: Cell): Cell {
        const cornerDirection: Vector = Vector.upRightUnitVector;
        return this.createAndAttachCornerTriangle(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachBottomLeftCornerTriangle(firstCell: Cell, secondCell: Cell): Cell {
        const cornerDirection: Vector = Vector.downLeftUnitVector;
        return this.createAndAttachCornerTriangle(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachBottomRightCornerTriangle(firstCell: Cell, secondCell: Cell): Cell {
        const cornerDirection: Vector = Vector.downRightUnitVector;
        return this.createAndAttachCornerTriangle(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachCornerTriangle(firstCell: Cell, secondCell: Cell, cornerDirection: Vector): Cell {
        const triangleDefaultDirection: Vector = Vector.upLeftUnitVector;
        const angleDifference: number = triangleDefaultDirection.hasAngleTo(cornerDirection);
        const commonCorners: Coordinate[] = firstCell.commonCornersWith(secondCell);
        const insertionCorner: Coordinate =
            this.coordinateFurthestAlongVector(cornerDirection, commonCorners[0], commonCorners[1]);
        const oldCellsWidth: number = firstCell.borders[0].length;
        const newCellWidth: number = oldCellsWidth * Math.SQRT2;


        const cellCenter: Coordinate =
            insertionCorner.newRelativeCoordinate(cornerDirection, oldCellsWidth / 3);

        const newCell: Cell = CellFactory.createCell(
            cellCenter,
            newCellWidth,
            'isosceles-right-triangular-with-split-hypotenuse',
            angleDifference
        );

        newCell.establishNeighbourRelationTo(firstCell);
        newCell.establishNeighbourRelationTo(secondCell);
        return newCell;
    }

    private coordinateFurthestAlongVector(vector: Vector, coord1: Coordinate, coord2: Coordinate): Coordinate {
        const distance: number = coord1.distanceTo(coord2);
        const newCoordinateAlongVector: Coordinate = coord1.newRelativeCoordinate(vector, distance);
        if (newCoordinateAlongVector.distanceTo(coord2) < 1) {
            return coord2;
        }
        return coord1;
    }



    private createAndAttachTopRowTriangles(cellsConnectingTo: Cell[]): Cell[] {
        const insertionDirection: Vector = Vector.upUnitVector;
        return this.generateAndAttachTriangles(cellsConnectingTo, insertionDirection);
    }

    private createAndAttachBottomRowTriangles(cellsConnectingTo: Cell[]): Cell[] {
        const insertionDirection: Vector = Vector.downUnitVector;
        return this.generateAndAttachTriangles(cellsConnectingTo, insertionDirection);
    }

    private createAndAttachLeftRowTriangles(cellsConnectingTo: Cell[]): Cell[] {
        const insertionDirection: Vector = Vector.leftUnitVector;
        return this.generateAndAttachTriangles(cellsConnectingTo, insertionDirection);
    }

    private createAndAttachRightRowTriangles(cellsConnectingTo: Cell[]): Cell[] {
        const insertionDirection: Vector = Vector.rightUnitVector;
        return this.generateAndAttachTriangles(cellsConnectingTo, insertionDirection);
    }

    private generateAndAttachTriangles(cellsConnectingTo: Cell[], insertionDirection: Vector): Cell[] {
        const triangleDefaultDirection: Vector = Vector.downRightUnitVector;
        const angleDiff: number = triangleDefaultDirection.hasAngleTo(insertionDirection);
        const triangleCellWidth: number = cellsConnectingTo[0].borders[0].length;

        const generatedCells: Cell[] = [];
        for (let i: number = 0; i < cellsConnectingTo.length; i++) {
            const isOnLastCell: boolean = i === cellsConnectingTo.length - 1;
            if (isOnLastCell) {
                continue;
            }
            const cell1: Cell = cellsConnectingTo[i];
            const cell2: Cell = cellsConnectingTo[i + 1];
            const commonCellsCorners: Coordinate[] = cell1.commonCornersWith(cell2);
            const insertionCorner: Coordinate = commonCellsCorners[0];
            const distanceToTriangleCenter: number = triangleCellWidth * Math.SQRT2 / 3;
            const triangleCenter: Coordinate =
                insertionCorner.newRelativeCoordinate(insertionDirection, distanceToTriangleCenter);
            const newCell: Cell =
                CellFactory.createCell(triangleCenter, triangleCellWidth, 'isosceles-right-triangular', angleDiff);
            newCell.establishNeighbourRelationTo(cell1);
            newCell.establishNeighbourRelationTo(cell2);
            generatedCells.push(newCell);
        }
        return generatedCells;
    }







}