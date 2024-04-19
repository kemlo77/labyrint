import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export class DiagonalSquareGridFactory extends GridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, diagonalWidth: number): Grid {
        const cellWidth: number = diagonalWidth / Math.SQRT2;
        const cellGrid: Cell[][] = this.createTiltedSquareCellGrid(numberOfColumns, numberOfRows, cellWidth);
        this.connectTiltedSquareCellsToNeighbourCells(cellGrid);
        const topLeftCell: Cell = cellGrid[0][0];
        const topRightCell: Cell = cellGrid[cellGrid.length - 1][0];
        const bottomLeftCell: Cell = cellGrid[0][cellGrid[0].length - 1];
        const bottomRightCell: Cell = cellGrid[(numberOfColumns - 1) * 2][numberOfRows - 2];
        let startCell: Cell = topLeftCell;
        let endCell: Cell = bottomRightCell;


        const topRowCells: Cell[] = cellGrid.map(row => row[0]).filter((cell, index) => index % 2 === 1);
        const bottomRowCells: Cell[] = cellGrid.map(row => row[row.length - 1])
            .filter((cell, index) => index % 2 === 1);
        const leftColumnCells: Cell[] = cellGrid[0];
        const rightColumnCells: Cell[] = cellGrid[cellGrid.length - 1];

        const newTopRow: Cell[] = this.createAndAttachTopRowTriangles(topRowCells, cellWidth);
        const newBottomRow: Cell[] = this.createAndAttachBottomRowTriangles(bottomRowCells, cellWidth);
        const newLeftColumn: Cell[] = this.createAndAttachLeftRowTriangles(leftColumnCells, cellWidth);
        const newRightColumn: Cell[] = this.createAndAttachRightRowTriangles(rightColumnCells, cellWidth);
        cellGrid.push(newTopRow);
        cellGrid.push(newBottomRow);
        cellGrid.unshift(newLeftColumn);
        cellGrid.push(newRightColumn);

        // const cornerCellWidth: number = cellWidth / Math.SQRT2;
        // const newTopLeftCell: Cell = this.createAndAttachTopLeftCornerTriangle(topLeftCell, cornerCellWidth);
        // const newTopRightCell: Cell = this.attachTopRightCornerTrianglex(topRightCell, cornerCellWidth);
        // const newBottomLeftCell: Cell = this.createAndAttachBottomLeftCornerTriangle(bottomLeftCell, cornerCellWidth);
        // const newBottomRightCell: Cell = this.createAndAttachTopRightCornerTriangle(bottomRightCell, cornerCellWidth);
        // cellGrid.push([newTopLeftCell, newTopRightCell, newBottomLeftCell, newBottomRightCell]);
        // startCell = newTopLeftCell;
        // endCell = newBottomRightCell;

        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
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
        const rotation: number = 90;
        return this.generateAndAttachCornerTriangle(existingCell, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachBottomLeftCornerTriangle(existingCell: Cell, cellWidth: number): Cell {
        const xOffset: number = - cellWidth * 2 / 3;
        const yOffset: number = + cellWidth * 2 / 3;
        const rotation: number = 270;
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
        const rotation: number = 225;
        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachBottomRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = hypotenuseLength / 2;
        const yOffset: number = hypotenuseLength / 3;
        const rotation: number = 45;

        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachLeftRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = - hypotenuseLength / 3;
        const yOffset: number = hypotenuseLength / 2;
        const rotation: number = 135;

        return this.generateAndAttachTriangles(cellsConnectingTo, cellWidth, xOffset, yOffset, rotation);
    }

    private createAndAttachRightRowTriangles(cellsConnectingTo: Cell[], cellWidth: number): Cell[] {
        const hypotenuseLength: number = cellWidth * Math.SQRT2;
        const xOffset: number = hypotenuseLength / 3;
        const yOffset: number = hypotenuseLength / 2;
        const rotation: number = 315;

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

        const squareDiagonalLength: number = cellWidth * Math.SQRT2;
        const startOffsetX: number = squareDiagonalLength;
        const startOffsetY: number = squareDiagonalLength;
        const firstCellCenter: Coordinate = new Coordinate(startOffsetX, startOffsetY);
        const xDirectionStep: Vector = new Vector(squareDiagonalLength / 2, 0);
        const yDirectionStep: Vector = new Vector(0, squareDiagonalLength);
        const oddColumnExtraStep: Vector = new Vector(0, squareDiagonalLength / 2);
        const createSquareCell: CellCreator =
            (center: Coordinate) => CellFactory.createCell(center, cellWidth, 'square', 45);


        const cellColumns: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < numberOfColumns * 2 - 1; columnIndex++) {

            const evenColumn: boolean = columnIndex % 2 === 0;
            const columnStartPoint: Coordinate = firstCellCenter.newRelativeCoordinate(xDirectionStep, columnIndex);

            if (evenColumn) {
                const oddColumnStartPoint: Coordinate = columnStartPoint.newRelativeCoordinate(oddColumnExtraStep, 1);
                const cellSequence: Cell[] =
                    this.createSequenceOfCells(oddColumnStartPoint, yDirectionStep, numberOfRows - 1, createSquareCell);
                cellColumns.push(cellSequence);

            } else {
                const cellSequence: Cell[] =
                    this.createSequenceOfCells(columnStartPoint, yDirectionStep, numberOfRows, createSquareCell);
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



}