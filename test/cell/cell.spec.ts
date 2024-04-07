import { expect } from 'chai';
import { Cell } from '../../src/model/grid/cell/cell';
import { Coordinate } from '../../src/model/coordinate';
import { CellFactory } from '../../src/model/grid/cell/cellfactory';
import { Segment } from '../../src/model/segment';

describe('Cell', () => {

    let squareCell1: Cell;
    let squareCell2: Cell;
    let squareCell3: Cell;

    beforeEach(() => {
        const center1: Coordinate = new Coordinate(5, 5);
        squareCell1 = CellFactory.createCell(center1, 10, 'square');
        const center2: Coordinate = new Coordinate(15, 5);
        squareCell2 = CellFactory.createCell(center2, 10, 'square');
        const center3: Coordinate = new Coordinate(25, 5);
        squareCell3 = CellFactory.createCell(center3, 10, 'square');
    });

    it('interconnecting two cells', () => {
        const cell1: Cell = CellFactory.createCell(new Coordinate(10, 10), 2, 'square');
        const cell2: Cell = CellFactory.createCell(new Coordinate(20, 20), 2, 'square');
        cell1.establishConnectionTo(cell2);
        expect(cell1.unvisitedNeighbours.length).to.equal(0);
        expect(cell2.unvisitedNeighbours.length).to.equal(0);
        expect(cell1.hasNoUnvisitedNeighbours).to.equal(true);
        expect(cell2.hasNoUnvisitedNeighbours).to.equal(true);
        expect(cell1.connectedNeighbours[0]).to.equal(cell2);
        expect(cell2.connectedNeighbours[0]).to.equal(cell1);
    });

    it('removing connection between two cells', () => {
        const cell1: Cell = CellFactory.createCell(new Coordinate(10, 10), 2, 'square');
        const cell2: Cell = CellFactory.createCell(new Coordinate(20, 20), 2, 'square');
        cell1.establishConnectionTo(cell2);
        expect(cell1.connectedNeighbours[0]).to.equal(cell2);
        expect(cell2.connectedNeighbours[0]).to.equal(cell1);

        cell1.removeConnectionsToCell();
        expect(cell1.unvisitedNeighbours.length).to.equal(0);
        expect(cell2.unvisitedNeighbours.length).to.equal(0);
        expect(cell1.hasNoUnvisitedNeighbours).to.equal(true);
        expect(cell2.hasNoUnvisitedNeighbours).to.equal(true);
        expect(cell1.connectedNeighbours.length).to.equal(0);
        expect(cell2.connectedNeighbours.length).to.equal(0);
    });

    it('removing all connections a cell has', () => {
        const cell1: Cell = CellFactory.createCell(new Coordinate(10, 10), 2, 'square');
        const cell2: Cell = CellFactory.createCell(new Coordinate(20, 20), 2, 'square');
        cell1.establishConnectionTo(cell2);
        expect(cell1.connectedNeighbours[0]).to.equal(cell2);
        expect(cell2.connectedNeighbours[0]).to.equal(cell1);

        cell1.removeEstablishedConnections();
        expect(cell1.connectedNeighbours.length).to.equal(0);
        expect(cell2.connectedNeighbours.length).to.equal(1);
    });

    it('getting random unvisited neighbour', () => {
        const cell1: Cell = CellFactory.createCell(new Coordinate(10, 10), 2, 'square');
        const cell2: Cell = CellFactory.createCell(new Coordinate(20, 20), 2, 'square');
        cell1.addNeighbour(cell2);
        expect(cell1.randomUnvisitedNeighbour).to.equal(cell2);
    });

    it('should have correct coordinates', () => {
        expect(squareCell1.center.x).to.equal(5);
        expect(squareCell1.center.y).to.equal(5);
    });

    it('should have correct corners', () => {
        const corners: Coordinate[] = squareCell1.corners;
        expect(corners[0].x).to.be.equal(10);
        expect(corners[0].y).to.equal(10);
        expect(corners[1].x).to.equal(0);
        expect(corners[1].y).to.equal(10);
        expect(corners[2].x).to.equal(0);
        expect(corners[2].y).to.equal(0);
        expect(corners[3].x).to.equal(10);
        expect(corners[3].y).to.equal(0);
    });

    it('should have 4 borders when no neighbours', () => {
        const borders: Segment[] = squareCell1.closedBorders;
        expect(borders.length).to.equal(4);
    });

    it('should have 3 borders when one neighbour', () => {
        squareCell1.addNeighbour(squareCell2);
        squareCell2.addNeighbour(squareCell1);
        squareCell1.establishConnectionTo(squareCell2);
        expect(squareCell1.closedBorders.length).to.equal(3);
        expect(squareCell2.closedBorders.length).to.equal(3);
    });

    it('should have 2 closed borders when two neighbours', () => {
        squareCell1.addNeighbour(squareCell2);
        squareCell2.addNeighbour(squareCell1);
        squareCell1.addNeighbour(squareCell3);
        squareCell3.addNeighbour(squareCell1);
        squareCell2.establishConnectionTo(squareCell1);
        squareCell2.establishConnectionTo(squareCell3);

        expect(squareCell1.closedBorders.length).to.equal(3);
        expect(squareCell2.closedBorders.length).to.equal(2);
        expect(squareCell3.closedBorders.length).to.equal(3);
    });

});