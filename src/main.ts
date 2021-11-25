import './style.css';
import { Controller } from './controller';
import { Model } from './model/model';
import { RectangularGrid } from './model/rectangulargrid';
import { HexagonalGrid } from './model/hexagonalgrid';
import { RoundedView } from './view/roundedview';
import { BoxedView } from './view/boxedview';
import { HoneycombView } from './view/honeycombview';

const model: Model = new Model();
const controller: Controller = new Controller(model);

document.getElementById('squareMazeButton').addEventListener('click', () => createSquareMaze());
document.getElementById('roundedMazeButton').addEventListener('click', () => createRoundedMaze());
document.getElementById('hexagonalMazeButton').addEventListener('click', () => createHexagonalMaze());

document.getElementById('simplifyButton').addEventListener('click', () => model.reduceSomeComplexity());
document.getElementById('showTrailButton').addEventListener('click', () => model.showSolution());
document.getElementById('hideTrailButton').addEventListener('click', () => model.hideSolution());

function createSquareMaze(): void {
    model.grid = new RectangularGrid(69,43,15);
    model.view = new BoxedView(14);
    controller.generateLabyrinth();
}

function createRoundedMaze(): void {
    model.grid = new HexagonalGrid(51,37,20);
    model.view = new RoundedView(16);
    controller.generateLabyrinth();
}

function createHexagonalMaze(): void {
    model.grid = new HexagonalGrid(51,37,20);
    model.view = new HoneycombView(18);
    controller.generateLabyrinth();
}
