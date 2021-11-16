import './style.css';
import {View} from './view';
import { Controller } from './controller';
import { Model } from './model';
import { RectangularGrid } from './rectangulargrid';

const view: View = new View();
const grid: RectangularGrid = new RectangularGrid(50,50,10);
const model: Model = new Model(grid, view);
const controller: Controller = new Controller(model);


document.getElementById('mazeButton').addEventListener('click', () => controller.aMazeMe());