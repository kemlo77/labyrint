import { Grid } from '../../grid';
import { ComplexGridProperties } from './complexgridproperties';

export interface ComplexGridFactory {
    createGrid(gridProperties: ComplexGridProperties): Grid;
}