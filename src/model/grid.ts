import { Cell } from './cell';

export abstract class Grid {

    private _cellMatrix: Cell[][];
    private _startCell: Cell;
    private _endCell: Cell;

    constructor(
        private _numberOfColumns: number,
        private _numberOfRows: number,
        private _cellWidth: number) {
        //
    }

    get numberOfColumns(): number {
        return this._numberOfColumns;
    }

    get numberOfRows(): number {
        return this._numberOfRows;
    }

    get cellWidth(): number {
        return this._cellWidth;
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

    get cellMatrix(): Cell[][] {
        return this._cellMatrix;
    }

    protected set cellMatrix(cellMatrix: Cell[][]) {
        this._cellMatrix = cellMatrix;
    }

    get totalNumberOfCells(): number {
        return this._numberOfColumns * this._numberOfRows;
    }

    public resetVisitedStatusOnCells(): void {
        this._cellMatrix.flat().forEach(cell => cell.visited = false);
        this.startCell.visited = true;
    }

    public removeEstablishedConnectionsInCells(): void {
        this._cellMatrix.flat().forEach(cell => cell.removeEstablishedConnections());
    }

    get numberOfVisitedCells(): number {
        return this._cellMatrix.flat().filter(cell => cell.visited).length;
    }
}