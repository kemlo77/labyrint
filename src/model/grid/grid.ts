import { MatrixOperations } from '../../service/matrixoperations';
import { Cell } from './cell/cell';

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
        return this._cellMatrix.flat().filter(cell => cell.neighbours.length > 0);
    }

    get totalNumberOfCells(): number {
        return this.allCells.length;
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

    public printNeighboursPerCell(): void {
        const transposedMatrix: Cell[][] = MatrixOperations.transpose<Cell>(this._cellMatrix);
        MatrixOperations.printMatrix<Cell>(transposedMatrix, cell => cell.neighbours.length);
    }


}