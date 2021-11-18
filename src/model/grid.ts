import { Cell } from './cell';

export abstract class Grid {

    abstract grid: Cell[][];

    abstract totalNumberOfCells: number;

    abstract startCell: Cell;

    public abstract resetVisited(): void;

    abstract numberOfVisitedCells: number;
}