import { expect } from 'chai';
import { Vector } from '../../src/model/vector';

describe('Vector', () => {

    it('should return an accurate magnitude', () => {
        const vector: Vector = new Vector(3, 4);
        expect(vector.magnitude).to.equal(5);
    });

    it('should return an accurate new rotated vector', () => {
        const vector: Vector = new Vector(3, 4);
        const rotatedVector: Vector = vector.newRotatedVector(90);
        expect(rotatedVector.x).to.be.closeTo(4, 0.0001);
        expect(rotatedVector.y).to.be.closeTo(-3, 0.0001);
    });

    it('should return an accurate angle', () => {
        const vector: Vector = new Vector(3, 4);
        const otherVector: Vector = new Vector(-4, 3);
        expect(vector.hasAngleTo(otherVector)).to.be.closeTo(90, 0.0001);
    });

    it('should return an accurate angle vice versa', () => {
        const vector: Vector = new Vector(-4, 3);
        const otherVector: Vector = new Vector(3, 4);
        expect(vector.hasAngleTo(otherVector)).to.be.closeTo(270, 0.0001);
    });

    it('should return an accurate angle again', () => {
        const vector: Vector = new Vector(3, 4);
        const otherVector: Vector = new Vector(-3, -4);
        expect(vector.hasAngleTo(otherVector)).to.be.closeTo(180, 0.0001);
    });

    it('should return an accurate angle yet again', () => {
        const vector: Vector = new Vector(3, 4);
        const otherVector: Vector = new Vector(3, 4);
        expect(vector.hasAngleTo(otherVector)).to.be.closeTo(0, 0.0001);
    });



});