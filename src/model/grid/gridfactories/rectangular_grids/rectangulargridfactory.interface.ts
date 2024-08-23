import { Grid } from '../../grid';
import { RectangularGridProperties } from './rectangulargridproperties';

export interface RectangularGridFactory {
    createGrid(gridProperties: RectangularGridProperties): Grid;
}