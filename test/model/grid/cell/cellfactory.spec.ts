import { expect } from 'chai';
import { Coordinate } from '../../../../src/model/coordinate';
import { Cell } from '../../../../src/model/grid/cell/cell';
import { CellFactory } from '../../../../src/model/grid/cell/cellfactory';

describe('CellFactory', () => {
    let center: Coordinate;

    beforeEach(() => {
        center = new Coordinate(5, 5);
    });

    it('creating an equilateral triangle cell', () => {
        const triangleCenter: Coordinate = new Coordinate(0, 0);
        const triangleCell: Cell = CellFactory.createCell(triangleCenter, 15, 'equilateral-triangular');
        expect(triangleCell.corners.length).to.equal(3);
        expect(triangleCell.center).to.equal(triangleCenter);
        expect(triangleCell.corners[0].x).to.be.closeTo(0, 0.0001);
        expect(triangleCell.corners[0].y).to.be.closeTo(8.6602, 0.0001);
        expect(triangleCell.corners[1].x).to.be.closeTo(7.5, 0.0001);
        expect(triangleCell.corners[1].y).to.be.closeTo(-4.3301, 0.0001);
        expect(triangleCell.corners[2].x).to.be.closeTo(-7.5, 0.0001);
        expect(triangleCell.corners[2].y).to.be.closeTo(-4.3301, 0.0001);
    });

    it('creating a square cell', () => {
        const squareCell: Cell = CellFactory.createCell(center, 10, 'square');
        expect(squareCell.corners.length).to.equal(4);
        expect(squareCell.center).to.equal(center);
        expect(squareCell.corners[0].equals(new Coordinate(10, 10))).to.equal(true);
        expect(squareCell.corners[1].equals(new Coordinate(0, 10))).to.equal(true);
        expect(squareCell.corners[2].equals(new Coordinate(0, 0))).to.equal(true);
        expect(squareCell.corners[3].equals(new Coordinate(10, 0))).to.equal(true);
    });

    it('creating an isosceles right triangle cell', () => {
        const triangleCell: Cell = CellFactory.createCell(center, 15, 'isosceles-right-triangular');
        expect(triangleCell.corners.length).to.equal(3);
        expect(triangleCell.corners[0].equals(new Coordinate(15, 0))).to.equal(true);
        expect(triangleCell.corners[1].equals(new Coordinate(0, 15))).to.equal(true);
        expect(triangleCell.corners[2].equals(new Coordinate(0, 0))).to.equal(true);
    });

    it('creating a double square rectangle cell', () => {
        const rectangleCell: Cell = CellFactory.createCell(center, 10, 'double-square-rectangle');
        expect(rectangleCell.corners.length).to.equal(6);
        expect(rectangleCell.center).to.equal(center);
        expect(rectangleCell.corners[0].equals(new Coordinate(10, 5))).to.equal(true);
        expect(rectangleCell.corners[1].equals(new Coordinate(10, 15))).to.equal(true);
        expect(rectangleCell.corners[2].equals(new Coordinate(0, 15))).to.equal(true);
        expect(rectangleCell.corners[3].equals(new Coordinate(0, 5))).to.equal(true);
        expect(rectangleCell.corners[4].equals(new Coordinate(0, -5))).to.equal(true);
        expect(rectangleCell.corners[5].equals(new Coordinate(10, -5))).to.equal(true);
    });

    it('creating a rotated double square rectangle cell', () => {
        const rotatedRectangleCenter: Coordinate = new Coordinate(0, 0);
        const rectangleCell: Cell =
            CellFactory.createCell(rotatedRectangleCenter, 10, 'double-square-rectangle', 90);
        expect(rectangleCell.corners.length).to.equal(6);
        expect(rectangleCell.center).to.equal(rotatedRectangleCenter);
        expect(rectangleCell.corners[0].x).to.be.closeTo(0, 0.0001);
        expect(rectangleCell.corners[0].y).to.be.closeTo(5, 0.0001);
        expect(rectangleCell.corners[1].x).to.be.closeTo(-10, 0.0001);
        expect(rectangleCell.corners[1].y).to.be.closeTo(5, 0.0001);
        expect(rectangleCell.corners[2].x).to.be.closeTo(-10, 0.0001);
        expect(rectangleCell.corners[2].y).to.be.closeTo(-5, 0.0001);
        expect(rectangleCell.corners[3].x).to.be.closeTo(0, 0.0001);
        expect(rectangleCell.corners[3].y).to.be.closeTo(-5, 0.0001);
        expect(rectangleCell.corners[4].x).to.be.closeTo(10, 0.0001);
        expect(rectangleCell.corners[4].y).to.be.closeTo(-5, 0.0001);
        expect(rectangleCell.corners[5].x).to.be.closeTo(10, 0.0001);
        expect(rectangleCell.corners[5].y).to.be.closeTo(5, 0.0001);
    });

    it('creating a hexagon cell', () => {
        const hexagonCenter: Coordinate = new Coordinate(0, 0);
        const hexagonCell: Cell = CellFactory.createCell(hexagonCenter, 10, 'hexagonal');
        expect(hexagonCell.corners.length).to.equal(6);
        expect(hexagonCell.center).to.equal(hexagonCenter);
        expect(hexagonCell.corners[0].x).to.be.closeTo(5, 0.0001);
        expect(hexagonCell.corners[0].y).to.be.closeTo(2.8867, 0.0001);
        expect(hexagonCell.corners[1].x).to.be.closeTo(0, 0.0001);
        expect(hexagonCell.corners[1].y).to.be.closeTo(5.7735, 0.0001);
        expect(hexagonCell.corners[2].x).to.be.closeTo(-5, 0.0001);
        expect(hexagonCell.corners[2].y).to.be.closeTo(2.8867, 0.0001);
        expect(hexagonCell.corners[3].x).to.be.closeTo(-5, 0.0001);
        expect(hexagonCell.corners[3].y).to.be.closeTo(-2.8867, 0.0001);
        expect(hexagonCell.corners[4].x).to.be.closeTo(0, 0.0001);
        expect(hexagonCell.corners[4].y).to.be.closeTo(-5.7735, 0.0001);
        expect(hexagonCell.corners[5].x).to.be.closeTo(5, 0.0001);
        expect(hexagonCell.corners[5].y).to.be.closeTo(-2.8867, 0.0001);
    });

    it('creating an octagon cell', () => {
        const octagonCell: Cell = CellFactory.createCell(center, 10, 'octagonal');
        expect(octagonCell.corners.length).to.equal(8);
        expect(octagonCell.center).to.equal(center);
        expect(octagonCell.corners[0].x).to.be.closeTo(10, 0.0001);
        expect(octagonCell.corners[0].y).to.be.closeTo(7.0711, 0.0001);
        expect(octagonCell.corners[1].x).to.be.closeTo(7.0711, 0.0001);
        expect(octagonCell.corners[1].y).to.be.closeTo(10, 0.0001);
        expect(octagonCell.corners[2].x).to.be.closeTo(2.9289, 0.0001);
        expect(octagonCell.corners[2].y).to.be.closeTo(10, 0.0001);
        expect(octagonCell.corners[3].x).to.be.closeTo(0, 0.0001);
        expect(octagonCell.corners[3].y).to.be.closeTo(7.0711, 0.0001);
        expect(octagonCell.corners[4].x).to.be.closeTo(0, 0.0001);
        expect(octagonCell.corners[4].y).to.be.closeTo(2.9289, 0.0001);
        expect(octagonCell.corners[5].x).to.be.closeTo(2.9289, 0.0001);
        expect(octagonCell.corners[5].y).to.be.closeTo(0, 0.0001);
        expect(octagonCell.corners[6].x).to.be.closeTo(7.0711, 0.0001);
        expect(octagonCell.corners[6].y).to.be.closeTo(0, 0.0001);
        expect(octagonCell.corners[7].x).to.be.closeTo(10, 0.0001);
        expect(octagonCell.corners[7].y).to.be.closeTo(2.9289, 0.0001);

    });

    it('creating a cell of an unknown type', () => {
        expect(() => CellFactory.createCell(center, 10, 'unknown')).to.throw('Unknown cell type');
    });
});