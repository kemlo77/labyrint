import { Coordinate } from '../../coordinate';
import { rightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
import { Grid } from '../grid';
import { DiagonalSquareGridFactory } from './diagonalsquaregridfactory';
import { FramedGridFactory } from './framedgridfactory';
import { GridProperties } from './gridproperties';
import { SquareGridFactory } from './squaregridfactory';

export class ComplexGridFactory extends FramedGridFactory {

    createGrid(gridProperties: GridProperties): Grid {
        const cellWidth: number = 20;
        const mult: number = 3;
        const rightStep: Vector = rightUnitVector.scale(cellWidth);
        const upStep: Vector = upUnitVector.scale(cellWidth);
        
        const w1: number = 5 * mult;
        const w2: number = 2 * mult;
        const w3: number = 9 * mult;
        const w4: number = 16 * mult;
        const h1: number = 4 * mult;
        const h2: number = 2 * mult;


        const insertionPoint1: Coordinate = new Coordinate(10, 10);

        const insertionPoint4: Coordinate = insertionPoint1.newRelativeCoordinate(upStep.scale(h1));
        const insertionPoint5: Coordinate = insertionPoint1.newRelativeCoordinate(upStep.scale(h1 + h2));

        const firstRowGrid: Grid = createEdgeGrid(insertionPoint1);
        const secondRowGrid: Grid = createMiddleRowGrid(insertionPoint4);
        const thirdRowGrid: Grid = createEdgeGrid(insertionPoint5);

        return firstRowGrid.mergeWith(secondRowGrid).mergeWith(thirdRowGrid);

        function createMiddleRowGrid(insertionPoint: Coordinate): Grid {
            const gridProperties4: GridProperties = new GridProperties(insertionPoint, w4, h2, cellWidth);
            return new SquareGridFactory().createGrid(gridProperties4);
        }

        function createEdgeGrid(insertionPoint: Coordinate): Grid {
            const insertionPoint2: Coordinate = insertionPoint.newRelativeCoordinate(rightStep.scale(w1));
            const insertionPoint3: Coordinate = insertionPoint.newRelativeCoordinate(rightStep.scale(w1+w2));
            const gridProperties1: GridProperties = new GridProperties(insertionPoint, w1, h1, cellWidth);
            const gridProperties2: GridProperties = new GridProperties(insertionPoint2, w2, h1, cellWidth);
            const gridProperties3: GridProperties = new GridProperties(insertionPoint3, w3, h1, cellWidth);
            const grid1: Grid = new DiagonalSquareGridFactory().createGrid(gridProperties1);
            const grid2: Grid = new SquareGridFactory().createGrid(gridProperties2);
            const grid3: Grid = new DiagonalSquareGridFactory().createGrid(gridProperties3);
            return grid1.mergeWith(grid2).mergeWith(grid3);
        }
        

    }
    
}