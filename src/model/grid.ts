import { Cell } from './cell';

export class Grid {

    private _cellMatrix: Cell[][];
    private _startCell: Cell;
    private _endCell: Cell;

    constructor(interconnectedCells: Cell[][], startCell: Cell, endCell: Cell) {
        this._cellMatrix = interconnectedCells;
        this._startCell = startCell;
        this._startCell.visited = true;
        this._endCell = endCell;
    }

    get startCell(): Cell {
        return this._startCell;
    }

    protected set startCell(cell: Cell) {
        this._startCell = cell;
    }

    get endCell(): Cell {
        return this._endCell;
    }

    protected set endCell(cell: Cell) {
        this._endCell = cell;
    }

    get allCells(): Cell[] {
        return this._cellMatrix.flat();
    }

    get cellMatrix(): Cell[][] {
        return this._cellMatrix;
    }
   

    get totalNumberOfCells(): number {
        return this._cellMatrix.flat().length;
    }

    get numberOfVisitedCells(): number {
        return this.allCells.filter(cell => cell.visited).length;
    }

    public resetVisitedStatusOnCells(): void {
        this.allCells.forEach(cell => cell.visited = false);
        this.startCell.visited = true;
    }

    public removeEstablishedConnectionsInCells(): void {
        this.allCells.forEach(cell => cell.removeEstablishedConnections());
    }

}