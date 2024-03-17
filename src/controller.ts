import { GridSupplier } from './model/grid/gridsupplier';
import { Model } from './model/model';
import { View } from './view/view';

export class Controller {

    private _model: Model;
    private _view: View;

    constructor(model: Model, view: View) {
        this._model = model;
        this._view = view;
    }

    public changeGridType(gridType: string): void {
        this._model.changeGridType(gridType);
        this._model.generateLabyrinth();
    }

    public generateLabyrinth(): void {
        this._model.generateLabyrinth();
    }

    public showSolution(): void {
        this._view.showSolution();
    }

    public hideSolution(): void {
        this._view.hideSolution();
    }
}