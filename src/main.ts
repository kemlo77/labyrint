import './style.css';
import { Controller } from './controller';
import { Model } from './model/model';
import { RectangularGrid } from './model/rectangulargrid';
import { RoundedView } from './view/roundedview';
import { HexagonalGrid } from './model/hexagonalgrid';
import { BoxedView } from './view/boxedview';

const model: Model = new Model();
const controller: Controller = new Controller(model);

document.getElementById('squareMazeButton').addEventListener('click', () => createSquareMaze());
document.getElementById('hexagonalMazeButton').addEventListener('click', () => createHexagonalMaze());

function createSquareMaze(): void {
    model.grid = new RectangularGrid(45,45,11);
    model.view = new BoxedView(10);
    controller.aMazeMe();
}

function createHexagonalMaze(): void {
    model.grid = new HexagonalGrid(38,44,13);
    model.view = new RoundedView(10);
    controller.aMazeMe();
}
