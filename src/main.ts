import './style.css';
import { Controller } from './controller';
import { Model } from './model/model';
import { StandardView } from './view/standardview';

const canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
const generateButton: HTMLButtonElement = document.getElementById('generateButton') as HTMLButtonElement;
const simplifyButton: HTMLButtonElement = document.getElementById('simplifyButton') as HTMLButtonElement;
const showTrailButton: HTMLButtonElement = document.getElementById('showTrailButton') as HTMLButtonElement;
const hideTrailButton: HTMLButtonElement = document.getElementById('hideTrailButton') as HTMLButtonElement;
const mazeTypeRadioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="mazeType"]');

const model: Model = new Model();
const view: StandardView = new StandardView(canvasElement, model);
const controller: Controller = new Controller(model, view);
controller.changeGridType('square');


generateButton.addEventListener('click', () => controller.generateLabyrinth());
simplifyButton.addEventListener('click', () => model.reduceSomeComplexity());
showTrailButton.addEventListener('click', () => controller.showSolution());
hideTrailButton.addEventListener('click', () => controller.hideSolution());

mazeTypeRadioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        if (radioButton.checked) {
            controller.changeGridType(radioButton.value);
        }
    });
});