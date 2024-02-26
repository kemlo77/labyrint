import { Cell } from './cell';
import { Grid } from './grid';
import { Coordinate } from './coordinate';

export class RectangularGrid extends Grid {

    constructor(numberOfColumns: number, numberOfRows: number, cellWidth: number) {
        super(numberOfColumns, numberOfRows, cellWidth);
        this.cellMatrix = this.createMatrixOfInterconnectedSquareCells();
        this.startCell = this.cellMatrix[0][0];
        this.startCell.visited = true;
        this.endCell = this.cellMatrix[this.numberOfColumns - 1][this.numberOfRows - 1];
    }

    private createMatrixOfInterconnectedSquareCells(): Cell[][] {
        const grid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < this.numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < this.numberOfRows; rowIndex++) {
                const xCoordinate: number = this.cellWidth + columnIndex * this.cellWidth;
                const yCoordinate: number = this.cellWidth + rowIndex * this.cellWidth;
                const center: Coordinate = new Coordinate(xCoordinate, yCoordinate);
                rowOfCells.push(new Cell(center));
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
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length - 1; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex + 1]);
            }
        }
    }

    private connectNeighboursToTheNorth(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 1; rowIndex < grid[columnIndex].length; rowIndex++) {
                grid[columnIndex][rowIndex].addNeighbour(grid[columnIndex][rowIndex - 1]);
            }
        }
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