import './style.css';
import { Controller } from './controller';
import { Model } from './model/model';
import { RectangularGrid } from './model/rectangulargrid';
import { RoundedView } from './view/roundedview';
import { HexagonalGrid } from './model/hexagonalgrid';
import { BoxedView } from './view/boxedview';

const model: Model = new Model();
setGridAndViewInModel('square-maze');
const controller: Controller = new Controller(model);

document.getElementById('mazeButton').addEventListener('click', () => controller.aMazeMe());

document.querySelectorAll('input[name="mazeType"]').forEach((elem) => {
    elem.addEventListener('change', (event) => {
        const item: string = (event.target as HTMLInputElement).value;
        setGridAndViewInModel(item);
    });
});

function setGridAndViewInModel(type: string): void {
    if( type == 'square-maze') {
        model.grid = new RectangularGrid(45,45,11);
        model.view = new BoxedView(10);
    } else {
        model.grid = new HexagonalGrid(38,44,13);
        model.view = new RoundedView(10);
    }
}
