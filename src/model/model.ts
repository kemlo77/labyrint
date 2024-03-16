import { Cell } from './grid/cell/cell';
import { Grid } from './grid/grid';
import { Observer } from '../observer';
import { Subject } from '../subject';

export class Model implements Subject {

    private _grid: Grid;
    private _sequenceOfVisitedCells: Cell[] = [];
    private _solutionSequence: Cell[] = [];
    private _observers: Observer[] = [];

    set grid(grid: Grid) {
        this._grid = grid;
    }

    get grid(): Grid {
        return this._grid;
    }

    private get visitedStackIsNotEmpty(): boolean {
        return this._sequenceOfVisitedCells.length != 0;
    }

    private get currentCell(): Cell {
        return this._sequenceOfVisitedCells[this._sequenceOfVisitedCells.length - 1];
    }

    get solutionSequence(): Cell[] {
        return [...this._solutionSequence];
    }

    public attachObserver(observer: Observer): void {
        this._observers.push(observer);
    }

    public detachObserver(observer: Observer): void {
        const observerIndex: number = this._observers.indexOf(observer);
        if (observerIndex > -1) {
            this._observers.splice(observerIndex, 1);
        }
    }

    public notifyObservers(): void {
        for (const observer of this._observers) {
            observer.update();
        }
    }

    public initialize(): void {
        this._grid.resetVisitedStatusOnCells();
        this._grid.removeEstablishedConnectionsInCells();
        this._sequenceOfVisitedCells = [this._grid.startCell];
        this._solutionSequence = [];
    }

    public generateLabyrinth(): void {
        this.initialize();
        let numberOfVisitedCells: number = this._grid.numberOfVisitedCells;
        while (this._grid.totalNumberOfCells > numberOfVisitedCells) {
            while (this.currentCell.hasNoUnvisitedNeighbours && this.visitedStackIsNotEmpty) {
                this.stepBackwards();
            }
            this.stepToUnvisitedNeighbour();
            numberOfVisitedCells++;
        }

        this.notifyObservers();
    }

    private stepToUnvisitedNeighbour(): void {
        const nextCell: Cell = this.currentCell.randomUnvisitedNeighbour;
        nextCell.visited = true;
        this.currentCell.establishConnectionTo(nextCell);
        this._sequenceOfVisitedCells.push(nextCell);
        if (nextCell === this._grid.endCell) {
            this._solutionSequence = [...this._sequenceOfVisitedCells];
        }
    }

    private stepBackwards(): void {
        this._sequenceOfVisitedCells.pop();
    }

    public reduceSomeComplexity(): void {
        if (!this._grid) {
            return;
        }
        this.disconnectCellsWithOnlyOneConnection();
        this.notifyObservers();
    }

    private disconnectCellsWithOnlyOneConnection(): void {
        this._grid.allCells
            .filter(cell => cell.connectedNeighbours.length == 1)
            .filter(cell => cell != this._grid.startCell)
            .filter(cell => cell != this._grid.endCell)
            .forEach(cell => {
                cell.removeConnectionsToCell();
            });
    }

}