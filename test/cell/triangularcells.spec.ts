import { expect } from 'chai';
import { PointyTopTriangularCell } from '../../src/model/grid/cell/pointytoptriangularcell';
import { Coordinate } from '../../src/model/coordinate';
import { BorderSegment } from '../../src/model/bordersegment';


describe('PointyTopTriangularCell', () => {
    let cell: PointyTopTriangularCell;

    beforeEach(() => {
        const center: Coordinate = new Coordinate(0, 0);
        cell = new PointyTopTriangularCell(center, 10);
    });

    it('should have correct coordinates', () => {
        expect(cell.center.x).to.equal(0);
        expect(cell.center.y).to.equal(0);
    });

    it('should have correct corners', () => {
        const corners: Coordinate[] = cell.corners;
        expect(corners[0].x).to.be.equal(0);
        expect(corners[0].y).to.equal(10 * Math.sqrt(3) / 3);
        expect(corners[1].x).to.equal(5);
        expect(corners[1].y).to.equal(-10 * Math.sqrt(3) / 6);
        expect(corners[2].x).to.equal(-5);
        expect(corners[2].y).to.equal(-10 * Math.sqrt(3) / 6);
    });

    it('should have 3 borders when no neighbours', () => {
        const borders: BorderSegment[] = cell.closedBorders;
        expect(borders.length).to.equal(3);
    });

    it('should have 2 borders when one neighbour', () => {
        const neighbour: PointyTopTriangularCell = new PointyTopTriangularCell(new Coordinate(0, -20), 10);
        cell.addNeighbour(neighbour);
        cell.establishConnectionTo(neighbour);
        const borders: BorderSegment[] = cell.closedBorders;
        expect(borders.length).to.equal(2);
    });

    it('should have 1 border when two neighbours', () => {
        const neighbour1: PointyTopTriangularCell = new PointyTopTriangularCell(new Coordinate(10, 5), 10);
        const neighbour2: PointyTopTriangularCell = new PointyTopTriangularCell(new Coordinate(-10, 5), 10);
        cell.addNeighbour(neighbour1);
        cell.addNeighbour(neighbour2);
        cell.establishConnectionTo(neighbour1);
        cell.establishConnectionTo(neighbour2);
        const borders: BorderSegment[] = cell.closedBorders;
        expect(borders.length).to.equal(1);
    });

});
