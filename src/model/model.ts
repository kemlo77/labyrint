import { Cell } from './cell';
import { Grid } from './grid';

import { View } from '../view/view';

export class Model {

    private _grid: Grid;
    private _view: View;
    private _sequenceOfVisitedCells: Cell[] = [];
    private _solutionSequence: Cell[] = [];

    set grid(grid: Grid) {
        this._grid = grid;
    }

    set view(view: View) {
        this._view = view;
    }

    private get visitedStackIsNotEmpty(): boolean {
        return this._sequenceOfVisitedCells.length != 0;
    }

    private get currentCell(): Cell {
        return this._sequenceOfVisitedCells[this._sequenceOfVisitedCells.length - 1];
    }

    public initialize(): void {
        this._view.clearTheCanvas();
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
    }

    private stepToUnvisitedNeighbour(): void {
        const nextCell: Cell = this.currentCell.randomUnvisitedNeighbour;
        nextCell.visited = true;
        this.currentCell.interconnectToCell(nextCell);
        this._view.drawConnection(this.currentCell.center, nextCell.center);
        this._sequenceOfVisitedCells.push(nextCell);
        if (nextCell === this._grid.endCell) {
            this._solutionSequence = [...this._sequenceOfVisitedCells];
        }
    }

    private stepBackwards(): void {
        this._sequenceOfVisitedCells.pop();
    }

    public showSolution(): void {
        for (let index: number = 0; index < this._solutionSequence.length - 1; index++) {
            const currentCell: Cell = this._solutionSequence[index];
            const nextCell: Cell = this._solutionSequence[index + 1];
            this._view.drawTrail(currentCell.center, nextCell.center);
        }
    }

    public hideSolution(): void {
        for (let index: number = 0; index < this._solutionSequence.length - 1; index++) {
            const currentCell: Cell = this._solutionSequence[index];
            const nextCell: Cell = this._solutionSequence[index + 1];
            this._view.concealTrail(currentCell.center, nextCell.center);
        }
    }

    public reduceSomeComplexity(): void {
        if (!this._grid) {
            return;
        }
        this._grid.cellMatrix.flat()
            .filter(cell => cell.connectedNeighbouringCells.length == 1)
            .filter(cell => cell != this._grid.startCell)
            .filter(cell => cell != this._grid.endCell)
            .forEach(cell => {
                cell.removeInterConnectionsToCell();
                this._view.fillCell(cell.center);
            });
    }


}