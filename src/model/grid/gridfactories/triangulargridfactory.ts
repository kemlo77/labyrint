import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { leftUnitVector, rightUnitVector, upUnitVector } from '../../unitvectors';
import { Vector } from '../../vector';
import { Cell } from '../cell/cell';
import { CellFactory } from '../cell/cellfactory';
import { CellCreator } from '../cell/celltypealiases';
import { Grid } from '../grid';
import { UnframedGridFactory } from './unframedgridfactory';


export class TriangularGridFactory extends UnframedGridFactory {

    createGrid(numberOfColumns: number, numberOfRows: number, cellWidth: number): Grid {
        const cellGrid: Cell[][] = this.createCellMatrix(numberOfColumns, numberOfRows, cellWidth);
        this.establishNeighbourRelationsInMatrix(cellGrid);

        const startCell: Cell = cellGrid[0][0];
        const endCell: Cell = cellGrid[cellGrid.length - 1][cellGrid[cellGrid.length - 1].length - 1];
        const cells: Cell[] = cellGrid.flat();
        return new Grid(cells, startCell, endCell);
    }


    private createCellMatrix(numberOfColumns: number, numberOfRows: number, cellWidth: number): Cell[][] {
        const cellHeight: number = Math.sqrt(3) / 2 * cellWidth;

        const columnStep: Vector = rightUnitVector.scale(cellHeight);
        const rowStep: Vector = upUnitVector.scale(cellWidth / 2);
        const leftAdjustmentStep: Vector = leftUnitVector.scale(cellHeight / 6);
        const rightAdjustmentStep: Vector = rightUnitVector.scale(cellHeight / 6);

        const leftPointingTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'equilateral-triangular', 90);
        const rightPointingTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'equilateral-triangular', 270);

        const firstCellCenter: Coordinate = new Coordinate(cellWidth, cellHeight);

        const cellColumns: Cell[][] = [];

        for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
            const columnStartCenter: Coordinate = firstCellCenter.newRelativeCoordinate(columnStep.scale(columnIndex));
            const columnOfCells: Cell[] = [];
            for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {

                let cellCenter: Coordinate = columnStartCenter.newRelativeCoordinate(rowStep.scale(rowIndex));
                if (this.cellPointsLeft(rowIndex, columnIndex)) {
                    cellCenter = cellCenter.newRelativeCoordinate(rightAdjustmentStep);
                    columnOfCells.push(leftPointingTriangle(cellCenter));
                } else {
                    cellCenter = cellCenter.newRelativeCoordinate(leftAdjustmentStep);
                    columnOfCells.push(rightPointingTriangle(cellCenter));
                }
            }

            cellColumns.push(columnOfCells);
        }

        return cellColumns;
    }

    private cellPointsLeft(columnIndex: number, rowIndex: number): boolean {
        const evenRowIndex: boolean = rowIndex % 2 == 0;
        const evenColumnIndex: boolean = columnIndex % 2 == 0;
        return (evenRowIndex && evenColumnIndex) || (!evenRowIndex && !evenColumnIndex);
    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        this.establishNeighbourRelationsInColumns(grid);
        this.establishSomeNeighbourRelationsBetweenColumns(grid);
    }


    private establishSomeNeighbourRelationsBetweenColumns(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {

                const onLastColumn: boolean = columnIndex === grid.length - 1;
                if (onLastColumn) {
                    continue;
                }

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const neighbourCellToTheRight: Cell = grid[columnIndex + 1][rowIndex];
                if (currentCell.hasCommonBorderWith(neighbourCellToTheRight)) {
                    currentCell.establishNeighbourRelationTo(neighbourCellToTheRight);
                }
            }
        }
    }
}