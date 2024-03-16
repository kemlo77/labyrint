import { Coordinate } from '../model/coordinate';
import { Model } from '../model/model';
import { Observer } from '../observer';

export abstract class View implements Observer {

    private _canvasElement: HTMLCanvasElement;
    private _canvasCtx: CanvasRenderingContext2D;
    protected whiteColor: string = 'rgba(255,255,255,1)';
    protected blackColor: string = 'rgba(0,0,0,1)';
    protected trailColor: string = 'rgba(0,0,255,1)';
    protected _model: Model;

    constructor(canvasElement: HTMLCanvasElement, model: Model) {
        this._canvasElement = canvasElement;
        this._canvasCtx = this._canvasElement.getContext('2d');
        this._model = model;
    }

    abstract update(): void;
    abstract showSolution(): void;
    abstract hideSolution(): void;

    protected clearTheCanvas(): void {
        this._canvasCtx.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
    }

    protected paintCellCenter(centerPoint: Coordinate, radius: number, fillColor: string): void {
        this._canvasCtx.fillStyle = fillColor;
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
        this._canvasCtx.fill();
    }

    protected drawLine(fromPoint: Coordinate, toPoint: Coordinate, width: number, color: string): void {
        this._canvasCtx.strokeStyle = color;
        this._canvasCtx.lineWidth = width;
        this._canvasCtx.lineCap = 'round';
        this._canvasCtx.beginPath();
        this._canvasCtx.moveTo(fromPoint.x, fromPoint.y);
        this._canvasCtx.lineTo(toPoint.x, toPoint.y);
        this._canvasCtx.stroke();
    }

    protected fillPolygon(corners: Coordinate[], fillColor: string, borderColor: string): void {
        this._canvasCtx.fillStyle = fillColor;
        this._canvasCtx.strokeStyle = borderColor;
        this._canvasCtx.lineWidth = 1;
        this._canvasCtx.beginPath();
        const firstCorner: Coordinate = corners.shift();
        this._canvasCtx.moveTo(firstCorner.x, firstCorner.y);
        corners.forEach(corner => this._canvasCtx.lineTo(corner.x, corner.y));
        this._canvasCtx.fill();
        this._canvasCtx.stroke();
    }

}