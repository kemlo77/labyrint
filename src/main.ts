import './style.css';
import {View} from './view';
import { Controller } from './controller';

const view: View = new View();
const controller: Controller = new Controller(view);


document.getElementById('mazeButton').addEventListener('click', () => controller.myFunction());