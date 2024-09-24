import { Coordinate } from '../../coordinate';
import { downLeftUnitVector, downUnitVector, leftUnitVector, rightUnitVector, upLeftUnitVector, upRightUnitVector, upUnitVector } from '../../unitvectors';
import { Cell } from './cell';

export class CellFactory {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static createCell(insertionPoint: Coordinate, width: number, type: string, angleInDegrees: number = 0): Cell {

        //TODO: byt namn på center till insertionPoint
        if (type === 'square') {
            const squareCell: Cell = CellFactory.createSquareCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return squareCell;
            }

            return squareCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'isosceles-right-triangular') {
            const triangularCell: Cell = CellFactory.createIsoscelesRightTriangleCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return triangularCell;
            }
            return triangularCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'double-square-rectangle') {
            const doubleSquareRectangleCell: Cell = CellFactory.createDoubleSquareRectangleCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return doubleSquareRectangleCell;
            }
            return doubleSquareRectangleCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'chamfered-square') {
            const chamferedSquareCell: Cell = CellFactory.createChamferedSquareCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return chamferedSquareCell;
            }
            return chamferedSquareCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'semi-octagonal-semi-square') {
            const semiOctSemiSquareCell: Cell = CellFactory.createSemiOctagonalSemiSquareCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return semiOctSemiSquareCell;
            }
            return semiOctSemiSquareCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'octagonal') {
            const octagonalCell: Cell = CellFactory.createOctagonalCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return octagonalCell;
            }
            return octagonalCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        const shapeCorners: Coordinate[] = CellFactory.createCornersForShape(insertionPoint, width, type);

        if (angleInDegrees === 0) {
            return new Cell(insertionPoint, shapeCorners);
        }

        const rotatedCorners: Coordinate[] = shapeCorners
            .map(corner => corner.rotateAroundCenter(angleInDegrees, insertionPoint));
        return new Cell(insertionPoint, rotatedCorners);
    }

    private static createSquareCell(insertionPoint: Coordinate, width: number): Cell {
        const halfWidth: number = width / 2;

        const lowerLeftCorner: Coordinate = insertionPoint.clone();
        const lowerRightCorner: Coordinate = lowerLeftCorner.newRelativeCoordinate(rightUnitVector.scale(width));
        const upperRightCorner: Coordinate = lowerRightCorner.newRelativeCoordinate(upUnitVector.scale(width));
        const upperLeftCorner: Coordinate = upperRightCorner.newRelativeCoordinate(leftUnitVector.scale(width));

        const center: Coordinate = new Coordinate(insertionPoint.x + halfWidth, insertionPoint.y + halfWidth);
        return new Cell(
            center,
            [
                lowerLeftCorner,
                lowerRightCorner,
                upperRightCorner,
                upperLeftCorner
            ]
        );
    }

    private static createIsoscelesRightTriangleCell(insertionPoint: Coordinate, width: number): Cell {
        const thirdWidth: number = width / 3;
        const thidHeight: number = width / 3;
        const hypotenuseLength: number = Math.sqrt(2 * width * width);

        const lowerLeftCorner: Coordinate = insertionPoint.clone();
        const lowerRightCorner: Coordinate = lowerLeftCorner.newRelativeCoordinate(rightUnitVector.scale(width));
        const upperCorner: Coordinate = lowerRightCorner
            .newRelativeCoordinate(upLeftUnitVector.scale(hypotenuseLength));

        const center: Coordinate = new Coordinate(insertionPoint.x + thirdWidth, insertionPoint.y + thidHeight);
        return new Cell(
            center,
            [
                lowerLeftCorner,
                lowerRightCorner,
                upperCorner
            ]
        );
    }

    private static createDoubleSquareRectangleCell(insertionPoint: Coordinate, width: number): Cell {
        const halfWidth: number = width / 2;
        const halfHeight: number = width / 4;
        const height: number = width / 2;
        const lowerLeftCorner: Coordinate = insertionPoint.clone();
        const lowerMiddleCorner: Coordinate = lowerLeftCorner.newRelativeCoordinate(rightUnitVector.scale(halfWidth));
        const lowerRightCorner: Coordinate = lowerMiddleCorner.newRelativeCoordinate(rightUnitVector.scale(halfWidth));
        const upperRightCorner: Coordinate = lowerRightCorner.newRelativeCoordinate(upUnitVector.scale(height));
        const upperMiddleCorner: Coordinate = upperRightCorner.newRelativeCoordinate(leftUnitVector.scale(halfWidth));
        const upperLeftCorner: Coordinate = upperMiddleCorner.newRelativeCoordinate(leftUnitVector.scale(halfWidth));
        const center: Coordinate = new Coordinate(insertionPoint.x + halfWidth, insertionPoint.y + halfHeight);
        return new Cell(
            center,
            [
                lowerLeftCorner,
                lowerMiddleCorner,
                lowerRightCorner,
                upperRightCorner,
                upperMiddleCorner,
                upperLeftCorner
            ]
        );
    }

    private static createChamferedSquareCell(insertionPoint: Coordinate, width: number): Cell {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;

        const q3: Coordinate = insertionPoint.clone();
        const q4: Coordinate = q3.newRelativeCoordinate(rightUnitVector.scale(width));
        const lowerQ1: Coordinate = q4.newRelativeCoordinate(upUnitVector.scale(halfWidth + halfSideLength));
        const upperQ1: Coordinate = lowerQ1.newRelativeCoordinate(upLeftUnitVector.scale(sideLength));
        const q2: Coordinate = upperQ1.newRelativeCoordinate(leftUnitVector.scale(halfWidth + halfSideLength));

        const center: Coordinate = new Coordinate(insertionPoint.x + halfWidth, insertionPoint.y + halfWidth);
        return new Cell(
            center,
            [
                q3,
                q4,
                lowerQ1,
                upperQ1,
                q2
            ]
        );
    }

    private static createSemiOctagonalSemiSquareCell(insertionPoint: Coordinate, width: number): Cell {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;
        const q3: Coordinate = insertionPoint.clone();
        const lowerQ4: Coordinate = q3.newRelativeCoordinate(rightUnitVector.scale(halfWidth + halfSideLength));
        const upperQ4: Coordinate = lowerQ4.newRelativeCoordinate(upRightUnitVector.scale(sideLength));
        const lowerQ1: Coordinate = upperQ4.newRelativeCoordinate(upUnitVector.scale(sideLength));
        const upperQ1: Coordinate = lowerQ1.newRelativeCoordinate(upLeftUnitVector.scale(sideLength));
        const q2: Coordinate = upperQ1.newRelativeCoordinate(leftUnitVector.scale(halfWidth + halfSideLength));
        const center: Coordinate = new Coordinate(insertionPoint.x + halfWidth, insertionPoint.y + halfWidth);
        return new Cell(
            center,
            [
                lowerQ1,
                upperQ1,
                q2,
                q3,
                lowerQ4,
                upperQ4
            ]
        );
    }


    private static createOctagonalCell(insertionPoint: Coordinate, width: number): Cell {
        const sideLength: number = width / (1 + Math.SQRT2);
        const halfSideLength: number = sideLength / 2;
        const halfWidth: number = width / 2;
        const lowerQ3: Coordinate = insertionPoint
            .newRelativeCoordinate(rightUnitVector.scale(halfWidth - halfSideLength));
        const lowerQ4: Coordinate = lowerQ3.newRelativeCoordinate(rightUnitVector.scale(sideLength));
        const upperQ4: Coordinate = lowerQ4.newRelativeCoordinate(upRightUnitVector.scale(sideLength));
        const lowerQ1: Coordinate = upperQ4.newRelativeCoordinate(upUnitVector.scale(sideLength));
        const upperQ1: Coordinate = lowerQ1.newRelativeCoordinate(upLeftUnitVector.scale(sideLength));
        const upperQ2: Coordinate = upperQ1.newRelativeCoordinate(leftUnitVector.scale(sideLength));
        const lowerQ2: Coordinate = upperQ2.newRelativeCoordinate(downLeftUnitVector.scale(sideLength));
        const upperQ3: Coordinate = lowerQ2.newRelativeCoordinate(downUnitVector.scale(sideLength));
        const center: Coordinate = new Coordinate(insertionPoint.x + halfWidth, insertionPoint.y + halfWidth);
        return new Cell(
            center,
            [
                lowerQ1,
                upperQ1,
                upperQ2,
                lowerQ2,
                upperQ3,
                lowerQ3,
                lowerQ4,
                upperQ4
            ]
        );
    }

    private static createCornersForShape(center: Coordinate, width: number, type: string): Coordinate[] {
        if (type === 'equilateral-triangular') {
            return CellFactory.createCornersForEquilateralTriangle(center, width);
        }
        if (type === 'triangular') {
            return CellFactory.createCornersForTriangle(center, width);
        }
        if (type === 'left-half-triangular') {
            return CellFactory.createCornersForLeftHalfTriangle(center, width);
        }
        if (type === 'right-half-triangular') {
            return CellFactory.createCornersForRightHalfTriangle(center, width);
        }
        if (type === 'hexagonal') {
            return CellFactory.createCornersForHexagon(center, width);
        }
        if (type === 'right-half-hexagonal') {
            return CellFactory.createCornersForRightHalfHexagon(center, width);
        }
        if (type === 'bottom-half-hexagonal') {
            return CellFactory.createCornersForBottomHalfHexagon(center, width);
        }
        if (type === 'bottom-right-quarter-hexagonal') {
            return CellFactory.createCornersForBottomRightQuarterHexagon(center, width);
        }
        if (type === 'bottom-left-quarter-hexagonal') {
            return CellFactory.createCornersForBottomLeftQuarterHexagon(center, width);
        }

        throw new Error('Unknown cell type');
    }

    private static createCornersForTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;

        const upperCorner: Coordinate = new Coordinate(center.x, center.y + thirdHeight * 2);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth, center.y - thirdHeight);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth, center.y - thirdHeight);
        return [upperCorner, rightCorner, leftCorner];
    }

    private static createCornersForLeftHalfTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;
        const sixthOfWidth: number = width / 6;

        const upperCorner: Coordinate = new Coordinate(center.x + sixthOfWidth, center.y + thirdHeight * 2);
        const corner: Coordinate = new Coordinate(center.x + sixthOfWidth, center.y - thirdHeight);
        const leftCorner: Coordinate = new Coordinate(center.x - halfWidth + sixthOfWidth, center.y - thirdHeight);
        return [upperCorner, corner, leftCorner];
    }

    private static createCornersForRightHalfTriangle(center: Coordinate, width: number): Coordinate[] {
        const height: number = width;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;
        const sixthOfWidth: number = width / 6;

        const upperCorner: Coordinate = new Coordinate(center.x - sixthOfWidth, center.y + thirdHeight * 2);
        const rightCorner: Coordinate = new Coordinate(center.x + halfWidth - sixthOfWidth, center.y - thirdHeight);
        const corner: Coordinate = new Coordinate(center.x - sixthOfWidth, center.y - thirdHeight);
        return [upperCorner, rightCorner, corner];
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

    private static createCornersForHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;
        const halfHeight: number = width / Math.sqrt(3);

        const upperRight: Coordinate = new Coordinate(center.x + halfWidth, center.y + quarterHeight);
        const upperCenter: Coordinate = new Coordinate(center.x, center.y + halfHeight);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y + quarterHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - halfHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - quarterHeight);
        return [upperRight, upperCenter, upperLeft, lowerLeft, lowerCenter, lowerRight];
    }

    private static createCornersForRightHalfHexagon(center: Coordinate, width: number): Coordinate[] {
        const quarterWidth: number = width / 4;
        const quarterHeight: number = width / Math.sqrt(3) / 2;
        const halfHeight: number = width / Math.sqrt(3);

        const upperCenter: Coordinate = new Coordinate(center.x - quarterWidth, center.y + halfHeight);
        const upperRight: Coordinate = new Coordinate(center.x + quarterWidth, center.y + quarterHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + quarterWidth, center.y - quarterHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x - quarterWidth, center.y - halfHeight);
        return [upperRight, upperCenter, lowerCenter, lowerRight];
    }

    private static createCornersForBottomHalfHexagon(center: Coordinate, width: number): Coordinate[] {
        const halfWidth: number = width / 2;
        const quarterHeight: number = width / Math.sqrt(3) / 2;
        const eightOfHeight: number = quarterHeight / 2;

        const upperRight: Coordinate =
            new Coordinate(center.x + halfWidth, center.y + eightOfHeight);
        const upperLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y + eightOfHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + halfWidth, center.y - eightOfHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - halfWidth, center.y - eightOfHeight);
        const lowerCenter: Coordinate = new Coordinate(center.x, center.y - quarterHeight - eightOfHeight);
        return [upperRight, upperLeft, lowerLeft, lowerCenter, lowerRight];
    }

    private static createCornersForBottomRightQuarterHexagon(center: Coordinate, width: number): Coordinate[] {
        const quarterWidth: number = width / 4;
        const quarterHeight: number = width / Math.sqrt(3) / 2;
        const eightOfHeight: number = quarterHeight / 2;

        const upperCenter: Coordinate = new Coordinate(center.x - quarterWidth, center.y + eightOfHeight);
        const upperRight: Coordinate = new Coordinate(center.x + quarterWidth, center.y + eightOfHeight);
        const lowerRight: Coordinate = new Coordinate(center.x + quarterWidth, center.y - eightOfHeight);
        const lowerCenter: Coordinate =
            new Coordinate(center.x - quarterWidth, center.y - quarterHeight - eightOfHeight);
        return [upperRight, upperCenter, lowerCenter, lowerRight];
    }

    private static createCornersForBottomLeftQuarterHexagon(center: Coordinate, width: number): Coordinate[] {
        const quarterWidth: number = width / 4;
        const quarterHeight: number = width / Math.sqrt(3) / 2;
        const eightOfHeight: number = quarterHeight / 2;

        const upperRight: Coordinate = new Coordinate(center.x + quarterWidth, center.y + eightOfHeight);
        const upperLeft: Coordinate = new Coordinate(center.x - quarterWidth, center.y + eightOfHeight);
        const lowerLeft: Coordinate = new Coordinate(center.x - quarterWidth, center.y - eightOfHeight);
        const lowerCenter: Coordinate =
            new Coordinate(center.x + quarterWidth, center.y - quarterHeight - eightOfHeight);
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


}