import { Grid } from '../../grid';
import { RegularShapedGridProperties } from './regularshapedgridproperties';

export interface RegularShapedGridFactory {
    createGrid(gridProperties: RegularShapedGridProperties): Grid;
}