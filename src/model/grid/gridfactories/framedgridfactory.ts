import { Grid } from '../grid';
import { GridFactory } from './gridfactory';
import { RectangularGridProperties } from './rectangulargridproperties';

export abstract class FramedGridFactory extends GridFactory {
    abstract createGrid(gridProperties: RectangularGridProperties): Grid;
}