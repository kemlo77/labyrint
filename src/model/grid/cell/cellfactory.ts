import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class CellFactory {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static createCell(center: Coordinate, width: number, type: string, angleInDegrees: number = 0): Cell {
        const shapeCorners: Coordinate[] = CellFactory.createCornersForShape(center, width, type);

        if (angleInDegrees === 0) {
            return new Cell(center, shapeCorners);
        }

        const rotatedCorners: Coordinate[] = shapeCorners
            .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, rotatedCorners);
    }

    private static createCornersForShape(center: Coordinate, width: number, type: string): Coordinate[] {
        if (type === 'equilateral-triangular') {
            return CellFactory.createCornersForEquilateralTriangle(center, width);
        }
        if (type === 'isosceles-right-triangular') {
            return CellFactory.createCornersForIsoscelesRightTriangle(center, width);
        }
        if (type === 'isosceles-right-triangular-with-split-hypotenuse') {
            return CellFactory.createCornersForIsoscelesRightTriangleSplitHypotenuse(center, width);
        }
        if (type === 'square') {
            return CellFactory.createCornersForSquare(center, width);
        }
        if (type === 'double-square-rectangle') {
            return CellFactory.createCornersForDoubleSquareRectangle(center, width);
        }
        if (type === 'hexagonal') {
            return CellFactory.createCornersForHexagon(center, width);
        }
        if (type === 'half-hexagonal') {
            return CellFactory.createCornersForHalfHexagon(center, width);
        }
        if (type === 'side-hexagonal') {
            return CellFactory.createCornersForSideHexagon(center, width);
        }
        if (type === 'quarter-hexagonal') {
            return CellFactory.createCornersForQuarterHexagon(center, width);
        }
        if (type === 'quarter-hexagonal-mirrored') {
            return CellFactory.createCornersForQuarterHexagonMirrored(center, width);
        }
        if (type === 'octagonal') {
            return CellFactory.createCornersForOctagon(center, width);
        }
        if (type === 'semi-octagonal-semi-square') {
            return CellFactory.createCornersForSemiOctagonSemiSquare(center, width);
        }
        if (type === 'chamfered-square') {
            return CellFactory.createCornersForChamferedSquare(center, width);
        }
        throw new Error('Unknown cell type');
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

    private static createCornersForIsoscelesRightTriangleSplitHypotenuse(
        center: Coordinate,
        width: number
    ): Coordinate[] {
        const thirdWidth: number = width / 3;
        const thirdHeight: number = width / 3;
        const upperCorner: Coordinate = new Coordinate(center.x - thirdWidth, center.y + 2 * thirdHeight);
        const midHypotenuse: Coordinate = new Coordinate(center.x + thirdWidth / 2, center.y + thirdHeight / 2);
        const rightCorner: Coordinate = new Coordinate(center.x + 2 * thirdWidth, center.y - thirdHeight);
        const lowerCorner: Coordinate = new Coordinate(center.x - thirdHeight, center.y - thirdHeight);
        return [rightCorner, midHypotenuse, upperCorner, lowerCorner];
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

        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y + quarterHeight);
        const upperCenter: Coordinate = new Coordinate(center.x, center.y + 2 * quarterHeight);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y + quarterHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        return [upperRight, upperCenter, upperLeft, lowerLeft, lowerCenter, lowerRight];
    }

    private static createCornersForHalfHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;

        const upperCenter: Coordinate = new Coordinate(center.x, center.y + 2 * quarterHeight);
        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y + quarterHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        return [upperRight, upperCenter, lowerCenter, lowerRight];
    }

    private static createCornersForSideHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;

        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        return [upperRight, upperLeft, lowerLeft, lowerCenter, lowerRight];
    }

    private static createCornersForQuarterHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;

        const upperCenter: Coordinate = new Coordinate(center.x, center.y);
        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        return [upperRight, upperCenter, lowerCenter, lowerRight];
    }

    private static createCornersForQuarterHexagonMirrored(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;

        const upperRight: Coordinate = new Coordinate(center.x, center.y);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - 2 * quarterHeight);
        return [upperRight, upperLeft, lowerLeft, lowerCenter];
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

    private static createCornersForSemiOctagonSemiSquare(center: Coordinate, width: number): Coordinate[] {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;
        const lowerQ1: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfSideLength);
        const upperQ1: Coordinate = new Coordinate(center.x + halfSideLength, center.y + halfWidth);
        const q2: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfWidth);
        const q3: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfWidth);
        const lowerQ4: Coordinate = new Coordinate(center.x + halfSideLength, center.y - halfWidth);
        const upperQ4: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfSideLength);
        return [lowerQ1, upperQ1, q2, q3, lowerQ4, upperQ4];
    }

    private static createCornersForChamferedSquare(center: Coordinate, width: number): Coordinate[] {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;
        const lowerQ1: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfSideLength);
        const upperQ1: Coordinate = new Coordinate(center.x + halfSideLength, center.y + halfWidth);
        const q2: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfWidth);
        const q3: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfWidth);
        const q4: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfWidth);
        return [lowerQ1, upperQ1, q2, q3, q4];
    }

}