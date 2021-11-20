import { Coordinate } from '../model/coordinate';
import { View } from './view';

export class BoxedView extends View {

    private width: number;

    constructor(width: number) {
        super();
        this.width = width;
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

}