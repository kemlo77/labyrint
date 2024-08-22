import { Cell } from '../../cell/cell';
import { Grid } from '../../grid';
import { FramedGridFactory } from '../framedgridfactory';
import { RectangularGridProperties } from '../rectangular_grids/rectangulargridproperties';

export class AlternativeTriangularGridFactory extends FramedGridFactory {

    createGrid(gridProperties: RectangularGridProperties): Grid {
        const cellGrid: Cell[][] = this.createCellMatrix(gridProperties);
        this.establishNeighbourRelationsInMatrix(cellGrid);

        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][0];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }

    private createCellMatrix(gridProperties: RectangularGridProperties): Cell[][] {
        throw new Error('Method not implemented.');
    }

    private establishNeighbourRelationsInMatrix(cellGrid: Cell[][]): void {
        throw new Error('Method not implemented.');
    }

}