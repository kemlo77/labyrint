import {Cell} from './cell';
import { Grid } from './grid';

export class HexagonalGrid extends Grid{

    private columns: number;
    private rows: number;
    private heightDistancing: number;
    private widthDistancing: number;
    private rowOffset: number;

    constructor(columns: number, rows: number, cellWidth: number) {
        super();
        this.columns = columns;
        this.rows = rows;
        this._totalNumberOfCells = columns * rows;
        this.heightDistancing = cellWidth * 3 / ( 2 * Math.sqrt(3));
        this.widthDistancing = cellWidth;
        this.rowOffset = this.widthDistancing/2;
        this._grid = this.createGrid();
        this._startCell = this._grid[0][0];
        this._startCell.visited = true;
    }

    private createGrid(): Cell[][] {
        const grid: Cell[][] = [];
        for (let x: number = 0; x < this.columns; x++) {
            const row: Cell[] = [];
            for (let y: number = 0; y < this.rows; y++) {
                let newX: number = this.widthDistancing + x * this.widthDistancing;
                if (y%2==1) {
                    newX+= this.rowOffset;
                }
                const newY: number = this.heightDistancing + y * this.heightDistancing;
                row.push(new Cell(newX, newY));
            }
            grid.push(row);
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
        for (let y: number = 0; y < transposedGrid.length-1; y++) {
            for (let x: number = 0; x < transposedGrid[y].length; x++) {
                const currentCell: Cell = transposedGrid[y][x];
                transposedGrid[y+1]
                    .filter(cell => { return (cell.x > (currentCell.x - this.widthDistancing * 0.55)); })
                    .filter(cell => { return (cell.x < (currentCell.x + this.widthDistancing * 0.55)); })
                    .forEach(cell => currentCell.addNeighbour(cell));
            }
        }
    }

    private connectNeighboursToTheNorth(grid: Cell[][]): void {
        const transposedGrid: Cell[][] = this.transposeArrayOfArrays(grid);
        for (let y: number = 1; y < transposedGrid.length; y++) {
            for (let x: number = 0; x < transposedGrid[y].length; x++) {
                const currentCell: Cell = transposedGrid[y][x];
                transposedGrid[y-1]
                    .filter(cell => { return (cell.x > (currentCell.x - this.widthDistancing * 0.55)); })
                    .filter(cell => { return (cell.x < (currentCell.x + this.widthDistancing * 0.55)); })
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
        for (let x: number = 1; x < grid.length; x++) {
            for (let y: number = 0; y < grid[x].length; y++) {
                grid[x][y].addNeighbour(grid[x - 1][y]);
            }
        }
    }

    private connectNeighboursToTheEast(grid: Cell[][]): void {
        for (let x: number = 0; x < grid.length - 1; x++) {
            for (let y: number = 0; y < grid[x].length; y++) {
                grid[x][y].addNeighbour(grid[x + 1][y]);
            }
        }
    }

}