import { Coordinate } from '../../coordinate';
import { Grid } from '../grid';
import { GridFactory } from './gridfactory';

export abstract class UnframedGridFactory extends GridFactory {

    abstract createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number,
        insertionPoint?: Coordinate): Grid;

}
