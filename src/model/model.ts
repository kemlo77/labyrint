import { Grid } from './grid/grid';
import { Observer } from '../view/observer';
import { Subject } from './subject';
import { GridSupplier } from './grid/gridsupplier';
import { Segment } from './segment';
import { RecursiveBacktrackerAlgorithm } from './algorithm/recursivebacktracker';
import { MazeGenerationAlgorithm } from './algorithm/algorithm';

export class Model implements Subject {

    private _grid: Grid;

    private _solutionTrail: Segment[] = [];
    private _observers: Observer[] = [];
    private _algorithm: MazeGenerationAlgorithm = new RecursiveBacktrackerAlgorithm();

    changeGridType(gridType: string): void {
        this._grid = GridSupplier.getGrid(gridType);
        this._solutionTrail = [];
        this.notifyObservers();
    }

    get grid(): Grid {
        return this._grid;
    }

    get solutionTrail(): Segment[] {
        return this._solutionTrail;
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

    public generateLabyrinth(): void {
        if (!this._grid) {
            return;
        }
        this._grid.resetGrid();
        this._grid.startCell.visited = true;
        this._solutionTrail = this._algorithm.generateMaze(this._grid);
        this.notifyObservers();
    }

    public reduceSomeComplexity(): void {
        if (!this._grid) {
            return;
        }
        this._grid.disconnectCellsWithOnlyOneConnection();
        this.notifyObservers();
    }

}