import {
    downLeftUnitVector,
    downRightUnitVector,
    downUnitVector,
    leftUnitVector,
    rightUnitVector,
    upLeftUnitVector,
    upRightUnitVector,
    upUnitVector
} from './unitvectors';
import { Vector } from './vector';

export function stepRight(length: number): Vector {
    return rightUnitVector.times(length);
}

export function stepUpRight(length: number): Vector {
    return upRightUnitVector.times(length);
}

export function stepUp(length: number): Vector {
    return upUnitVector.times(length);
}

export function stepUpLeft(length: number): Vector {
    return upLeftUnitVector.times(length);
}

export function stepLeft(length: number): Vector {
    return leftUnitVector.times(length);
}

export function stepDownLeft(length: number): Vector {
    return downLeftUnitVector.times(length);
}

export function stepDown(length: number): Vector {
    return downUnitVector.times(length);
}

export function stepDownRight(length: number): Vector {
    return downRightUnitVector.times(length);
}
