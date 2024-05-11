import { Grid } from '../grid';
import { GridFactory } from './gridfactory';
import { GridProperties } from './gridproperties';

export abstract class FramedGridFactory extends GridFactory {
    abstract createGrid(gridProperties: GridProperties): Grid;
}