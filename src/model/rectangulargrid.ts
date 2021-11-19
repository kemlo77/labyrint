import {Cell} from './cell';
import { Grid } from './grid';

export class RectangularGrid extends Grid{

    private width: number;
    private height: number;
    private distancing: number;

    constructor(width: number, height: number, distancing: number) {
        super();
        this.width = width;
        this.height = height;
        this._totalNumberOfCells = width * height;
        this.distancing = distancing;
        this._grid = this.createGrid();
        this._startCell = this._grid[0][0];
        this._startCell.visited = true;
    }

    private createGrid(): Cell[][] {
        const grid: Cell[][] = [];
        for (let x: number = 0; x < this.width; x++) {
            const row: Cell[] = [];
            for (let y: number = 0; y < this.height; y++) {
                row.push(new Cell(this.distancing +x* this.distancing, this.distancing + y* this.distancing));
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
        for (let x: number = 0; x < grid.length; x++) {
            for (let y: number = 0; y < grid[x].length - 1; y++) {
                grid[x][y].addNeighbour(grid[x][y + 1]);
            }
        }
    }

    private connectNeighboursToTheNorth(grid: Cell[][]): void {
        for (let x: number = 0; x < grid.length; x++) {
            for (let y: number = 1; y < grid[x].length; y++) {
                grid[x][y].addNeighbour(grid[x][y - 1]);
            }
        }
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