import { expect } from 'chai';
import { Cell } from '../src/model/cell';

describe('Cell', () => {

    it('interconnecting two cells', () => {
        const cell1: Cell = new Cell(10,10);
        const cell2: Cell = new Cell(20,20);
        cell1.interconnectToCell(cell2);
        expect(cell1.connectedNeighbouringCells[0]).to.equal(cell2);
        expect(cell2.connectedNeighbouringCells[0]).to.equal(cell1);
    });

    it('removing connection between two cells', () => {
        const cell1: Cell = new Cell(10,10);
        const cell2: Cell = new Cell(20,20);
        cell1.interconnectToCell(cell2);
        expect(cell1.connectedNeighbouringCells[0]).to.equal(cell2);
        expect(cell2.connectedNeighbouringCells[0]).to.equal(cell1);

        cell1.removeInterConnectionsToCell();
        expect(cell1.connectedNeighbouringCells.length).to.equal(0);
        expect(cell2.connectedNeighbouringCells.length).to.equal(0);
    });




});