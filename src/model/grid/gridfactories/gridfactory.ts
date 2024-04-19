import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';

export abstract class GridFactory {
    abstract createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid;

    protected createSequenceOfCells(
        startCoordinate: Coordinate,
        stepVector: Vector,
        cellsToCreate: number,
        createCell: CellCreator
    ): Cell[] {
        const cellSequence: Cell[] = [];
        for (let stepNumber: number = 0; stepNumber < cellsToCreate; stepNumber++) {
            const newCellCenter: Coordinate = startCoordinate.newRelativeCoordinate(stepVector, stepNumber);
            cellSequence.push(createCell(newCellCenter));
        }
        return cellSequence;
    }

    protected establishNeighbourRelationsInRows(cellMatrix: Cell[][]): void {
        const transposedCellMatrix: Cell[][] = MatrixOperations.transpose(cellMatrix);
        for (const column of transposedCellMatrix) {
            this.establishNeighbourRelationsInSequence(column);
        }
    }

    protected establishNeighbourRelationsInColumns(cellMatrix: Cell[][]): void {
        for (const column of cellMatrix) {
            this.establishNeighbourRelationsInSequence(column);
        }
    }

    protected establishNeighbourRelationsInSequence(sequence: Cell[]): void {
        for (let cellIndex: number = 0; cellIndex < sequence.length; cellIndex++) {
            const notOnTheLastCell: boolean = cellIndex !== sequence.length - 1;
            if (notOnTheLastCell) {
                const cell: Cell = sequence[cellIndex];
                const nextCell: Cell = sequence[cellIndex + 1];
                cell.establishNeighbourRelationTo(nextCell);
            }
        }
    }

}