import { Vector } from './vector';

export function stepRight(length: number): Vector {
    return new Vector(1, 0).times(length);
}

export function stepUpRight(length: number): Vector {
    return new Vector(1 / Math.SQRT2, 1 / Math.SQRT2).times(length);
}

export function stepUp(length: number): Vector {
    return new Vector(0, 1).times(length);
}

export function stepUpLeft(length: number): Vector {
    return new Vector(-1 / Math.SQRT2, 1 / Math.SQRT2).times(length);
}

export function stepLeft(length: number): Vector {
    return new Vector(-1, 0).times(length);
}

export function stepDownLeft(length: number): Vector {
    return new Vector(-1 / Math.SQRT2, -1 / Math.SQRT2).times(length);
}

export function stepDown(length: number): Vector {
    return new Vector(0, -1).times(length);
}

export function stepDownRight(length: number): Vector {
    return new Vector(1 / Math.SQRT2, -1 / Math.SQRT2).times(length);
}

export function stepInDirection(angle: number, length: number): Vector {
    const angleInRadians: number = angle * Math.PI / 180;
    return new Vector(Math.cos(angleInRadians), Math.sin(angleInRadians)).times(length);
}

