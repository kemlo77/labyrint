export class Coordinate {

    constructor(readonly x: number, readonly y: number) {
        //
    }

    distanceTo(coordinate: Coordinate): number {
        return Math.sqrt(Math.pow(coordinate.x - this.x, 2) + Math.pow(coordinate.y - this.y, 2));
    }

    rotateClockwise(angleInDegrees: number): Coordinate {
        const angle: number = angleInDegrees * Math.PI / 180;
        const tempX: number = this.x;
        const tempY: number = this.y;
        const newX: number = tempX * Math.cos(angle) + tempY * Math.sin(angle);
        const newY: number = -tempX * Math.sin(angle) + tempY * Math.cos(angle);
        return new Coordinate(newX, newY);
    }

    translate(distX: number, distY: number): Coordinate {
        const newX: number = this.x + distX;
        const newY: number = this.y + distY;
        return new Coordinate(newX, newY);
    }

    rotateAroundCenter(angleInDegrees: number, center: Coordinate): Coordinate {
        if (angleInDegrees === 0) {
            return this;
        }
        const translated: Coordinate = this.translate(-center.x, -center.y);
        const rotated: Coordinate = translated.rotateClockwise(angleInDegrees);
        return rotated.translate(center.x, center.y);
    }

}