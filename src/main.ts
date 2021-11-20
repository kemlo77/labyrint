import './style.css';
import {View} from './view/view';
import { Controller } from './controller';
import { Model } from './model/model';
import { RectangularGrid } from './model/rectangulargrid';
import { RoundedView } from './view/roundedview';
import { Grid } from './model/grid';
import { HexagonalGrid } from './model/hexagonalgrid';
import { BoxedView } from './view/boxedview';


const view: View = new BoxedView(10);
const grid: Grid = new RectangularGrid(45,45,11);
//const view: View = new RoundedView(9);
//const grid: Grid = new HexagonalGrid(40,47,14);
const model: Model = new Model(grid, view);
const controller: Controller = new Controller(model);


document.getElementById('mazeButton').addEventListener('click', () => controller.aMazeMe());