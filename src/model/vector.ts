import { Coordinate } from './coordinate';

export class Vector {

    constructor(readonly x: number, readonly y: number) {
        //
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static get rightUnitVector(): Vector {
        return new Vector(1, 0);
    }

    static get upRightUnitVector(): Vector {
        return new Vector(1 / Math.SQRT2, -1 / Math.SQRT2);
    }

    static get upUnitVector(): Vector {
        return new Vector(0, -1);
    }

    static get upLeftUnitVector(): Vector {
        return new Vector(-1 / Math.SQRT2, -1 / Math.SQRT2);
    }

    static get leftUnitVector(): Vector {
        return new Vector(-1, 0);
    }

    static get downLeftUnitVector(): Vector {
        return new Vector(-1 / Math.SQRT2, 1 / Math.SQRT2);
    }

    static get downUnitVector(): Vector {
        return new Vector(0, 1);
    }

    static get downRightUnitVector(): Vector {
        return new Vector(1 / Math.SQRT2, 1 / Math.SQRT2);
    }


    createVectorFromCoordinates(coordinate1: Coordinate, coordinate2: Coordinate): Vector {
        return new Vector(coordinate2.x - coordinate1.x, coordinate2.y - coordinate1.y);
    }

    newRotatedVector(angleInDegrees: number): Vector {
        if (angleInDegrees === 0) {
            return this;
        }
        const angle: number = angleInDegrees * Math.PI / 180;
        const tempX: number = this.x;
        const tempY: number = this.y;
        const newX: number = tempX * Math.cos(angle) - tempY * Math.sin(angle);
        const newY: number = tempX * Math.sin(angle) + tempY * Math.cos(angle);
        return new Vector(newX, newY);
    }

    hasAngleTo(otherVector: Vector): number {
        let angle: number = Math.atan2(this.crossProduct(otherVector), this.dotProduct(otherVector)) * 180 / Math.PI;
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }

    private dotProduct(otherVector: Vector): number {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

    private crossProduct(otherVector: Vector): number {
        return this.x * otherVector.y - this.y * otherVector.x;
    }
}