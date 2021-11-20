import { Cell } from './cell';
import { Grid } from './grid';

import { View } from '../view/view';

export class Model {

    private _grid: Grid;
    private _view: View;
    private stackOfVisitedCells: Cell[]= [];

    set grid(grid: Grid) {
        this._grid = grid;
    }

    set view(view: View) {
        this._view = view;
    }

    private get visitedStackIsNotEmpty(): boolean {
        return this.stackOfVisitedCells.length != 0;
    }

    private get currentCell(): Cell {
        return this.stackOfVisitedCells[this.stackOfVisitedCells.length-1];
    }

    public initialize(): void {
        this._view.clearTheCanvas();
        this._grid.resetVisitedStatusOnCells();
        this.stackOfVisitedCells = [this._grid.startCell];
    }

    public generateLabyrinth(): void {
        this.initialize();
        let numberOfVisitedCells: number = this._grid.numberOfVisitedCells;
        while(this._grid.totalNumberOfCells > numberOfVisitedCells) {
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
        this._view.drawConnection(this.currentCell.centerCoordinate, nextCell.centerCoordinate);
        this.stackOfVisitedCells.push(nextCell);
    }

    private stepBackwards(): void {
        this.stackOfVisitedCells.pop();
    }


}