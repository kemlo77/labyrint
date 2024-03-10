import { Cell } from '../model/grid/cell/cell';
import { Coordinate } from '../model/coordinate';
import { View } from './view';

export class RoundedView extends View {

    constructor(private width: number) {
        super();
    }

    drawConnection(startPoint: Coordinate, endPoint: Coordinate): void {
        this.drawLine(startPoint, endPoint, this.width, this.whiteColor);
    }

    fillCell(cell: Cell): void {
        this.canvasCtx.fillStyle = 'rgba(0,0,0,1)';
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(cell.center.x, cell.center.y, (this.width + 3) / 2, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }

    drawCellBorders(cells: Cell[]): void {
        throw new Error('Method not implemented.');
    }

}