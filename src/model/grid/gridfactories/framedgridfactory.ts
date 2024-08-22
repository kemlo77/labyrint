import { Grid } from '../grid';
import { GridFactory } from './gridfactory';
import { RectangularGridProperties } from './rectangular_grids/rectangulargridproperties';

export abstract class FramedGridFactory extends GridFactory {
    abstract createGrid(gridProperties: RectangularGridProperties): Grid;
}