import { expect } from 'chai';
import { Coordinate } from '../../src/model/coordinate';
import { Segment } from '../../src/model/segment';

describe('Segment', () => {

    it('should return an accurate midpoint', () => {
        const segment: Segment = new Segment(new Coordinate(0, 2), new Coordinate(10, 10));
        expect(segment.midpoint.x).to.equal(5);
        expect(segment.midpoint.y).to.equal(6);
    });

    it('should return an accurate midpoint again', () => {
        const segment: Segment = new Segment(new Coordinate(-6, -2), new Coordinate(10, 10));
        expect(segment.midpoint.x).to.equal(2);
        expect(segment.midpoint.y).to.equal(4);
    });

});