import { expect } from 'chai';
import { Cell } from '../src/model/grid/cell/cell';
import { Coordinate } from '../src/model/coordinate';
import { SquareCell } from '../src/model/grid/cell/squarecell';

describe('Cell', () => {

    it('interconnecting two cells', () => {
        const cell1: Cell = new SquareCell(new Coordinate(10, 10), 2);
        const cell2: Cell = new SquareCell(new Coordinate(20, 20), 2);
        cell1.establishConnectionTo(cell2);
        expect(cell1.connectedNeighbours[0]).to.equal(cell2);
        expect(cell2.connectedNeighbours[0]).to.equal(cell1);
    });

    it('removing connection between two cells', () => {
        const cell1: Cell = new SquareCell(new Coordinate(10, 10), 2);
        const cell2: Cell = new SquareCell(new Coordinate(20, 20), 2);
        cell1.establishConnectionTo(cell2);
        expect(cell1.connectedNeighbours[0]).to.equal(cell2);
        expect(cell2.connectedNeighbours[0]).to.equal(cell1);

        cell1.removeConnectionsToCell();
        expect(cell1.connectedNeighbours.length).to.equal(0);
        expect(cell2.connectedNeighbours.length).to.equal(0);
    });




});