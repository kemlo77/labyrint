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
        //TODO: Hantera rotation
        //TODO: Hantera när antal rader är 1, eller antal kolumner är 1
        //TODO: Splitta upp hörnet
        //TODO: 

        const cellGrid: Cell[][] = this.createTiltedSquareCellGrid(gridProperties);
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

        const newTopLeftCells: Cell[] = this.createAndAttachTopLeftCornerTriangles(topLeftCell1, topLeftCell2);
        const newTopRightCells: Cell[] = this.createAndAttachTopRightCornerTriangles(topRightCell1, topRightCell2);
        const newBottomLeftCells: Cell[] = 
            this.createAndAttachBottomLeftCornerTriangles(bottomLeftCell1, bottomLeftCell2);
        const newBottomRightCells: Cell[] =
            this.createAndAttachBottomRightCornerTriangles(bottomRightCell1, bottomRightCell2);
        cellGrid.push([newTopLeftCells, newTopRightCells, newBottomLeftCells, newBottomRightCells].flat());

        const startCell: Cell = newTopLeftCells[0];
        const endCell: Cell = newBottomRightCells[0];

        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createTiltedSquareCellGrid(gridProperties: GridProperties): Cell[][] {

        //TODO: inline på dessa variabler?
        const cellWidth: number = gridProperties.cellWidth / Math.SQRT2;
        const diagonalLength: number = cellWidth * Math.SQRT2;
        const halfDiagonalLength: number = diagonalLength / 2;
        const numberOfColumns: number = gridProperties.horizontalEdgeSegments;
        const numberOfRows: number = gridProperties.verticalEdgeSegments;

        //TODO: skriv om med en funktion som tar in en vektor och en koordinat och returnerar en ny koordinat
        const firstCellCenter: Coordinate =
            new Coordinate(
                gridProperties.insertionPoint.x + diagonalLength / 2,
                gridProperties.insertionPoint.y + diagonalLength / 2
            );
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


    private createAndAttachTopLeftCornerTriangles(firstCell: Cell, secondCell: Cell): Cell[] {
        const cornerDirection: Vector = Vector.upLeftUnitVector;
        return this.createAndAttachCornerTriangles(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachTopRightCornerTriangles(firstCell: Cell, secondCell: Cell): Cell[] {
        const cornerDirection: Vector = Vector.upRightUnitVector;
        return this.createAndAttachCornerTriangles(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachBottomLeftCornerTriangles(firstCell: Cell, secondCell: Cell): Cell[] {
        const cornerDirection: Vector = Vector.downLeftUnitVector;
        return this.createAndAttachCornerTriangles(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachBottomRightCornerTriangles(firstCell: Cell, secondCell: Cell): Cell[] {
        const cornerDirection: Vector = Vector.downRightUnitVector;
        return this.createAndAttachCornerTriangles(firstCell, secondCell, cornerDirection);
    }

    private createAndAttachCornerTriangles(firstCell: Cell, secondCell: Cell, cornerDirection: Vector): Cell[] {
        const firstTriangleDirection: Vector = cornerDirection.newRotatedVector(135);
        const secondTriangleDirection: Vector = cornerDirection.newRotatedVector(-135);
        const firstCenterDirection: Vector = cornerDirection.newRotatedVector(-45);
        const secondCenterDirection: Vector = cornerDirection.newRotatedVector(45);

        const triangleDefaultDirection: Vector = Vector.upLeftUnitVector;
        const firstAngleDifference: number = triangleDefaultDirection.hasAngleTo(firstTriangleDirection);
        const secondAngleDifference: number = triangleDefaultDirection.hasAngleTo(secondTriangleDirection);
        const commonCorners: Coordinate[] = firstCell.commonCornersWith(secondCell);
        const insertionCorner: Coordinate =
            this.coordinateFurthestAlongVector(cornerDirection, commonCorners[0], commonCorners[1]);
        const oldCellsWidth: number = firstCell.borders[0].length;


        const cellCenter1: Coordinate = 
            insertionCorner.newRelativeCoordinate(firstCenterDirection, oldCellsWidth * Math.SQRT2  / 3);
        const cellCenter2: Coordinate = 
            insertionCorner.newRelativeCoordinate(secondCenterDirection, oldCellsWidth * Math.SQRT2 / 3);

        const newCell1: Cell = CellFactory.createCell(
            cellCenter1,
            oldCellsWidth,
            'isosceles-right-triangular-with-split-hypotenuse',
            firstAngleDifference
        );
        const newCell2: Cell = CellFactory.createCell(
            cellCenter2,
            oldCellsWidth,
            'isosceles-right-triangular-with-split-hypotenuse',
            secondAngleDifference
        );
        newCell1.establishNeighbourRelationTo(newCell2);

        if (newCell1.hasCommonBorderWith(firstCell)) {
            newCell1.establishNeighbourRelationTo(firstCell);
        } else {
            newCell1.establishNeighbourRelationTo(secondCell);
        }
        if (newCell2.hasCommonBorderWith(firstCell)) {
            newCell2.establishNeighbourRelationTo(firstCell);
        } else {
            newCell2.establishNeighbourRelationTo(secondCell);
        }
        return [newCell1, newCell2];
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