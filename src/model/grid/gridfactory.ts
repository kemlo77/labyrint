import { Grid } from './grid';

export abstract class GridFactory {
    abstract createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid;
}