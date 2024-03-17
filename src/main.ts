import './style.css';
import { Controller } from './controller';
import { Model } from './model/model';
import { StandardView } from './view/standardview';
import { GridSupplier } from './model/grid/gridsupplier';

const canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;

const model: Model = new Model();
const view: StandardView = new StandardView(canvasElement, model);
const controller: Controller = new Controller(model, view);

document.getElementById('squareMazeButton').addEventListener('click', () => createSquareMaze());
document.getElementById('hexagonalMazeButton').addEventListener('click', () => createHexagonalMaze());
document.getElementById('triangularMazeButton').addEventListener('click', () => createTriangularMaze());
document.getElementById('octagonalMazeButton').addEventListener('click', () => createOctagonalMaze());

document.getElementById('simplifyButton').addEventListener('click', () => model.reduceSomeComplexity());
document.getElementById('showTrailButton').addEventListener('click', () => controller.showSolution());
document.getElementById('hideTrailButton').addEventListener('click', () => controller.hideSolution());

function createSquareMaze(): void {
    model.grid = GridSupplier.getGrid('square');
    controller.generateLabyrinth();
}

function createHexagonalMaze(): void {
    model.grid = GridSupplier.getGrid('hexagonal');
    controller.generateLabyrinth();
}

function createTriangularMaze(): void {
    model.grid = GridSupplier.getGrid('triangular');
    controller.generateLabyrinth();
}

function createOctagonalMaze(): void {
    model.grid = GridSupplier.getGrid('octagonal');
    controller.generateLabyrinth();
}
