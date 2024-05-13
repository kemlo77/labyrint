import { Coordinate } from '../../coordinate';
import { Grid } from '../grid';
import { DiagonalSquareGridFactory } from './diagonalsquaregridfactory';
import { FramedGridFactory } from './framedgridfactory';
import { GridProperties } from './gridproperties';
import { SquareGridFactory } from './squaregridfactory';

export class ComplexGridFactory extends FramedGridFactory {

    createGrid(gridProperties: GridProperties): Grid {
        const cellWidth: number = 30;
        const w1: number = 5;
        const w2: number = 2;
        const w3: number = 9;
        const w4: number = 16;
        const h1: number = 4;
        const h2: number = 2;
        const mult: number = 2;

        const insertionPoint1: Coordinate = new Coordinate(10, 10);
        const insertionPoint2: Coordinate = new Coordinate(10 + w1*mult*cellWidth, 10);
        const insertionPoint3: Coordinate = new Coordinate(10 + (w1+w2)*mult*cellWidth, 10);
        const insertionPoint4: Coordinate = new Coordinate(10, 10 + h1*mult*cellWidth);
        const insertionPoint5: Coordinate = new Coordinate(10 , 10 + (h1+h2)*mult*cellWidth);
        const insertionPoint6: Coordinate = new Coordinate(10 + w1*mult*cellWidth, 10 + (h1+h2)*mult*cellWidth);
        const insertionPoint7: Coordinate = new Coordinate(10 + (w1+w2)*mult*cellWidth, 10 + (h1+h2)*mult*cellWidth);
        const gridProperties1: GridProperties = new GridProperties(insertionPoint1, w1* mult, h1*mult, cellWidth);
        const gridProperties2: GridProperties = new GridProperties(insertionPoint2, w2*mult, h1*mult, cellWidth);
        const gridProperties3: GridProperties = new GridProperties(insertionPoint3, w3*mult, h1*mult, cellWidth);
        const gridProperties4: GridProperties = new GridProperties(insertionPoint4, w4*mult, h2*mult, cellWidth);
        const gridProperties5: GridProperties = new GridProperties(insertionPoint5, w1*mult, h1*mult, cellWidth);
        const gridProperties6: GridProperties = new GridProperties(insertionPoint6, w2*mult, h1*mult, cellWidth);
        const gridProperties7: GridProperties = new GridProperties(insertionPoint7, w3*mult, h1*mult, cellWidth);
        const grid1: Grid = new DiagonalSquareGridFactory().createGrid(gridProperties1);
        const grid2: Grid = new SquareGridFactory().createGrid(gridProperties2);
        const grid3: Grid = new DiagonalSquareGridFactory().createGrid(gridProperties3);
        const grid4: Grid = new SquareGridFactory().createGrid(gridProperties4);
        const grid5: Grid = new DiagonalSquareGridFactory().createGrid(gridProperties5);
        const grid6: Grid = new SquareGridFactory().createGrid(gridProperties6);
        const grid7: Grid = new DiagonalSquareGridFactory().createGrid(gridProperties7);
        
        grid1.establishNeighbourRelationsWith(grid2);
        grid2.establishNeighbourRelationsWith(grid3);
        grid4.establishNeighbourRelationsWith(grid1);
        grid4.establishNeighbourRelationsWith(grid2);
        grid4.establishNeighbourRelationsWith(grid3);
        grid5.establishNeighbourRelationsWith(grid4);
        grid6.establishNeighbourRelationsWith(grid5);
        grid6.establishNeighbourRelationsWith(grid4);
        grid7.establishNeighbourRelationsWith(grid6);
        grid7.establishNeighbourRelationsWith(grid4);
        grid1.startCell.visited = false;
        grid2.startCell.visited = false;
        grid3.startCell.visited = false;
        grid4.startCell.visited = false;
        grid5.startCell.visited = false;
        grid6.startCell.visited = false;
        grid7.startCell.visited = false;
        return new Grid(
            [
                ...grid1.allCells,
                ...grid2.allCells,
                ...grid3.allCells,
                ...grid4.allCells,
                ...grid5.allCells,
                ...grid6.allCells,
                ...grid7.allCells
            ], grid1.startCell, grid7.endCell);
    }
    
}