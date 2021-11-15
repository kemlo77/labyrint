import {Cell} from './cell';

export class RectangularGrid {

    private width: number;
    private height: number;
    private _grid: Cell[][];
    private _startCell: Cell;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this._grid = this.createGrid();
        this.interconnectGrid(this._grid);
        this._startCell = this._grid[0][0];
        this.startCell.visited = true;
    }

    get grid(): Cell[][]  {
        return this._grid;
    }

    get totalNumberOfCells(): number {
        return this.width * this.height;
    }

    get startCell(): Cell {
        return this._startCell;
    }

    get numberOfVisitedCells(): number {
        let total:number = 0;
        this._grid.forEach(row => {
            row.forEach(cell =>{
                total += (cell.visited?1:0);
            });
        });
        return total;
    }

    private createGrid(): Cell[][] {
        const grid: Cell[][] = [];
        for (let i: number = 0; i < this.width; i++) {
            const row: Cell[] = [];
            for (let j: number = 0; j < this.height; j++) {
                row.push(new Cell(i, j));
            }
            grid.push(row);
        }
        return grid;
    }

    private interconnectGrid(grid: Cell[][]): void {
        //add a neighbours to the east
        for (let i: number = 0; i < grid.length; i++) {
            for (let j: number = 0; j < grid[i].length - 1; j++) {
                grid[i][j].addNeighbour(grid[j][j + 1]);
            }
        }

        //add a neighbours to the west
        for (let i: number = 0; i < grid.length; i++) {
            for (let j: number = 1; j < grid[i].length; j++) {
                grid[i][j].addNeighbour(grid[i][j - 1]);
            }
        }

        //add neightbours to the north
        for (let i: number = 1; i < grid.length; i++) {
            for (let j: number = 0; j < grid[i].length; j++) {
                grid[i][j].addNeighbour(grid[i - 1][j]);
            }
        }

        //add neightbours to the south
        for (let i: number = 0; i < grid.length - 1; i++) {
            for (let j: number = 0; j < grid[i].length; j++) {
                grid[i][j].addNeighbour(grid[i + 1][j]);
            }
        }
    }

}