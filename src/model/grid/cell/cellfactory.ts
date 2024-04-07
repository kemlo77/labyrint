import { Coordinate } from '../../coordinate';
import { Cell } from './cell';

export class CellFactory {
    static createCell(center: Coordinate, width: number, type: string): Cell {
        switch (type) {
            case 'flat-top-triangular':
                return CellFactory.createFlatTopTriangularCell(center, width);
            case 'pointy-top-triangular':
                return CellFactory.createPointyTopTriangularCell(center, width);
            case 'square':
                return CellFactory.createSquareCell(center, width);
            case 'tilted-square':
                return CellFactory.createTiltedSquareCell(center, width);
            case 'hexagonal':
                return CellFactory.createHexagonalCell(center, width);
            case 'octagonal':
                return CellFactory.createOctagonalCell(center, width);
            default:
                throw new Error('Unknown cell type');
        }
    }

    private static createFlatTopTriangularCell(center: Coordinate, width: number): Cell {
        const triangleCorners: Coordinate[] = CellFactory.createCornersForFlatTopTriangle(center, width);
        return new Cell(center, triangleCorners);
    }

    private static createCornersForFlatTopTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;

        const lowerCorner: Coordinate = new Coordinate(center.x, center.y - thirdHeight * 2);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y + thirdHeight);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y + thirdHeight);
        return [lowerCorner, rightCorner, leftCorner];
    }

    private static createPointyTopTriangularCell(center: Coordinate, width: number): Cell {
        const triangleCorners: Coordinate[] = CellFactory.createCornersForPointyTopTriangle(center, width);
        return new Cell(center, triangleCorners);
    }


    private static createCornersForPointyTopTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;

        const upperCorner: Coordinate = new Coordinate(center.x, center.y + thirdHeight * 2);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - thirdHeight);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - thirdHeight);
        return [upperCorner, rightCorner, leftCorner];
    }

    private static createSquareCell(center: Coordinate, width: number): Cell {
        const corners: Coordinate[] = CellFactory.createCornersForSquare(center, width);
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

    private static createTiltedSquareCell(center: Coordinate, width: number): Cell {
        const corners: Coordinate[] = CellFactory.createCornersForTiltedSquare(center, width);
        return new Cell(center, corners);
    }


    private static createCornersForTiltedSquare(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const upperCorner: Coordinate = new Coordinate(center.x, center.y + halfWidth);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y);
        const lowerCorner: Coordinate = new Coordinate(center.x, center.y - halfWidth);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y);
        return [upperCorner, rightCorner, lowerCorner, leftCorner];
    }

    private static createHexagonalCell(center: Coordinate, width: number): Cell {
        const corners: Coordinate[] = CellFactory.createCornersForHexagon(center, width);
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

    private static createOctagonalCell(center: Coordinate, width: number): Cell {
        const corners: Coordinate[] = CellFactory.createCornersForOctagon(center, width);
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