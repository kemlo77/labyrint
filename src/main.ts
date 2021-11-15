import './style.css';
import {reverseText} from './reverse';
import {Cell} from "./cell";
import {Model} from "./model";

function myFunction(): void {
    const width: number = 10;
    const height: number = 10;
    const model: Model = new Model(width,height);
    console.log(model.grid[1][1].neighbours.length);

    model.grid.forEach( row => {
        let tempstr: String ="";
        row.forEach( cell => {
            tempstr+=" " + cell.neighbours.length;
        });
        console.log(tempstr);
    });

    const numberOfCellsToVisit = width*height;

    const stackOfVisitedCells: Cell[]= [];
    const startCell: Cell = model.grid[0][0];
    stackOfVisitedCells.push(startCell);

    while (currentCellHasNoUnusedExits() && visitedStackIsNotEmpty()) {
        backtrack();
    }


    function backtrack(): void {
        stackOfVisitedCells.pop();
    }

    function visitedStackIsNotEmpty(): boolean {
        return stackOfVisitedCells.length != 0;
    }

    function currentCellHasNoUnusedExits(): boolean {
        return currentCell().neighbours.filter(cell => cell.visited == false).length == 0;
    }

    function currentCell(): Cell {
        return stackOfVisitedCells[stackOfVisitedCells.length-1];
    }

}



document.getElementById('mazeButton').addEventListener('click', () => myFunction());