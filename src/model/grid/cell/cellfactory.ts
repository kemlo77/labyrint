import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class CellFactory {
    static createCell(center: Coordinate, width: number, type: string, angleInDegrees: number = 0): Cell {
        switch (type) {
            case 'equilateral-triangular':
                return CellFactory.createEquilateralTriangleCell(center, width, angleInDegrees);
            case 'isosceles-right-triangular':
                return CellFactory.createIsoscelesRightTriangleCell(center, width, angleInDegrees);
            case 'square':
                return CellFactory.createSquareCell(center, width, angleInDegrees);
            case 'double-square-rectangle':
                return CellFactory.createDoubleSquareRectangleCell(center, width, angleInDegrees);
            case 'hexagonal':
                return CellFactory.createHexagonalCell(center, width, angleInDegrees);
            case 'octagonal':
                return CellFactory.createOctagonalCell(center, width, angleInDegrees);
            default:
                throw new Error('Unknown cell type');
        }
    }

    private static createEquilateralTriangleCell(center: Coordinate, width: number, angleInDegrees: number): Cell {
        const triangleCorners: Coordinate[] =
            CellFactory.createCornersForEquilateralTriangle(center, width)
                .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, triangleCorners);
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

    private static createIsoscelesRightTriangleCell(center: Coordinate, width: number, angleInDegrees: number): Cell {
        const triangleCorners: Coordinate[] =
            CellFactory.createCornersForIsoscelesRightTriangle(center, width)
                .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, triangleCorners);
    }

    private static createCornersForIsoscelesRightTriangle(center: Coordinate, width: number): Coordinate[] {
        const thirdWidth: number = width / 3;
        const thirdHeight: number = width / 3;
        const upperCorner: Coordinate = new Coordinate(center.x - thirdWidth, center.y + 2 * thirdHeight);
        const rightCorner: Coordinate = new Coordinate(center.x + 2 * thirdWidth, center.y - thirdHeight);
        const lowerCorner: Coordinate = new Coordinate(center.x - thirdHeight, center.y - thirdHeight);
        return [rightCorner, upperCorner, lowerCorner];
    }

    private static createSquareCell(center: Coordinate, width: number, angleInDegrees: number): Cell {
        const corners: Coordinate[] =
            CellFactory.createCornersForSquare(center, width)
                .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, corners);
    }

    private static createCornersForSquare(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const upperRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y + halfWidth);
        const upperLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y + halfWidth);
        const lowerRightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - halfWidth);
        const lowerLeftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - halfWidth);
        return [upperRightCorner, upperLeftCorner, lowerLeftCorner, lowerRightCorner];
    }

    private static createDoubleSquareRectangleCell(center: Coordinate, width: number, angleInDegrees: number): Cell {
        const corners: Coordinate[] =
            CellFactory.createCornersForDoubleSquareRectangle(center, width)
                .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, corners);
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



    private static createHexagonalCell(center: Coordinate, width: number, angleInDegrees: number): Cell {
        const corners: Coordinate[] =
            CellFactory.createCornersForHexagon(center, width)
                .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, corners);
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

    private static createOctagonalCell(center: Coordinate, width: number, angleInDegrees: number): Cell {
        const corners: Coordinate[] =
            CellFactory.createCornersForOctagon(center, width)
                .map(corner => corner.rotateAroundCenter(angleInDegrees, center));
        return new Cell(center, corners);
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