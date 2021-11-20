import { Cell } from './cell';
import { Grid } from './grid';

import { View } from '../view/view';

export class Model {

    private grid: Grid;
    private view: View;
    private stackOfVisitedCells: Cell[]= [];

    constructor(grid: Grid, view: View) {
        this.grid = grid;
        this.view = view;
    }   

    public initialize(): void {
        this.view.clearTheCanvas();
        this.grid.resetVisited();
        this.stackOfVisitedCells = [this.grid.startCell];
    }

    public generateLabyrinth(): void {
        this.initialize();
        let numberOfVisitedCells: number = this.grid.numberOfVisitedCells;
        while(this.grid.totalNumberOfCells > numberOfVisitedCells) {
            while (this.currentCell().hasNoUnvisitedNeighbours && this.visitedStackIsNotEmpty()) {
                this.stepBackwards();
            }
            this.stepToUnvisitedNeighbour();
            numberOfVisitedCells++;
        }
    }

    private stepToUnvisitedNeighbour(): void {
        const nextCell: Cell = this.currentCell().randomUnvisitedNeighbour;
        nextCell.visited = true;
        this.view.drawConnection(this.currentCell().x, this.currentCell().y, nextCell.x,nextCell.y);
        this.stackOfVisitedCells.push(nextCell);
        //this.view.paintCellCenter(nextCell.x, nextCell.y);
    }

    private stepBackwards(): void {
        this.stackOfVisitedCells.pop();
    }

    private visitedStackIsNotEmpty(): boolean {
        return this.stackOfVisitedCells.length != 0;
    }

    private currentCell(): Cell {
        return this.stackOfVisitedCells[this.stackOfVisitedCells.length-1];
    }
}