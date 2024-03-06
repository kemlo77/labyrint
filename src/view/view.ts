import { Cell } from '../model/cell';
import { Coordinate } from '../model/coordinate';

export abstract class View {

    private canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    protected mazeColor: string = 'rgba(255,255,255,1)';
    private trailColor: string = 'rgba(0,0,255,1)';

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    abstract drawConnection(startPoint: Coordinate, endPoint: Coordinate): void;
    abstract fillCell(cell: Cell): void;
    abstract drawCellBorders(cells: Cell[]): void;

    paintCellCenter(centerPoint: Coordinate): void {
        this.canvasCtx.fillStyle = this.mazeColor;
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
        this.canvasCtx.strokeStyle = this.mazeColor;
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

}