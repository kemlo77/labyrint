import { Vector } from './vector';

const rightUnitVector: Vector = new Vector(1, 0);
const upRightUnitVector: Vector = new Vector(1 / Math.SQRT2, -1 / Math.SQRT2);
const upUnitVector: Vector = new Vector(0, -1);
const upLeftUnitVector: Vector = new Vector(-1 / Math.SQRT2, -1 / Math.SQRT2);
const leftUnitVector: Vector = new Vector(-1, 0);
const downLeftUnitVector: Vector = new Vector(-1 / Math.SQRT2, 1 / Math.SQRT2);
const downUnitVector: Vector = new Vector(0, 1);
const downRightUnitVector: Vector = new Vector(1 / Math.SQRT2, 1 / Math.SQRT2);

export {
    rightUnitVector,
    upRightUnitVector,
    upUnitVector,
    upLeftUnitVector,
    leftUnitVector,
    downLeftUnitVector,
    downUnitVector,
    downRightUnitVector
};