import { expect } from 'chai';
import { TriangularGridFactory } from '../../../../src/model/grid/gridfactories/triangulargridfactory';
import { Cell } from '../../../../src/model/grid/cell/cell';
import { Coordinate } from '../../../../src/model/coordinate';
import { RectangularGridProperties } from '../../../../src/model/grid/gridfactories/rectangulargridproperties';


describe('TriangularGridFactory', () => {

    const insertionPoint: Coordinate = new Coordinate(0, 0);
    const triangularGridFactory: TriangularGridFactory = new TriangularGridFactory();

    it('verifying number of neighbours', () => {
        const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 3, 3, 10);
        const cellMatrix: Cell[][] = triangularGridFactory['createCellMatrix'](gridProperties);
        triangularGridFactory['establishNeighbourRelationsInMatrix'](cellMatrix);
        const middleCell: Cell = cellMatrix[1][1];
        expect(middleCell.neighbours.length).to.equal(3);
    });

    it('verifying neighbour count', () => {
        const gridProperties: RectangularGridProperties = new RectangularGridProperties(insertionPoint, 3, 2, 10);
        const cellMatrix: Cell[][] = triangularGridFactory['createCellMatrix'](gridProperties);
        triangularGridFactory['establishNeighbourRelationsInMatrix'](cellMatrix);
        expect(cellMatrix[0].map(cell => cell.neighbours.length)).to.deep.equal([2, 2, 3, 2, 2]);
        expect(cellMatrix[1].map(cell => cell.neighbours.length)).to.deep.equal([2, 3, 3, 3, 2]);
        expect(cellMatrix[2].map(cell => cell.neighbours.length)).to.deep.equal([1, 3, 2, 3, 1]);
    });

});