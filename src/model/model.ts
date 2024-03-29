import { Cell } from './grid/cell/cell';
import { Grid } from './grid/grid';
import { Observer } from '../observer';
import { Subject } from '../subject';
import { GridSupplier } from './grid/gridsupplier';
import { Segment } from './segment';

export class Model implements Subject {

    private _grid: Grid;
    private _sequenceOfVisitedCells: Cell[] = [];
    private _solutionSequence: Cell[] = [];
    private _observers: Observer[] = [];

    changeGridType(gridType: string): void {
        this._grid = GridSupplier.getGrid(gridType);
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

    get solutionCellSequence(): Cell[] {
        return [...this._solutionSequence];
    }

    get solutionTrail(): Segment[] {
        const solutionTrail: Segment[] = [];
        for (let index: number = 0; index < this._solutionSequence.length - 1; index++) {
            const currentCell: Cell = this._solutionSequence[index];
            const nextCell: Cell = this._solutionSequence[index + 1];
            solutionTrail.push(new Segment(currentCell.center, nextCell.center));
        }
        return solutionTrail;
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
        this._grid.resetGrid();
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
            this.stepToRandomUnvisitedNeighbour();
            numberOfVisitedCells++;
        }

        this.notifyObservers();
    }

    private stepToRandomUnvisitedNeighbour(): void {
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
        this._grid.disconnectCellsWithOnlyOneConnection();
        this.notifyObservers();
    }

}