import { Coordinate } from '../../coordinate';
import {
    stepDown,
    stepDownLeft,
    stepInDirection,
    stepLeft,
    stepRight,
    stepUp,
    stepUpLeft,
    stepUpRight
} from '../../vector/vectorcreator';
import { Cell } from './cell';
import { CellBuilder } from './cellbuilder';

export class CellFactory {

    private constructor() {
        throw new Error('This class cannot be instantiated');
    }

    static createCell(insertionPoint: Coordinate, width: number, type: string, angleInDegrees: number = 0): Cell {

        if (type === 'equilateral-triangular') {
            const equilateralTriangleCell: Cell = CellFactory.createEquilateralTriangleCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return equilateralTriangleCell;
            }
            return equilateralTriangleCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

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

        if (type === 'hexagonal') {
            const hexagonalCell: Cell = CellFactory.createHexagonalCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return hexagonalCell;
            }
            return hexagonalCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'right-half-hexagonal') {
            const rightHalfHexagonalCell: Cell =
                CellFactory.createRightHalfHexagonalCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return rightHalfHexagonalCell;
            }
            return rightHalfHexagonalCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'bottom-half-hexagonal') {
            const createBottomHalfHexagonalCell: Cell =
                CellFactory.createBottomHalfHexagonalCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return createBottomHalfHexagonalCell;
            }
            return createBottomHalfHexagonalCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'bottom-right-quarter-hexagonal') {
            const bottomRightQuarterHexagonalCell: Cell =
                CellFactory.createBottomRightQuarterHexagonalCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return bottomRightQuarterHexagonalCell;
            }
            return bottomRightQuarterHexagonalCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        if (type === 'bottom-left-quarter-hexagonal') {
            const bottomLeftQuarterHexagonalCell: Cell =
                CellFactory.createBottomLeftQuarterHexagonalCell(insertionPoint, width);
            if (angleInDegrees === 0) {
                return bottomLeftQuarterHexagonalCell;
            }
            return bottomLeftQuarterHexagonalCell.rotateAroundCenter(angleInDegrees, insertionPoint);
        }

        const shapeCorners: Coordinate[] = CellFactory.createCornersForShape(insertionPoint, width, type);

        if (angleInDegrees === 0) {
            return new Cell(insertionPoint, shapeCorners);
        }

        const rotatedCorners: Coordinate[] = shapeCorners
            .map(corner => corner.rotateAroundCenter(angleInDegrees, insertionPoint));
        return new Cell(insertionPoint, rotatedCorners);
    }

    private static createEquilateralTriangleCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width * Math.sqrt(3) / 2;
        const thirdHeight: number = height / 3;
        const halfWidth: number = width / 2;
        const sideLength: number = width;
        const center: Coordinate = insertionPoint.stepToNewCoordinate(stepRight(halfWidth).then(stepUp(thirdHeight)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight(sideLength))
            .addStepToNextCorner(stepInDirection(120, sideLength))
            .defineCenter(center)
            .build();
    }

    private static createSquareCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width;
        const center: Coordinate = insertionPoint.stepToNewCoordinate(stepRight(width / 2).then(stepUp(height / 2)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight(width))
            .addStepToNextCorner(stepUp(width))
            .addStepToNextCorner(stepLeft(width))
            .defineCenter(center)
            .build();
    }

    private static createDoubleSquareRectangleCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width / 2;
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(width / 2).then(stepUp(height / 2)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight((width / 2)))
            .addStepToNextCorner(stepRight((width / 2)))
            .addStepToNextCorner(stepUp(height))
            .addStepToNextCorner(stepLeft((width / 2)))
            .addStepToNextCorner(stepLeft((width / 2)))
            .defineCenter(center)
            .build();
    }

    private static createIsoscelesRightTriangleCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width;
        const hypotenuseLength: number = Math.sqrt(height * height + width * width);
        const center: Coordinate = insertionPoint.stepToNewCoordinate(stepRight(width / 3).then(stepUp(height / 3)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight(width))
            .addStepToNextCorner(stepUpLeft(hypotenuseLength))
            .defineCenter(center)
            .build();
    }

    private static createHexagonalCell(insertionPoint: Coordinate, sideLength: number): Cell {
        // width = sideLength * 2;
        const height: number = sideLength * Math.sqrt(3);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 2).then(stepUp(height / 2)));

        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepInDirection(0, sideLength))
            .addStepToNextCorner(stepInDirection(60, sideLength))
            .addStepToNextCorner(stepInDirection(120, sideLength))
            .addStepToNextCorner(stepInDirection(180, sideLength))
            .addStepToNextCorner(stepInDirection(240, sideLength))
            .defineCenter(center)
            .build();
    }


    private static createRightHalfHexagonalCell(insertionPoint: Coordinate, sideLength: number): Cell {
        const width: number = sideLength * 2;
        const height: number = sideLength * Math.sqrt(3);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 4).then(stepUp(height / 2)));

        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepInDirection(0, sideLength / 2))
            .addStepToNextCorner(stepInDirection(60, sideLength))
            .addStepToNextCorner(stepInDirection(120, sideLength))
            .addStepToNextCorner(stepInDirection(180, sideLength / 2))
            .defineCenter(center)
            .build();
    }

    private static createBottomHalfHexagonalCell(insertionPoint: Coordinate, sideLength: number): Cell {
        const width: number = sideLength * 2;
        const height: number = sideLength * Math.sqrt(3);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 2).then(stepUp(height / 4)));

        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepInDirection(0, sideLength))
            .addStepToNextCorner(stepInDirection(60, sideLength))
            .addStepToNextCorner(stepInDirection(180, width))
            .defineCenter(center)
            .build();
    }

    private static createBottomRightQuarterHexagonalCell(insertionPoint: Coordinate, sideLength: number): Cell {
        const width: number = sideLength * 2;
        const height: number = sideLength * Math.sqrt(3);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 4).then(stepUp(height / 4)));

        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepInDirection(0, sideLength / 2))
            .addStepToNextCorner(stepInDirection(60, sideLength))
            .addStepToNextCorner(stepInDirection(180, sideLength))
            .defineCenter(center)
            .build();
    }

    private static createBottomLeftQuarterHexagonalCell(insertionPoint: Coordinate, sideLength: number): Cell {
        const width: number = sideLength * 2;
        const height: number = sideLength * Math.sqrt(3);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 4).then(stepUp(height / 4)));

        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepInDirection(0, sideLength / 2))
            .addStepToNextCorner(stepInDirection(90, height / 2))
            .addStepToNextCorner(stepInDirection(180, sideLength))
            .defineCenter(center)
            .build();
    }

    private static createChamferedSquareCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width;
        const sideLength: number = width / (1 + Math.SQRT2);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 2).then(stepUp(height / 2)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight(width))
            .addStepToNextCorner(stepUp(width / 2 + sideLength / 2))
            .addStepToNextCorner(stepUpLeft(sideLength))
            .addStepToNextCorner(stepLeft(width / 2 + sideLength / 2))
            .defineCenter(center)
            .build();
    }

    private static createSemiOctagonalSemiSquareCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width;
        const sideLength: number = width / (1 + Math.SQRT2);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 2).then(stepUp(height / 2)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight(width / 2 + sideLength / 2))
            .addStepToNextCorner(stepUpRight(sideLength))
            .addStepToNextCorner(stepUp(sideLength))
            .addStepToNextCorner(stepUpLeft(sideLength))
            .addStepToNextCorner(stepLeft(width / 2 + sideLength / 2))
            .defineCenter(center)
            .build();
    }


    private static createOctagonalCell(insertionPoint: Coordinate, width: number): Cell {
        const height: number = width;
        const sideLength: number = width / (1 + Math.SQRT2);
        const center: Coordinate =
            insertionPoint.stepToNewCoordinate(stepRight(sideLength / 2).then(stepUp(height / 2)));
        return new CellBuilder()
            .setStartCorner(insertionPoint)
            .addStepToNextCorner(stepRight(sideLength))
            .addStepToNextCorner(stepUpRight(sideLength))
            .addStepToNextCorner(stepUp(sideLength))
            .addStepToNextCorner(stepUpLeft(sideLength))
            .addStepToNextCorner(stepLeft(sideLength))
            .addStepToNextCorner(stepDownLeft(sideLength))
            .addStepToNextCorner(stepDown(sideLength))
            .defineCenter(center)
            .build();
    }

    private static createCornersForShape(center: Coordinate, width: number, type: string): Coordinate[] {
        if (type === 'triangular') {
            return CellFactory.createCornersForTriangle(center, width);
        }
        if (type === 'left-half-triangular') {
            return CellFactory.createCornersForLeftHalfTriangle(center, width);
        }
        if (type === 'right-half-triangular') {
            return CellFactory.createCornersForRightHalfTriangle(center, width);
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

}