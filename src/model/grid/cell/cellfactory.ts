import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class CellFactory {
    static createCell(center: Coordinate, width: number, type: string, angleInDegrees: number = 0): Cell {
        let shapeCorners: Coordinate[];
        switch (type) {
            case 'equilateral-triangular':
                shapeCorners = CellFactory.createCornersForEquilateralTriangle(center, width); break;
            case 'isosceles-right-triangular':
                shapeCorners = CellFactory.createCornersForIsoscelesRightTriangle(center, width); break;
            case 'square':
                shapeCorners = CellFactory.createCornersForSquare(center, width); break;
            case 'double-square-rectangle':
                shapeCorners = CellFactory.createCornersForDoubleSquareRectangle(center, width); break;
            case 'hexagonal':
                shapeCorners = CellFactory.createCornersForHexagon(center, width); break;
            case 'octagonal':
                shapeCorners = CellFactory.createCornersForOctagon(center, width); break;
            default:
                throw new Error('Unknown cell type'); break;
        }
        if (angleInDegrees === 0) {
            return new Cell(center, shapeCorners);
        }

        const rotatedCorners: Coordinate[] = shapeCorners
            .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, rotatedCorners);
    }

    private static createCornersForEquilateralTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;

        const upperCorner: Coordinate = new Coordinate(center.x, center.y + thirdHeight * 2);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - thirdHeight);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - thirdHeight);
        return [upperCorner, rightCorner, leftCorner];
    }


    private static createCornersForIsoscelesRightTriangle(center: Coordinate, width: number): Coordinate[] {
        const thirdWidth: number = width / 3;
        const thirdHeight: number = width / 3;
        const upperCorner: Coordinate = new Coordinate(center.x - thirdWidth, center.y + 2 * thirdHeight);
        const rightCorner: Coordinate = new Coordinate(center.x + 2 * thirdWidth, center.y - thirdHeight);
        const lowerCorner: Coordinate = new Coordinate(center.x - thirdHeight, center.y - thirdHeight);
        return [rightCorner, upperCorner, lowerCorner];
    }

    private static createCornersForSquare(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const upperRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfWidth);
        const upperLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfWidth);
        const lowerRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfWidth);
        const lowerLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfWidth);
        return [upperRightCorner, upperLeftCorner, lowerLeftCorner, lowerRightCorner];
    }

    private static createCornersForDoubleSquareRectangle(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const halfHeight: number = width;
        const middleRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y);
        const upperRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfHeight);
        const upperLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfHeight);
        const middleLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y);
        const lowerLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfHeight);
        const lowerRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfHeight);
        return [
            middleRightCorner,
            upperRightCorner,
            upperLeftCorner,
            middleLeftCorner,
            lowerLeftCorner,
            lowerRightCorner
        ];
    }

    private static createCornersForHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;

        const upperCenter: Coordinate = new Coordinate(center.x, center.y + 2 * quarterHeight);
        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y + quarterHeight);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y + quarterHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        return [upperRight, upperCenter, upperLeft, lowerLeft, lowerCenter, lowerRight];
    }

    private static createCornersForOctagon(center: Coordinate, width: number): Coordinate[] {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;
        const lowerQ1: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfSideLength);
        const upperQ1: Coordinate = new Coordinate(center.x + halfSideLength, center.y + halfWidth);
        const upperQ2: Coordinate = new Coordinate(center.x - halfSideLength, center.y + halfWidth);
        const lowerQ2: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfSideLength);
        const upperQ3: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfSideLength);
        const lowerQ3: Coordinate = new Coordinate(center.x - halfSideLength, center.y - halfWidth);
        const lowerQ4: Coordinate = new Coordinate(center.x + halfSideLength, center.y - halfWidth);
        const upperQ4: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfSideLength);
        return [lowerQ1, upperQ1, upperQ2, lowerQ2, upperQ3, lowerQ3, lowerQ4, upperQ4];
    }

}