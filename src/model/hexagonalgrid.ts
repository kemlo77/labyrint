import {Cell} from './cell';
import { Grid } from './grid';

export class HexagonalGrid extends Grid{

    constructor(numberOfColumns: number, numberOfRows: number, cellWidth: number) {
        super(numberOfColumns, numberOfRows, cellWidth);
        this.cellMatrix = this.createMatrixOfInterconnectedHexagonalCells();
        this.startCell = this.cellMatrix[0][0];
        this.startCell.visited = true;
    }

    private get heightDistancing(): number {
        return this.cellWidth * 3 / ( 2 * Math.sqrt(3));
    }

    private get widthDistancing(): number {
        return this.cellWidth;
    }

    private get rowOffset(): number {
        return this.cellWidth/2;
    }

    private createMatrixOfInterconnectedHexagonalCells(): Cell[][] {
        const grid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < this.numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < this.numberOfRows; rowIndex++) {
                let xCoordinate: number = this.widthDistancing + columnIndex * this.widthDistancing;
                if (rowIndex%2==1) {
                    xCoordinate+= this.rowOffset;
                }
                const yCoordinate: number = this.heightDistancing + rowIndex * this.heightDistancing;
                rowOfCells.push(new Cell(xCoordinate, yCoordinate));
            }
            grid.push(rowOfCells);
        }
        this.interconnectGrid(grid);
        return grid;
    }

    private interconnectGrid(grid: Cell[][]): void {
        this.connectNeighboursToTheSouth(grid);
        this.connectNeighboursToTheNorth(grid);
        this.connectNeighboursToTheWest(grid);
        this.connectNeighboursToTheEast(grid);
    }

    private connectNeighboursToTheSouth(grid: Cell[][]): void {
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let rowIndex: number = 0; rowIndex < transposedGrid.length-1; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const highestAcceptedDistance: number = this.widthDistancing * 0.55;
                transposedGrid[rowIndex+1]
                    .filter(cell => (highestAcceptedDistance > Math.abs(currentCell.x - cell.x)))
                    .forEach(cell => currentCell.addNeighbour(cell));
            }
        }
    }

    private connectNeighboursToTheNorth(grid: Cell[][]): void {
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let rowIndex: number = 1; rowIndex < transposedGrid.length; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const highestAcceptedDistance: number = this.widthDistancing * 0.55;
                transposedGrid[rowIndex-1]
                    .filter(cell => (highestAcceptedDistance > Math.abs(currentCell.x - cell.x)))
                    .forEach(cell => {currentCell.addNeighbour(cell);});
            }
        }
    }

    private transposeArrayOfArrays(inputArrayOfArrays: Cell[][]): Cell[][] {
        const newArrayOfArrays: Cell[][] = [];
        for (let column: number = 0; column < inputArrayOfArrays[0].length; column++) {
            const newRow: Cell[] = [];
            for (let row: number = 0; row < inputArrayOfArrays.length; row++) {
                newRow.push(inputArrayOfArrays[row][column]);
            }
            newArrayOfArrays.push(newRow);
        }
        return newArrayOfArrays;
    }

    private connectNeighboursToTheWest(grid: Cell[][]): void {
        for (let columnIndex: number = 1; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex - 1][rowIndex]);
            }
        }
    }

    private connectNeighboursToTheEast(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length - 1; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex + 1][rowIndex]);
            }
        }
    }

}