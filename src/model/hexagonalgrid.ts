import { Cell } from './cell';
import { Coordinate } from './coordinate';
import { Grid } from './grid';

export class HexagonalGrid extends Grid {

    constructor(numberOfColumns: number, numberOfRows: number, cellWidth: number) {
        super(numberOfColumns, numberOfRows, cellWidth);
        this.cellMatrix = this.createMatrixOfInterconnectedHexagonalCells();
        this.startCell = this.cellMatrix[0][0];
        this.startCell.visited = true;
        this.endCell = this.cellMatrix[this.numberOfColumns - 1][this.numberOfRows - 1];
    }

    private get cellHeight(): number {
        return this.cellWidth * Math.sqrt(3) / 2;
    }

    private get rowOffset(): number {
        return this.cellWidth / 2;
    }

    private createMatrixOfInterconnectedHexagonalCells(): Cell[][] {
        const grid: Cell[][] = [];
        for (let columnIndex: number = 0; columnIndex < this.numberOfColumns; columnIndex++) {
            const rowOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < this.numberOfRows; rowIndex++) {
                let xCoordinate: number = this.cellWidth * (columnIndex + 1);
                if (rowIndex % 2 == 1) {
                    xCoordinate += this.rowOffset;
                }
                const yCoordinate: number = this.cellHeight * (rowIndex + 1);
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
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let rowIndex: number = 0; rowIndex < transposedGrid.length - 1; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const highestAcceptedDistance: number = this.cellWidth * 0.55;
                transposedGrid[rowIndex + 1]
                    .filter(cell => (highestAcceptedDistance > Math.abs(currentCell.center.x - cell.center.x)))
                    .forEach(cell => currentCell.addNeighbour(cell));
            }
        }
    }

    private connectNeighboursToTheNorth(grid: Cell[][]): void {
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let rowIndex: number = 1; rowIndex < transposedGrid.length; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < transposedGrid[rowIndex].length; columnIndex++) {
                const currentCell: Cell = transposedGrid[rowIndex][columnIndex];
                const highestAcceptedDistance: number = this.cellWidth * 0.55;
                transposedGrid[rowIndex - 1]
                    .filter(cell => (highestAcceptedDistance > Math.abs(currentCell.center.x - cell.center.x)))
                    .forEach(cell => { currentCell.addNeighbour(cell); });
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