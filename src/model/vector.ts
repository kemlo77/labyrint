export class Vector {

    constructor(readonly x: number, readonly y: number) {
        //
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
}