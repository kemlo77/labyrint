import { Cell } from './cell';
import { RectangularGrid } from './rectangulargrid';
import { View } from './view';

export class Controller {

    private model: RectangularGrid;
    private view: View;

    constructor(view: View) {
        this.view = view;
    }



    public myFunction(): void {
        const width: number = 10;
        const height: number = 10;
        let numberOfCellsToVisit: number = width*height -1;
        const model: RectangularGrid = new RectangularGrid(width,height);
    
        
        this.view.plotNumberOfNeighbours(model.grid);
    
        
    
        const stackOfVisitedCells: Cell[]= [];
        const startCell: Cell = model.grid[0][0];
        stackOfVisitedCells.push(startCell);
        while (numberOfCellsToVisit > 0) {
            while (currentCell().hasNoUnvisitedNeighbours && visitedStackIsNotEmpty()) {
                stepBackwards();
            }
            stepToUnvisitedNeighbour();
            numberOfCellsToVisit--;
            console.log(numberOfCellsToVisit);
    
        }
        console.log('done!');
        this.view.plotTheVisitCount(model.grid);
    
        function stepToUnvisitedNeighbour(): void {
            const nextCell: Cell = currentCell().randomUnvisitedNeighbour;
            nextCell.visited = true;
            stackOfVisitedCells.push(nextCell);
        }
    
    
        function stepBackwards(): void {
            stackOfVisitedCells.pop();
        }
    
        function visitedStackIsNotEmpty(): boolean {
            return stackOfVisitedCells.length != 0;
        }
    
        function currentCell(): Cell {
            return stackOfVisitedCells[stackOfVisitedCells.length-1];
        }
    
    }
}