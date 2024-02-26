import { expect } from 'chai';
import { Coordinate } from '../src/model/coordinate';

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
});
