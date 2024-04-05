import { Grid } from '../grid';

export interface GridFactory {
    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid;
}