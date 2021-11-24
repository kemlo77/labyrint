import { Coordinate } from '../model/coordinate';
import { View } from './view';

export class RoundedView extends View {

    constructor(private width: number) {
        super();
    }
    
    drawConnection(startPoint: Coordinate, endPoint: Coordinate): void {
        this.drawLine(startPoint, endPoint, this.width, this.mazeColor);
    }

    fillCell(center: Coordinate): void {
        this.canvasCtx.fillStyle = 'rgba(0,0,0,1)';
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(center.x, center.y, (this.width+3)/2, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }

}