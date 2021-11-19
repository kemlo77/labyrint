import { Cell } from './cell';

export abstract class Grid {

    protected _grid: Cell[][];

    protected _totalNumberOfCells: number;

    protected _startCell: Cell;

    get startCell(): Cell {
        return this._startCell;
    }

    get grid(): Cell[][] {
        return this._grid;
    }

    get totalNumberOfCells(): number {
        return this._totalNumberOfCells;
    }

    public resetVisited(): void {
        this._grid.flat().forEach(cell => cell.visited = false);
        this.startCell.visited = true;
    }

    get numberOfVisitedCells(): number {
        return this._grid.flat().filter(cell => cell.visited).length;
    }
}