import { Coordinate } from '../model/coordinate';
import { View } from './view';

export class BoxedView extends View {

    constructor(private width: number) {
        super();
    }
    
    drawConnection(startPoint: Coordinate, endPoint: Coordinate): void {
        this.canvasCtx.strokeStyle = 'rgba(255,255,255,1)';
        this.canvasCtx.lineWidth = this.width;
        this.canvasCtx.lineCap = 'square';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(startPoint.x, startPoint.y);
        this.canvasCtx.lineTo(endPoint.x, endPoint.y);
        this.canvasCtx.stroke();
    }

    fillCell(center: Coordinate): void {
        this.canvasCtx.fillStyle= 'rgba(0,0,0,1)';
        const squareWidth: number = this.width+1;
        this.canvasCtx.rect(center.x-squareWidth/2,center.y-squareWidth/2, squareWidth, squareWidth);
        this.canvasCtx.fill();
    }

}