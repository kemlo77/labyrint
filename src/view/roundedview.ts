import { View } from './view';

export class RoundedView extends View {

    private width: number;

    constructor(width: number) {
        super();
        this.width = width;
    }
    
    drawConnection(x1: number, y1: number, x2:number, y2: number): void {
        this.canvasCtx.strokeStyle = 'rgba(255,255,255,1)';
        this.canvasCtx.lineWidth = this.width;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(x1, y1);
        this.canvasCtx.lineTo(x2, y2);
        this.canvasCtx.stroke();
    }

}