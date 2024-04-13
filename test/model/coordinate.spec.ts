import { expect } from 'chai';
import { Coordinate } from '../../src/model/coordinate';

describe('Coordinate', () => {
    let coordinate: Coordinate;

    beforeEach(() => {
        coordinate = new Coordinate(3, 4);
    });

    it('should create a coordinate with given x and y values', () => {
        expect(coordinate.x).to.equal(3);
        expect(coordinate.y).to.equal(4);
    });

    it('should calculate the distance to another coordinate', () => {
        const otherCoordinate: Coordinate = new Coordinate(6, 8);
        const distance: number = coordinate.distanceTo(otherCoordinate);
        expect(distance).to.equal(5);
    });

    it('should not equal another coordinate', () => {
        const otherCoordinate: Coordinate = new Coordinate(6, 8);
        expect(coordinate.equals(otherCoordinate)).to.equal(false);
    });

    it('should equal another coordinate', () => {
        const otherCoordinate: Coordinate = new Coordinate(3, 4);
        expect(coordinate.equals(otherCoordinate)).to.equal(true);
    });

    it('should rotate clockwise', () => {
        const rotatedCoordinate: Coordinate = coordinate.rotateClockwise(90);
        expect(rotatedCoordinate.x).to.be.closeTo(4, 0.0001);
        expect(rotatedCoordinate.y).to.be.closeTo(-3, 0.0001);
    });

    it('should not rotate clockwise when angle is 0', () => {
        const rotatedCoordinate: Coordinate = coordinate.rotateClockwise(0);
        expect(rotatedCoordinate.x).to.equal(3);
        expect(rotatedCoordinate.y).to.equal(4);
    });

    it('should not rotate around center when angle is 0', () => {
        const center: Coordinate = new Coordinate(1, 1);
        const rotatedCoordinate: Coordinate = coordinate.rotateAroundCenter(0, center);
        expect(rotatedCoordinate.x).to.equal(3);
        expect(rotatedCoordinate.y).to.equal(4);
    });

    it('should translate', () => {
        const translatedCoordinate: Coordinate = coordinate.translate(1, 2);
        expect(translatedCoordinate.x).to.equal(4);
        expect(translatedCoordinate.y).to.equal(6);
    });

    it('should rotate around center', () => {
        const center: Coordinate = new Coordinate(1, 1);
        const rotatedCoordinate: Coordinate = coordinate.rotateAroundCenter(90, center);
        expect(rotatedCoordinate.x).to.be.closeTo(4, 0.0001);
        expect(rotatedCoordinate.y).to.be.closeTo(-1, 0.0001);
    });
});
