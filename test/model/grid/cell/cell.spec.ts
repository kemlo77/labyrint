import { expect } from 'chai';
import { Cell } from '../../../../src/model/grid/cell/cell';
import { Coordinate } from '../../../../src/model/coordinate';
import { CellFactory } from '../../../../src/model/grid/cell/cellfactory';
import { Segment } from '../../../../src/model/segment';

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

    it('establishing neighbour relation between two cells', () => {
        squareCell1.establishNeighbourRelationTo(squareCell2);
        expect(squareCell1.neighbours.length).to.equal(1);
    });

    it('trying to establish neighbour relation twice', () => {
        squareCell1.establishNeighbourRelationTo(squareCell2);
        squareCell1.establishNeighbourRelationTo(squareCell2);
        expect(squareCell1.neighbours.length).to.equal(1);
    });

    it('visiting a cell', () => {
        squareCell1.visited = true;
        expect(squareCell1.visited).to.equal(true);
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

    it('interconnecting two cells twice', () => {
        const cell1: Cell = CellFactory.createCell(new Coordinate(10, 10), 2, 'square');
        const cell2: Cell = CellFactory.createCell(new Coordinate(20, 20), 2, 'square');
        cell1.establishConnectionTo(cell2);
        cell1.establishConnectionTo(cell2);
        expect(cell1.connectedNeighbours.length).to.equal(1);
        expect(cell2.connectedNeighbours.length).to.equal(1);
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
        cell1.establishNeighbourRelationTo(cell2);
        expect(cell1.randomUnvisitedNeighbour).to.equal(cell2);
    });

    it('should have correct coordinates', () => {
        expect(squareCell1.center.x).to.equal(5);
        expect(squareCell1.center.y).to.equal(5);
    });

    it('should have correct corners', () => {
        const corners: Coordinate[] = squareCell1.corners;
        expect(corners[0].equals(new Coordinate(10, 10))).to.equal(true);
        expect(corners[1].equals(new Coordinate(0, 10))).to.equal(true);
        expect(corners[2].equals(new Coordinate(0, 0))).to.equal(true);
        expect(corners[3].equals(new Coordinate(10, 0))).to.equal(true);
    });

    it('should have 4 borders when no neighbours', () => {
        const borders: Segment[] = squareCell1.closedBorders;
        expect(borders.length).to.equal(4);
    });

    it('should have 3 borders when one neighbour', () => {
        squareCell1.establishNeighbourRelationTo(squareCell2);
        squareCell1.establishConnectionTo(squareCell2);
        expect(squareCell1.closedBorders.length).to.equal(3);
        expect(squareCell2.closedBorders.length).to.equal(3);
    });

    it('should have 2 closed borders when two neighbours', () => {
        squareCell1.establishNeighbourRelationTo(squareCell2);
        squareCell1.establishNeighbourRelationTo(squareCell3);
        squareCell2.establishConnectionTo(squareCell1);
        squareCell2.establishConnectionTo(squareCell3);

        expect(squareCell1.closedBorders.length).to.equal(3);
        expect(squareCell2.closedBorders.length).to.equal(2);
        expect(squareCell3.closedBorders.length).to.equal(3);
    });

    it('should have common border with neighbour', () => {
        expect(squareCell1.hasCommonBorderWith(squareCell2)).to.equal(true);
    });

    it('should not have common border with non-neighbour', () => {
        expect(squareCell1.hasCommonBorderWith(squareCell3)).to.equal(false);
    });

    it('should have common corners with neighbour', () => {
        const commonCorners: Coordinate[] = squareCell1.commonCornersWith(squareCell2);
        expect(commonCorners.length).to.equal(2);
    });

    it('should not have common corners with non-neighbour', () => {
        const commonCorners: Coordinate[] = squareCell1.commonCornersWith(squareCell3);
        expect(commonCorners.length).to.equal(0);
    });

});