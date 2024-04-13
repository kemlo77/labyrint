import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class DiagonalSquareGridFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createTiltedSquareCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.connectTiltedSquareCellsToNeighbourCells(cellGrid);
        const topLeftCell: Cell = cellGrid[0][0];
        const topRightCell: Cell = cellGrid[cellGrid.length - 1][0];
        const bottomLeftCell: Cell = cellGrid[0][cellGrid[0].length - 1];
        const bottomRightCell: Cell = cellGrid[numberOfColumns - 1][2 * (numberOfRows - 1)];

        const topRowCells: Cell[] = MatrixOperations.transpose(cellGrid)[0];
        const bottomRowCells: Cell[] = MatrixOperations
            .transpose(cellGrid)[MatrixOperations.transpose(cellGrid).length - 1];
        const leftRowCells: Cell[] = cellGrid[0].filter((cell, index) => index % 2 === 0);
        const rightRowCells: Cell[] = cellGrid[cellGrid.length - 1].filter((cell, index) => index % 2 === 0);

        const newTopRow: Cell[] = this.createAndAttachTopRowTriangles(topRowCells, cellWidth);
        const newBottomRow: Cell[] = this.createAndAttachBottomRowTriangles(bottomRowCells, cellWidth);
        const newLeftRow: Cell[] = this.createAndAttachLeftRowTriangles(leftRowCells, cellWidth);
        const newRightRow: Cell[] = this.createAndAttachRightRowTriangles(rightRowCells, cellWidth);
        cellGrid.push(newTopRow);
        cellGrid.push(newBottomRow);
        cellGrid.unshift(newLeftRow);
        cellGrid.push(newRightRow);

        const cornerCellWidth: number = cellWidth / Math.SQRT2;
        const newTopLeftCell: Cell = this.createAndAttachTopLeftCornerTriangle(topLeftCell, cornerCellWidth);
        const newTopRightCell: Cell = this.attachTopRightCornerTrianglex(topRightCell, cornerCellWidth);
        const newBottomLeftCell: Cell = this.createAndAttachBottomLeftCornerTriangle(bottomLeftCell, cornerCellWidth);
        const newBottomRightCell: Cell = this.createAndAttachTopRightCornerTriangle(bottomRightCell, cornerCellWidth);
        cellGrid.push([newTopLeftCell, newTopRightCell, newBottomLeftCell, newBottomRightCell]);


        return new Grid(cellGrid, newTopLeftCell, newBottomRightCell);
    }

    private createAndAttachTopLeftCornerTriangle(existingCell: Cell, cellWidth: number): Cell {
        const xOffset: number = - cellWidth * 2 / 3;
        const yOffset: number = - cellWidth * 2 / 3;
        const rotation: number = 0;
        return this.generateAndAttachCornerTriangle(existingCell, cellWidth, xOffset, yOffset, rotation);
    }

    private attachTopRightCornerTrianglex(existingCell: Cell, cellWidth: number): Cell {
        const xOffset: number = + cellWidth * 2 / 3;
        const yOffset: number = - cellWidth * 2 / 3;
        const rotation: number = 270;
        return this.generateAndAttachCornerTriangle(existingCell, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachBottomLeftCornerTriangle(existingCell: Cell, cellWidth: number): Cell {
        const xOffset: number = - cellWidth * 2 / 3;
        const yOffset: number = + cellWidth * 2 / 3;
        const rotation: number = 90;
        return this.generateAndAttachCornerTriangle(existingCell, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachTopRightCornerTriangle(existingCell: Cell, cellWidth: number): Cell {
        const xOffset: number = + cellWidth * 2 / 3;
        const yOffset: number = + cellWidth * 2 / 3;
        const rotation: number = 180;
        return this.generateAndAttachCornerTriangle(existingCell, cellWidth, xOffset, yOffset, rotation);
    }

    private generateAndAttachCornerTriangle(
        existingCell: Cell,
        cellWidth: number,
        xOffset: number,
        yOffset: number,
        rotation: number
    ): Cell {
        const triangleCenter: Coordinate =
            new Coordinate(existingCell.center.x + xOffset, existingCell.center.y + yOffset);
        const newCell: Cell = CellFactory.createCell(triangleCenter, cellWidth, 'isosceles-right-triangular', rotation);
        newCell.establishNeighbourRelationTo(existingCell);
        return newCell;
    }



    private createAndAttachTopRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = hypotenuseLength / 2;
        const yOffset: number = - hypotenuseLength / 3;
        const rotation: number = 135;
        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachBottomRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = hypotenuseLength / 2;
        const yOffset: number = hypotenuseLength / 3;
        const rotation: number = 315;

        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachLeftRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = - hypotenuseLength / 3;
        const yOffset: number = hypotenuseLength / 2;
        const rotation: number = 225;

        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachRightRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = hypotenuseLength / 3;
        const yOffset: number = hypotenuseLength / 2;
        const rotation: number = 45;

        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private generateAndAttachTriangles(
        cellsConnectingTo: Cell[],
        triangleCellWidth: number,
        xOffset: number,
        yOffset: number,
        rotation: number
    ): Cell[] {
        const generatedCells: Cell[] = [];

        for (let i: number = 0; i < cellsConnectingTo.length; i++) {
            const isOnLastCell: boolean = i === cellsConnectingTo.length - 1;
            if (isOnLastCell) {
                continue;
            }
            const cell1: Cell = cellsConnectingTo[i];
            const cell2: Cell = cellsConnectingTo[i + 1];
            const triangleCenter: Coordinate = new Coordinate(cell1.center.x + xOffset, cell1.center.y + yOffset);
            const newCell: Cell =
                CellFactory.createCell(triangleCenter, triangleCellWidth, 'isosceles-right-triangular', rotation);
            newCell.establishNeighbourRelationTo(cell1);
            newCell.establishNeighbourRelationTo(cell2);
            generatedCells.push(newCell);
        }
        return generatedCells;
    }



    private createTiltedSquareCellGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellGrid: Cell[][] = [];

        const squareDiagonalLength: number = cellWidth * Math.SQRT2;
        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows * 2 - 1; rowIndex++) {
                if (rowIndex % 2 === 0) {
                    const xCoordinate: number = squareDiagonalLength * (columnIndex + 1);
                    const yCoordinate: number = squareDiagonalLength * (rowIndex / 2 + 1);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'square', 45));
                } else {
                    const xCoordinate: number = squareDiagonalLength * (columnIndex + 3 / 2);
                    const yCoordinate: number = squareDiagonalLength * (rowIndex / 2 + 1);
                    const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                    rowOfCells.push(CellFactory.createCell(center, cellWidth, 'square', 45));
                }

            }
            cellGrid.push(rowOfCells);
        }
        return cellGrid;
    }

    private connectTiltedSquareCellsToNeighbourCells(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                const evenRow: boolean = rowIndex % 2 === 0;
                const onTheLastColumn: boolean = columnIndex === grid.length - 1;

                if (evenRow || onTheLastColumn) {
                    continue;
                }

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const leftUpperCell: Cell = grid[columnIndex][rowIndex - 1];
                const rightUpperCell: Cell = grid[columnIndex + 1][rowIndex - 1];
                const leftLowerCell: Cell = grid[columnIndex][rowIndex + 1];
                const rightLowerCell: Cell = grid[columnIndex + 1][rowIndex + 1];

                currentCell.establishNeighbourRelationTo(leftUpperCell);
                currentCell.establishNeighbourRelationTo(rightUpperCell);
                currentCell.establishNeighbourRelationTo(leftLowerCell);
                currentCell.establishNeighbourRelationTo(rightLowerCell);
            }
        }


    }



}