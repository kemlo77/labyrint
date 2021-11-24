import { Coordinate } from '../model/coordinate';
import { View } from './view';

export class HoneycombView extends View {

    constructor(private width: number) {
        super();
    }
    
    drawConnection(startPoint: Coordinate, endPoint: Coordinate): void {
        this.drawFilledHexagon(startPoint, this.width, this.mazeColor);
        this.drawFilledHexagon(endPoint, this.width, this.mazeColor);
        const quarterHeight: number = this.width/Math.sqrt(3)/2;
        this.drawLine(startPoint, endPoint, quarterHeight * 2, this.mazeColor);
    }

    private drawFilledHexagon(center: Coordinate, width: number, color: string): void {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(center.x + halfWidth, center.y + quarterHeight);
        this.canvasCtx.lineTo(center.x, center.y + 2 * quarterHeight);
        this.canvasCtx.lineTo(center.x - halfWidth, center.y + quarterHeight);
        this.canvasCtx.lineTo(center.x - halfWidth, center.y - quarterHeight);
        this.canvasCtx.lineTo(center.x, center.y - 2 * quarterHeight);
        this.canvasCtx.lineTo(center.x + halfWidth, center.y - quarterHeight);
        this.canvasCtx.closePath();
        this.canvasCtx.fill();
    }

    fillCell(center: Coordinate): void {
        this.drawFilledHexagon(center, this.width+3, 'rgba(0,0,0,1)');
    }

}