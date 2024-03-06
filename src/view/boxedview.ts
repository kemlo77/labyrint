import { Cell } from '../model/cell';
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

    //TODO: lågnivå-grejer som canvasCtx borde ligga i View
    //I den här klassen borde det vara på en annan abstraktionsnivå
    fillCell(cell: Cell): void {
        const corners: Coordinate[] = cell.corners;
        this.canvasCtx.fillStyle= 'rgba(0,0,0,1)';
        this.canvasCtx.strokeStyle= 'rgba(0,0,0,1)';
        this.canvasCtx.lineWidth = 1;
        this.canvasCtx.beginPath();
        const firstCorner: Coordinate = corners.shift();
        this.canvasCtx.moveTo(firstCorner.x, firstCorner.y);
        corners.forEach(corner => this.canvasCtx.lineTo(corner.x, corner.y));
        this.canvasCtx.fill();
        this.canvasCtx.stroke();
    }

    drawCellBorders(cells: Cell[]): void {
        cells.forEach(cell => {
            cell.closedBorders.forEach(border => {
                this.drawLine(border.p1, border.p2, 1, 'rgba(0,0,0,1)');
            });
        });
    }

}