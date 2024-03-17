import './style.css';
import { Controller } from './controller';
import { Model } from './model/model';
import { StandardView } from './view/standardview';

const canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
const squareMazeBtn: HTMLButtonElement = document.getElementById('squareMazeButton') as HTMLButtonElement;
const hexagonalMazeBtn: HTMLButtonElement = document.getElementById('hexagonalMazeButton') as HTMLButtonElement;
const triangularMazeBtn: HTMLButtonElement = document.getElementById('triangularMazeButton') as HTMLButtonElement;
const octagonalMazeBtn: HTMLButtonElement = document.getElementById('octagonalMazeButton') as HTMLButtonElement;
const generateButton: HTMLButtonElement = document.getElementById('generateButton') as HTMLButtonElement;
const simplifyButton: HTMLButtonElement = document.getElementById('simplifyButton') as HTMLButtonElement;
const showTrailButton: HTMLButtonElement = document.getElementById('showTrailButton') as HTMLButtonElement;
const hideTrailButton: HTMLButtonElement = document.getElementById('hideTrailButton') as HTMLButtonElement;


const model: Model = new Model();
const view: StandardView = new StandardView(canvasElement, model);
const controller: Controller = new Controller(model, view);
controller.changeGridType('square');

squareMazeBtn.addEventListener('click', () => controller.changeGridType('square'));
hexagonalMazeBtn.addEventListener('click', () => controller.changeGridType('hexagonal'));
triangularMazeBtn.addEventListener('click', () => controller.changeGridType('triangular'));
octagonalMazeBtn.addEventListener('click', () => controller.changeGridType('octagonal'));

generateButton.addEventListener('click', () => controller.generateLabyrinth());

simplifyButton.addEventListener('click', () => model.reduceSomeComplexity());
showTrailButton.addEventListener('click', () => controller.showSolution());
hideTrailButton.addEventListener('click', () => controller.hideSolution());