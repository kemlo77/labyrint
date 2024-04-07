import { expect } from 'chai';
import { PointyTopTriangularCell } from '../../src/model/grid/cell/pointytoptriangularcell';
import { FlatTopTriangularCell } from '../../src/model/grid/cell/flattoptriangularcell';
import { Coordinate } from '../../src/model/coordinate';
import { Segment } from '../../src/model/segment';


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
        const borders: Segment[] = cell.closedBorders;
        expect(borders.length).to.equal(3);
    });

    it('should have 2 borders when one neighbour', () => {
        const firstCell: PointyTopTriangularCell = new PointyTopTriangularCell(new Coordinate(0, 26 / 3), 30);
        const secondCell: FlatTopTriangularCell = new FlatTopTriangularCell(new Coordinate(0, -26 / 3), 30);
        firstCell.addNeighbour(secondCell);
        secondCell.addNeighbour(firstCell);
        firstCell.establishConnectionTo(secondCell);
        const borders: Segment[] = firstCell.closedBorders;
        expect(borders.length).to.equal(2);
    });

    it('should have 1 border when two neighbours', () => {
        const firstCell: PointyTopTriangularCell = new PointyTopTriangularCell(new Coordinate(0, 26 / 3), 30);
        const secondCell: FlatTopTriangularCell = new FlatTopTriangularCell(new Coordinate(0, -26 / 3), 30);
        const thirdCell: FlatTopTriangularCell = new FlatTopTriangularCell(new Coordinate(15, 26 * 2 / 3), 30);

        firstCell.addNeighbour(secondCell);
        secondCell.addNeighbour(firstCell);
        firstCell.addNeighbour(thirdCell);
        thirdCell.addNeighbour(firstCell);
        firstCell.establishConnectionTo(secondCell);
        firstCell.establishConnectionTo(thirdCell);

        const borders: Segment[] = firstCell.closedBorders;
        expect(borders.length).to.equal(1);
    });

});
