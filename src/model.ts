import { Cell } from './cell';
import { RectangularGrid } from './rectangulargrid';
import { View } from './view';

export class Model {

    private grid: RectangularGrid;
    private view: View;
    private stackOfVisitedCells: Cell[]= [];

    constructor(grid: RectangularGrid, view: View) {
        this.grid = grid;
        this.view = view;
        this.stackOfVisitedCells.push(grid.startCell);
    }   

    public generateLabyrinth(): void {
        this.view.clearTheCanvas();
        this.grid.resetVisited();
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
        this.view.drawConnection(this.currentCell().x, this.currentCell().y, nextCell.x,nextCell.y, 8);
        this.stackOfVisitedCells.push(nextCell);
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