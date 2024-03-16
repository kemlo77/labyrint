import { Coordinate } from '../model/coordinate';
import { Model } from '../model/model';
import { Observer } from '../observer';

export abstract class View implements Observer {

    private canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    protected whiteColor: string = 'rgba(255,255,255,1)';
    protected blackColor: string = 'rgba(0,0,0,1)';
    private trailColor: string = 'rgba(0,0,255,1)';
    protected _model: Model;

    constructor(model: Model) {
        this._model = model;
    }

    abstract update(): void;
    abstract showSolution(): void;
    abstract hideSolution(): void;

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    paintCellCenter(centerPoint: Coordinate): void {
        this.canvasCtx.fillStyle = this.blackColor;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(centerPoint.x, centerPoint.y, 3, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }

    drawTrail(startPoint: Coordinate, endPoint: Coordinate): void {
        this.canvasCtx.strokeStyle = this.trailColor;
        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(startPoint.x, startPoint.y);
        this.canvasCtx.lineTo(endPoint.x, endPoint.y);
        this.canvasCtx.stroke();
    }

    concealTrail(startPoint: Coordinate, endPoint: Coordinate): void {
        this.canvasCtx.strokeStyle = this.whiteColor;
        this.canvasCtx.lineWidth = 4;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(startPoint.x, startPoint.y);
        this.canvasCtx.lineTo(endPoint.x, endPoint.y);
        this.canvasCtx.stroke();
    }

    protected drawLine(fromPoint: Coordinate, toPoint: Coordinate, width: number, color: string): void {
        this.canvasCtx.strokeStyle = color;
        this.canvasCtx.lineWidth = width;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(fromPoint.x, fromPoint.y);
        this.canvasCtx.lineTo(toPoint.x, toPoint.y);
        this.canvasCtx.stroke();
    }

    protected fillPolygon(corners: Coordinate[], fillColor: string, borderColor: string): void {
        this.canvasCtx.fillStyle = fillColor;
        this.canvasCtx.strokeStyle = borderColor;
        this.canvasCtx.lineWidth = 1;
        this.canvasCtx.beginPath();
        const firstCorner: Coordinate = corners.shift();
        this.canvasCtx.moveTo(firstCorner.x, firstCorner.y);
        corners.forEach(corner => this.canvasCtx.lineTo(corner.x, corner.y));
        this.canvasCtx.fill();
        this.canvasCtx.stroke();
    }

}