import { Coordinate } from '../model/coordinate';

export abstract class View {

    private canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    abstract drawConnection(startPoint: Coordinate, endPoint: Coordinate): void;

    paintCellCenter(centerPoint: Coordinate): void {
        this.canvasCtx.fillStyle = 'rgba(255,0,0,1)';
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(centerPoint.x, centerPoint.y, 3, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }

    drawTrail(startPoint: Coordinate, endPoint: Coordinate): void {
        this.canvasCtx.strokeStyle = 'rgba(0,0,255,1)';
        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(startPoint.x, startPoint.y);
        this.canvasCtx.lineTo(endPoint.x, endPoint.y);
        this.canvasCtx.stroke();
    }

}