import { Cell } from '../model/grid/cell/cell';
import { Model } from '../model/model';
import { Observer } from '../observer';
import { CanvasPainter, BLACK_COLOR, BLUE_COLOR, WHITE_COLOR } from './canvaspainter';

export class View implements Observer {

    private _model: Model;
    private _canvasPainter: CanvasPainter;


    constructor(canvasPainter: CanvasPainter, model: Model) {
        this._canvasPainter = canvasPainter;
        this._model = model;
        this._model.attachObserver(this);
    }

    update(): void {
        this._canvasPainter.clearTheCanvas();
        this.shadeDisconnectedCells();
        this.drawAllCellBorders();
    }

    private shadeDisconnectedCells(): void {
        this._model.grid.allDisconnectedCells
            .forEach(cell => this.fillCell(cell, BLACK_COLOR, BLACK_COLOR));
    }

    private fillCell(cell: Cell, fillColor: string, borderColor: string): void {
        this._canvasPainter.fillPolygon(cell.corners, fillColor, borderColor);
    }

    private drawAllCellBorders(): void {
        this._model.grid.allCells.forEach(cell => {
            this._canvasPainter.drawSegments(cell.closedBorders, 1, BLACK_COLOR);
        });
    }

    public showSolution(): void {
        this._canvasPainter.drawSegments(this._model.solutionTrail, 2, BLUE_COLOR);
    }

    public hideSolution(): void {
        this._canvasPainter.drawSegments(this._model.solutionTrail, 4, WHITE_COLOR);
    }

}