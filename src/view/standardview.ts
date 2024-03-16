import { Cell } from '../model/grid/cell/cell';
import { View } from './view';
import { Model } from '../model/model';

export class StandardView extends View {

    constructor(model: Model) {
        super(model);
        this._model.attachObserver(this);
    }

    update(): void {
        this.clearTheCanvas();
        this.shadeDisconnectedCells();
        this.drawAllCellBorders();
    }

    private shadeDisconnectedCells(): void {
        this._model.grid.allCells
            .filter(cell => cell.connectedNeighbours.length == 0)
            .forEach(cell => this.fillCell(cell, this.blackColor, this.blackColor));
    }

    private fillCell(cell: Cell, fillColor: string, borderColor: string): void {
        this.fillPolygon(cell.corners, fillColor, borderColor);
    }

    private drawAllCellBorders(): void {
        this._model.grid.allCells.forEach(cell => {
            cell.closedBorders.forEach(border => {
                this.drawLine(border.p1, border.p2, 1, this.blackColor);
            });
        });
    }

    public showSolution(): void {
        const solutionSequence: Cell[] = this._model.solutionSequence;
        for (let index: number = 0; index < solutionSequence.length - 1; index++) {
            const currentCell: Cell = solutionSequence[index];
            const nextCell: Cell = solutionSequence[index + 1];
            this.drawTrail(currentCell.center, nextCell.center);
        }
    }

    public hideSolution(): void {
        const solutionSequence: Cell[] = this._model.solutionSequence;
        for (let index: number = 0; index < solutionSequence.length - 1; index++) {
            const currentCell: Cell = solutionSequence[index];
            const nextCell: Cell = solutionSequence[index + 1];
            this.concealTrail(currentCell.center, nextCell.center);
        }
    }

}