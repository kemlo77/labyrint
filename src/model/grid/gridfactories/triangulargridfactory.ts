import { MatrixOperations } from '../../../service/matrixoperations';
import { Coordinate } from '../../coordinate';
import { rightUnitVector, upUnitVector } from '../../unitvectors';
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

        const columnStep: Vector = rightUnitVector.scale(cellWidth / 2);
        const rowStep: Vector = upUnitVector.scale(cellHeight);
        const flatTopTriangleExtraRowStep: Vector = upUnitVector.scale(cellHeight / 3);

        const createFlatTopTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'equilateral-triangular', 180);
        const createPointyTopTriangle: CellCreator = (center: Coordinate) =>
            CellFactory.createCell(center, cellWidth, 'equilateral-triangular', 0);

        const firstCellCenter: Coordinate = new Coordinate(cellWidth, cellHeight);

        const cellRows: Cell[][] = [];

        for (let rowIndex: number = 0; rowIndex < numberOfRows; rowIndex++) {
            const rowStartCellCenter: Coordinate = firstCellCenter.newRelativeCoordinate(rowStep.scale(rowIndex));
            const rowOfCells: Cell[] = [];
            for (let columnIndex: number = 0; columnIndex < numberOfColumns; columnIndex++) {
                let cellCenter: Coordinate = rowStartCellCenter
                    .newRelativeCoordinate(columnStep.scale(columnIndex));
                if (this.cellHasFlatTop(columnIndex, rowIndex)) {
                    cellCenter = cellCenter.newRelativeCoordinate(flatTopTriangleExtraRowStep);
                    rowOfCells.push(createFlatTopTriangle(cellCenter));
                } else {
                    rowOfCells.push(createPointyTopTriangle(cellCenter));
                }
            }

            cellRows.push(rowOfCells);
        }


        return cellRows;
    }

    private cellHasFlatTop(columnIndex: number, rowIndex: number): boolean {
        const evenRowIndex: boolean = rowIndex % 2 == 0;
        const evenColumnIndex: boolean = columnIndex % 2 == 0;
        return (evenRowIndex && evenColumnIndex) || (!evenRowIndex && !evenColumnIndex);
    }

    private establishNeighbourRelationsInMatrix(grid: Cell[][]): void {
        const translatedGrid: Cell[][] = MatrixOperations.transpose<Cell>(grid);
        this.establishNeighbourRelationsInRows(translatedGrid);
        this.establishSomeNeighbourRelationsInColumns(translatedGrid);
    }


    private establishSomeNeighbourRelationsInColumns(grid: Cell[][]): void {
        for (let columnIndex: number = 0; columnIndex < grid.length; columnIndex++) {
            for (let rowIndex: number = 0; rowIndex < grid[columnIndex].length; rowIndex++) {

                const onLastRow: boolean = rowIndex === grid[columnIndex].length - 1;
                if (onLastRow) {
                    continue;
                }

                const currentCell: Cell = grid[columnIndex][rowIndex];
                const neighbourCellBelow: Cell = grid[columnIndex][rowIndex + 1];
                if (currentCell.hasCommonBorderWith(neighbourCellBelow)) {
                    currentCell.establishNeighbourRelationTo(neighbourCellBelow);
                }

            }
        }
    }
}